import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DepartmentCityService } from '@/core/services/department-city.service';
import { DepartmentCityActions } from '../actions/department-city.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class DepartmentCityEffects {
    private actions$ = inject(Actions);
    private departmentCityService = inject(DepartmentCityService);
    private messageService = inject(MessageService);

    loadDepartments$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DepartmentCityActions.loadDepartments),
            mergeMap(() =>
                this.departmentCityService.getDepartments().pipe(
                    map((departments) => DepartmentCityActions.loadDepartmentsSuccess({ departments })),
                    catchError((error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Error al cargar los departamentos'
                        });
                        return of(DepartmentCityActions.loadDepartmentsFailure({ error: error.message }));
                    })
                )
            )
        );
    });

    loadCities$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DepartmentCityActions.loadCities),
            mergeMap(({ departmentId }) =>
                this.departmentCityService.getCitiesByDepartment(departmentId).pipe(
                    map((cities) => DepartmentCityActions.loadCitiesSuccess({ cities })),
                    catchError((error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Error al cargar las ciudades'
                        });
                        return of(DepartmentCityActions.loadCitiesFailure({ error: error.message }));
                    })
                )
            )
        );
    });

    // Toasts de éxito
    loadDepartmentsSuccessToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(DepartmentCityActions.loadDepartmentsSuccess),
                tap(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Departamentos cargados correctamente'
                    });
                })
            ),
        { dispatch: false }
    );

    loadCitiesSuccessToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(DepartmentCityActions.loadCitiesSuccess),
                tap(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Ciudades cargadas correctamente'
                    });
                })
            ),
        { dispatch: false }
    );
}
