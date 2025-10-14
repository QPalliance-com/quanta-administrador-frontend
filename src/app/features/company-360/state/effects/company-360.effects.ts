import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { CompanyService } from '@/core/services';
import * as companyActions from '../actions/company-360.actions';
import { MessageService } from 'primeng/api';

@Injectable()
export class CompanyEffects {
    private actions$ = inject(Actions);
    private companyService = inject(CompanyService);
    private messageService = inject(MessageService);

    // Load Companies
    loadCompanies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(companyActions.loadCompanies),
            mergeMap(() =>
                this.companyService.loadCompanies().pipe(
                    map((response) => companyActions.loadCompaniesSuccess({ companies: response.data })),
                    catchError((error) => of(companyActions.loadCompaniesFailure({ error })))
                )
            )
        )
    );

    // Load Single Company
    loadCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(companyActions.loadCompany),
            mergeMap(() =>
                this.companyService.loadCompany().pipe(
                    map((response) => companyActions.loadCompanySuccess({ company: response.data })),
                    catchError((error) => of(companyActions.loadCompanyFailure({ error })))
                )
            )
        )
    );

    // Load Company By ID
    loadCompanyById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(companyActions.loadCompanyById),
            mergeMap(({ id }) =>
                this.companyService.loadCompanyById(id).pipe(
                    map((response) => companyActions.loadCompanyByIdSuccess({ company: response.data })),
                    catchError((error) => of(companyActions.loadCompanyByIdFailure({ error })))
                )
            )
        )
    );

    // Create Company
    createCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(companyActions.createCompany),
            mergeMap(({ company }) =>
                this.companyService.createCompany(company).pipe(
                    map((response) => companyActions.createCompanySuccess({ company: response.data })),
                    catchError((error) => of(companyActions.createCompanyFailure({ error })))
                )
            )
        )
    );

    // Update Company
    updateCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(companyActions.updateCompany),
            mergeMap(({ company }) =>
                this.companyService.updateCompany(company).pipe(
                    map((response) => companyActions.updateCompanySuccess({ company: response.data })),
                    catchError((error) => of(companyActions.updateCompanyFailure({ error })))
                )
            )
        )
    );

    // Patch Company
    patchCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(companyActions.patchCompany),
            mergeMap(({ id, changes }) =>
                this.companyService.patchCompany(id, changes).pipe(
                    map((response) => companyActions.patchCompanySuccess({ company: response.data })),
                    catchError((error) => of(companyActions.patchCompanyFailure({ error })))
                )
            )
        )
    );

    // Delete Company
    deleteCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(companyActions.deleteCompany),
            mergeMap(({ id }) =>
                this.companyService.deleteCompany(id).pipe(
                    map(() => companyActions.deleteCompanySuccess({ id })),
                    catchError((error) => of(companyActions.deleteCompanyFailure({ error })))
                )
            )
        )
    );

    // Success Toasts
    loadCompaniesSuccessToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(companyActions.loadCompaniesSuccess),
                tap(({ companies }) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: `${companies.length} compañías cargadas correctamente`,
                        life: 3000
                    });
                })
            ),
        { dispatch: false }
    );

    createCompanySuccessToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(companyActions.createCompanySuccess),
                tap(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Creado',
                        detail: 'Compañía creada correctamente',
                        life: 3000
                    });
                })
            ),
        { dispatch: false }
    );

    updateCompanySuccessToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(companyActions.updateCompanySuccess),
                tap(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Actualizado',
                        detail: 'Compañía actualizada correctamente',
                        life: 3000
                    });
                })
            ),
        { dispatch: false }
    );

    patchCompanySuccessToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(companyActions.patchCompanySuccess),
                tap(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Actualizado',
                        detail: 'Compañía actualizada correctamente',
                        life: 3000
                    });
                })
            ),
        { dispatch: false }
    );

    deleteCompanySuccessToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(companyActions.deleteCompanySuccess),
                tap(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Eliminado',
                        detail: 'Compañía eliminada correctamente',
                        life: 3000
                    });
                })
            ),
        { dispatch: false }
    );

    // Error Toasts
    loadCompaniesFailureToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(companyActions.loadCompaniesFailure),
                tap(({ error }) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error?.message || 'Error al cargar las compañías',
                        life: 3000
                    });
                })
            ),
        { dispatch: false }
    );

    loadCompanyFailureToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(companyActions.loadCompanyFailure, companyActions.loadCompanyByIdFailure),
                tap(({ error }) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error?.message || 'Error al cargar la compañía',
                        life: 3000
                    });
                })
            ),
        { dispatch: false }
    );

    createCompanyFailureToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(companyActions.createCompanyFailure),
                tap(({ error }) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error?.message || 'Error al crear la compañía',
                        life: 3000
                    });
                })
            ),
        { dispatch: false }
    );

    updateCompanyFailureToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(companyActions.updateCompanyFailure, companyActions.patchCompanyFailure),
                tap(({ error }) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error?.message || 'Error al actualizar la compañía',
                        life: 3000
                    });
                })
            ),
        { dispatch: false }
    );

    deleteCompanyFailureToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(companyActions.deleteCompanyFailure),
                tap(({ error }) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error?.message || 'Error al eliminar la compañía',
                        life: 3000
                    });
                })
            ),
        { dispatch: false }
    );
}