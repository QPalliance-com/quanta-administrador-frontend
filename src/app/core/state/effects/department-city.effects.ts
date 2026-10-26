import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { SUPPORTED_COUNTRY_CODES } from '@/core/models/country.model';
import { DepartmentCityService } from '@/core/services/department-city.service';
import { DepartmentCityActions, initLocationData } from '../actions/department-city.actions';
import { selectCitiesLoaded } from '../selectors/department-city.selectors';
import { catchError, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';

@Injectable()
export class DepartmentCityEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private departmentCityService = inject(DepartmentCityService);

    initLocationData$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(initLocationData),
            withLatestFrom(this.store.select(selectCitiesLoaded)),
            switchMap(([, citiesLoaded]) => {
                const actions: Action[] = SUPPORTED_COUNTRY_CODES.map((countryCode) =>
                    DepartmentCityActions.loadDepartments({ countryCode })
                );
                if (!citiesLoaded) actions.push(DepartmentCityActions.loadAllCities());
                return actions;
            })
        );
    });

    loadDepartments$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DepartmentCityActions.loadDepartments),
            mergeMap(({ countryCode }) =>
                this.departmentCityService.getDepartments(countryCode).pipe(
                    map((response) => DepartmentCityActions.loadDepartmentsSuccess({ departments: response.data })),
                    catchError((error) =>
                        of(DepartmentCityActions.loadDepartmentsFailure({ error: error.message }))
                    )
                )
            )
        );
    });

    loadAllCities$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DepartmentCityActions.loadAllCities),
            mergeMap(() =>
                this.departmentCityService.getAllCities().pipe(
                    map((response) => DepartmentCityActions.loadAllCitiesSuccess({ cities: response.data })),
                    catchError((error) =>
                        of(DepartmentCityActions.loadAllCitiesFailure({ error: error.message }))
                    )
                )
            )
        );
    });

    loadCities$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DepartmentCityActions.loadCities),
            mergeMap(({ departmentId }) =>
                this.departmentCityService.getCitiesByDepartment(departmentId).pipe(
                    map((response) => {
                        const cities = response.data.map((c) => ({ ...c, departmentId: Number(departmentId) }));
                        return DepartmentCityActions.loadCitiesSuccess({ cities });
                    }),
                    catchError((error) =>
                        of(DepartmentCityActions.loadCitiesFailure({ error: error.message }))
                    )
                )
            )
        );
    });
}
