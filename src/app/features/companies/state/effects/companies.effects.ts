import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { CompanyService } from '@/core/services/company.service';
import { CompaniesActions, CompanyFieldErrorField } from '../actions/companies.actions';

// Códigos de ErrorApplicationEnum (ms-admin) para la validación de identificación -> campo del formulario
const IDENTIFICATION_ERROR_FIELDS: Record<number, CompanyFieldErrorField> = {
    60: 'identificationType', // IDENTIFICATION_TYPE_INVALID
    61: 'verificationDigit', // VERIFICATION_DIGIT_REQUIRED
    62: 'numberIdentification' // IDENTIFICATION_NUMBER_INVALID_FORMAT
};

/**
 * El backend envía el código como prefijo del mensaje: "APPLICATION - 62: texto".
 * Devuelve el campo asociado y el texto sin prefijo; null si no es un error de identificación.
 */
function parseIdentificationError(error: any): { field: CompanyFieldErrorField; message: string } | null {
    const raw = error?.error?.message;
    if (typeof raw !== 'string') return null;
    const match = raw.match(/APPLICATION\s*-\s*(\d+)\s*:\s*(.*)/s);
    if (!match) return null;
    const field = IDENTIFICATION_ERROR_FIELDS[Number(match[1])];
    return field ? { field, message: match[2].trim() || raw } : null;
}

/** Acciones de falla de create/update: toast con el mensaje del backend + error asociado al campo si aplica */
function saveFailureActions(
    failure: typeof CompaniesActions.createCompanyFailure | typeof CompaniesActions.updateCompanyFailure,
    error: any
) {
    const fieldError = parseIdentificationError(error);
    const message = fieldError?.message ?? error?.error?.message ?? error.message;
    return fieldError
        ? of(failure({ error: message }), CompaniesActions.setFieldError(fieldError))
        : of(failure({ error: message }));
}

@Injectable()
export class CompaniesEffects {
    private actions$ = inject(Actions);
    private companyService = inject(CompanyService);
    private messageService = inject(MessageService);
    private router = inject(Router);

    loadCompanies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompaniesActions.loadCompanies),
            mergeMap(() =>
                this.companyService.loadCompanies().pipe(
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
                this.companyService.loadCompanyById(id).pipe(
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
                this.companyService.createCompany(company).pipe(
                    map((response) =>
                        CompaniesActions.createCompanySuccess({ company: response.data })
                    ),
                    catchError((error) => saveFailureActions(CompaniesActions.createCompanyFailure, error))
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
                this.companyService.updateCompany(company).pipe(
                    map((response) =>
                        CompaniesActions.updateCompanySuccess({ company: response.data })
                    ),
                    catchError((error) => saveFailureActions(CompaniesActions.updateCompanyFailure, error))
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
                this.companyService.deleteCompany(id).pipe(
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
