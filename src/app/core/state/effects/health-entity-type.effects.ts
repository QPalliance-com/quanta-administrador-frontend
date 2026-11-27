import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HealthEntityTypeService } from '@/core/services/health-entity-type.service';
import { HealthEntityTypeActions } from '../actions/health-entity-type.actions';
import { selectLoadedHealthEntityCountries } from '../selectors/health-entity-type.selectors';
import { catchError, filter, map, mergeMap, of, withLatestFrom } from 'rxjs';

@Injectable()
export class HealthEntityTypeEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private healthEntityTypeService = inject(HealthEntityTypeService);

    loadHealthEntityTypes$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(HealthEntityTypeActions.loadHealthEntityTypes),
            withLatestFrom(this.store.select(selectLoadedHealthEntityCountries)),
            // No refetch si los tipos de ese país ya están en el state
            filter(([{ countryCode }, loadedCountries]) => !loadedCountries.includes(countryCode)),
            mergeMap(([{ countryCode }]) =>
                this.healthEntityTypeService.getByCountry(countryCode).pipe(
                    map((response) =>
                        HealthEntityTypeActions.loadHealthEntityTypesSuccess({
                            countryCode,
                            healthEntityTypes: response.data
                        })
                    ),
                    catchError((error) =>
                        of(HealthEntityTypeActions.loadHealthEntityTypesFailure({ error: error.message }))
                    )
                )
            )
        );
    });
}
