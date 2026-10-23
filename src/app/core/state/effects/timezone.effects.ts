import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TimezoneService } from '@/core/services/timezone.service';
import { TimezoneActions } from '../actions/timezone.actions';
import { selectLoadedTimezoneCountries } from '../selectors/timezone.selectors';
import { catchError, filter, map, mergeMap, of, withLatestFrom } from 'rxjs';

@Injectable()
export class TimezoneEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private timezoneService = inject(TimezoneService);

    loadTimezones$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TimezoneActions.loadTimezones),
            withLatestFrom(this.store.select(selectLoadedTimezoneCountries)),
            // No refetch si las zonas de ese país ya están en el state
            filter(([{ countryCode }, loadedCountries]) => !loadedCountries.includes(countryCode)),
            mergeMap(([{ countryCode }]) =>
                this.timezoneService.getByCountry(countryCode).pipe(
                    map((response) =>
                        TimezoneActions.loadTimezonesSuccess({
                            countryCode,
                            timezones: response.data
                        })
                    ),
                    catchError((error) => of(TimezoneActions.loadTimezonesFailure({ error: error.message })))
                )
            )
        );
    });
}
