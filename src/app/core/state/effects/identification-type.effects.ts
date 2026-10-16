import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IdentificationTypeService } from '@/core/services/identification-type.service';
import { IdentificationTypeActions } from '../actions/identification-type.actions';
import { selectLoadedIdentificationCountries } from '../selectors/identification-type.selectors';
import { catchError, filter, map, mergeMap, of, withLatestFrom } from 'rxjs';

@Injectable()
export class IdentificationTypeEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private identificationTypeService = inject(IdentificationTypeService);

    loadIdentificationTypes$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(IdentificationTypeActions.loadIdentificationTypes),
            withLatestFrom(this.store.select(selectLoadedIdentificationCountries)),
            // No refetch si los tipos de ese país ya están en el state
            filter(([{ countryCode }, loadedCountries]) => !loadedCountries.includes(countryCode)),
            mergeMap(([{ countryCode }]) =>
                this.identificationTypeService.getByCountry(countryCode).pipe(
                    map((response) =>
                        IdentificationTypeActions.loadIdentificationTypesSuccess({
                            countryCode,
                            identificationTypes: response.data
                        })
                    ),
                    catchError((error) =>
                        of(IdentificationTypeActions.loadIdentificationTypesFailure({ error: error.message }))
                    )
                )
            )
        );
    });
}
