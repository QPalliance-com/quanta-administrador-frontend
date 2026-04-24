import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../environments/environment';
import { ApiResponse } from '@/core/models/api-response.model';
import { Company } from '@/core/models/company.model';
import { CompaniesActions } from '../actions/companies.actions';

@Injectable()
export class CompaniesEffects {
    private actions$ = inject(Actions);
    private http = inject(HttpClient);
    private messageService = inject(MessageService);
    private router = inject(Router);

    private readonly baseUrl = `${environment.adminApiUrl}companies`;

    loadCompanies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompaniesActions.loadCompanies),
            mergeMap(() =>
                this.http.get<ApiResponse<Company[]>>(this.baseUrl).pipe(
                    map((response) =>
                        CompaniesActions.loadCompaniesSuccess({ companies: response.data })
                    ),
                    catchError((error) =>
                        of(CompaniesActions.loadCompaniesFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    loadCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompaniesActions.loadCompany),
            mergeMap(({ id }) =>
                this.http
                    .get<ApiResponse<Company>>(`${this.baseUrl}/${id}?recordStates=active`)
                    .pipe(
                        map((response) =>
                            CompaniesActions.loadCompanySuccess({ company: response.data })
                        ),
                        catchError((error) =>
                            of(CompaniesActions.loadCompanyFailure({ error: error.message }))
                        )
                    )
            )
        )
    );

    createCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompaniesActions.createCompany),
            mergeMap(({ company }) =>
                this.http
                    .post<ApiResponse<Company>>(this.baseUrl, { data: company })
                    .pipe(
                        map((response) =>
                            CompaniesActions.createCompanySuccess({ company: response.data })
                        ),
                        catchError((error) =>
                            of(CompaniesActions.createCompanyFailure({ error: error.message }))
                        )
                    )
            )
        )
    );

    createCompanySuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CompaniesActions.createCompanySuccess),
                tap(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Compañía creada correctamente'
                    });
                    this.router.navigate(['/companies/list']);
                })
            ),
        { dispatch: false }
    );

    updateCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompaniesActions.updateCompany),
            mergeMap(({ company }) =>
                this.http.put<ApiResponse<Company>>(this.baseUrl, company).pipe(
                    map((response) =>
                        CompaniesActions.updateCompanySuccess({ company: response.data })
                    ),
                    catchError((error) =>
                        of(CompaniesActions.updateCompanyFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    updateCompanySuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CompaniesActions.updateCompanySuccess),
                tap(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Compañía actualizada correctamente'
                    });
                })
            ),
        { dispatch: false }
    );

    deleteCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompaniesActions.deleteCompany),
            mergeMap(({ id }) =>
                this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`).pipe(
                    map(() => CompaniesActions.deleteCompanySuccess({ id })),
                    catchError((error) =>
                        of(CompaniesActions.deleteCompanyFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    deleteCompanySuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CompaniesActions.deleteCompanySuccess),
                tap(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Compañía eliminada correctamente'
                    });
                })
            ),
        { dispatch: false }
    );

    failure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    CompaniesActions.loadCompaniesFailure,
                    CompaniesActions.loadCompanyFailure,
                    CompaniesActions.createCompanyFailure,
                    CompaniesActions.updateCompanyFailure,
                    CompaniesActions.deleteCompanyFailure
                ),
                tap(({ error }) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error
                    });
                })
            ),
        { dispatch: false }
    );
}
