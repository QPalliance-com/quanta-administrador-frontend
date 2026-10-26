import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Menu } from 'primeng/menu';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { LicenseConfig, LicenseConfigOverride } from '@/core/models';
import { LicenseConfigActions } from '../../state/actions/license-config.actions';
import {
    selectGlobalLicenseConfig,
    selectLicenseConfigOverrides,
    selectLicenseConfigSaving,
    selectLoadingGlobalConfig,
    selectLoadingOverrides
} from '../../state/selectors/license-config.selectors';
import { LicenseOverrideDialogComponent } from '../../components/license-override-dialog/license-override-dialog';
import { ALERT_ORDER_MESSAGE, alertDaysValidator } from '../../utils/license-config.validators';

@Component({
    standalone: true,
    selector: 'app-license-config',
    templateUrl: './license-config.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        InputNumberModule,
        InputTextModule,
        ToastModule,
        TooltipModule,
        ConfirmDialogModule,
        Menu,
        LicenseOverrideDialogComponent
    ],
    providers: [MessageService, ConfirmationService]
})
export class LicenseConfigComponent implements OnInit, OnDestroy {
    private fb = inject(FormBuilder);
    private store = inject(Store);
    private confirmationService = inject(ConfirmationService);
    private destroy$ = new Subject<void>();

    readonly alertOrderMessage = ALERT_ORDER_MESSAGE;

    global: LicenseConfig | null = null;
    globalForm: FormGroup = this.fb.group(
        {
            alertDays1: [null, [Validators.required, Validators.min(1)]],
            alertDays2: [null, [Validators.required, Validators.min(1)]],
            alertDays3: [null, [Validators.required, Validators.min(1)]],
            gracePeriodDays: [null, [Validators.required, Validators.min(1)]]
        },
        { validators: alertDaysValidator }
    );

    overrides$ = this.store.select(selectLicenseConfigOverrides);
    global$ = this.store.select(selectGlobalLicenseConfig);
    loadingGlobal$ = this.store.select(selectLoadingGlobalConfig);
    loadingOverrides$ = this.store.select(selectLoadingOverrides);
    saving$ = this.store.select(selectLicenseConfigSaving);

    displayOverrideDialog = false;
    selectedOverride: LicenseConfigOverride | null = null;
    rowMenuItems: MenuItem[] = [];

    @ViewChild('rowMenu') rowMenu!: Menu;

    ngOnInit(): void {
        this.store
            .select(selectGlobalLicenseConfig)
            .pipe(takeUntil(this.destroy$))
            .subscribe((config) => {
                this.global = config;
                if (config) this.globalForm.reset(config);
            });

        this.store.dispatch(LicenseConfigActions.loadGlobal());
        this.store.dispatch(LicenseConfigActions.loadOverrides());
    }

    isInvalid(fieldName: string): boolean {
        const field = this.globalForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    get orderInvalid(): boolean {
        return this.globalForm.hasError('alertOrder') && this.globalForm.dirty;
    }

    saveGlobal(): void {
        if (this.globalForm.invalid) {
            this.globalForm.markAllAsTouched();
            return;
        }
        this.store.dispatch(LicenseConfigActions.update({ payload: { scope: 'global', ...this.globalForm.value } }));
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openCreateOverride(): void {
        this.selectedOverride = null;
        this.displayOverrideDialog = true;
    }

    openEditOverride(override: LicenseConfigOverride): void {
        this.selectedOverride = override;
        this.displayOverrideDialog = true;
    }

    openRowMenu(event: MouseEvent, override: LicenseConfigOverride): void {
        event.stopPropagation();
        this.rowMenuItems = [
            { label: 'Editar', icon: 'pi pi-pencil', command: () => this.openEditOverride(override) },
            {
                label: 'Restablecer a valores globales',
                icon: 'pi pi-undo',
                // B17 no tiene DELETE: restablecer = guardar los valores globales para esa empresa
                visible: !!this.global,
                command: () => this.confirmReset(override)
            }
        ];
        this.rowMenu.toggle(event);
    }

    private confirmReset(override: LicenseConfigOverride): void {
        const global = this.global;
        if (!global) return;

        this.confirmationService.confirm({
            header: 'Restablecer configuración',
            icon: 'pi pi-exclamation-triangle',
            message: `¿Restablecer <b>${override.companyName}</b> a los valores globales (${global.alertDays1}/${global.alertDays2}/${global.alertDays3} días de alerta y ${global.gracePeriodDays} de gracia)?`,
            acceptLabel: 'Sí, restablecer',
            rejectLabel: 'Cancelar',
            accept: () =>
                this.store.dispatch(
                    LicenseConfigActions.update({
                        payload: {
                            scope: 'company',
                            companyId: override.companyId,
                            alertDays1: global.alertDays1,
                            alertDays2: global.alertDays2,
                            alertDays3: global.alertDays3,
                            gracePeriodDays: global.gracePeriodDays
                        }
                    })
                )
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
