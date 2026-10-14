import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { CatalogService } from '@/core/services/catalog.service';
import { CountriesActions } from '../actions/countries.actions';

@Injectable()
export class CountriesEffects {
    private actions$ = inject(Actions);
    private catalogService = inject(CatalogService);
    private messageService = inject(MessageService);

    load$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CountriesActions.loadCountries),
            switchMap(() =>
                this.catalogService.getCountries().pipe(
                    map((response) => CountriesActions.loadCountriesSuccess({ countries: response.data })),
                    catchError((error) => of(CountriesActions.loadCountriesFailure({ error: error.message })))
                )
            )
        )
    );

    failure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CountriesActions.loadCountriesFailure),
                tap(() => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'No se pudo cargar el catálogo de países'
                    });
                })
            ),
        { dispatch: false }
    );
}
