import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    ChangeDetectionStrategy,
    inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Subject, take, takeUntil } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { LicenseConfig, LicenseConfigOverride } from '@/core/models';
import { CompaniesActions } from '@/features/companies/state/actions/companies.actions';
import { selectAllCompanies } from '@/features/companies/state/selectors/companies.selectors';
import { LicenseConfigActions } from '../../state/actions/license-config.actions';
import { selectLicenseConfigSaving } from '../../state/selectors/license-config.selectors';
import { ALERT_ORDER_MESSAGE, alertDaysValidator } from '../../utils/license-config.validators';

@Component({
    standalone: true,
    selector: 'app-license-override-dialog',
    templateUrl: './license-override-dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, ReactiveFormsModule, DialogModule, SelectModule, InputNumberModule, ButtonModule]
})
export class LicenseOverrideDialogComponent implements OnChanges, OnDestroy {
    private fb = inject(FormBuilder);
    private store = inject(Store);
    private actions$ = inject(Actions);
    private destroy$ = new Subject<void>();

    @Input() visible = false;
    /** Si viene, se edita esa configuración; si es null se crea una nueva. */
    @Input() override: LicenseConfigOverride | null = null;
    /** Valores globales: sirven de punto de partida al crear una configuración nueva. */
    @Input() defaults: LicenseConfig | null = null;
    @Output() closed = new EventEmitter<void>();

    readonly alertOrderMessage = ALERT_ORDER_MESSAGE;
    companies$ = this.store.select(selectAllCompanies);
    saving$ = this.store.select(selectLicenseConfigSaving);

    form: FormGroup = this.fb.group(
        {
            companyId: [null, Validators.required],
            alertDays1: [null, [Validators.required, Validators.min(1)]],
            alertDays2: [null, [Validators.required, Validators.min(1)]],
            alertDays3: [null, [Validators.required, Validators.min(1)]],
            gracePeriodDays: [null, [Validators.required, Validators.min(1)]]
        },
        { validators: alertDaysValidator }
    );

    constructor() {
        this.actions$
            .pipe(ofType(LicenseConfigActions.updateSuccess), takeUntil(this.destroy$))
            .subscribe(({ scope }) => {
                if (scope === 'company' && this.visible) this.closed.emit();
            });
    }

    get isEdit(): boolean {
        return !!this.override;
    }

    get orderInvalid(): boolean {
        return this.form.hasError('alertOrder') && this.form.dirty;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['visible'] && this.visible) {
            const source = this.override ?? this.defaults;
            this.form.reset({
                companyId: this.override?.companyId ?? null,
                alertDays1: source?.alertDays1 ?? null,
                alertDays2: source?.alertDays2 ?? null,
                alertDays3: source?.alertDays3 ?? null,
                gracePeriodDays: source?.gracePeriodDays ?? null
            });
            // La empresa no se puede cambiar al editar: B17 identifica la configuración por companyId
            if (this.isEdit) this.form.get('companyId')?.disable();
            else this.form.get('companyId')?.enable();

            this.store.select(selectAllCompanies).pipe(take(1)).subscribe((companies) => {
                if (!companies.length) this.store.dispatch(CompaniesActions.loadCompanies());
            });
        }
    }

    isInvalid(fieldName: string): boolean {
        const field = this.form.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    onVisibleChange(value: boolean): void {
        if (!value) this.closed.emit();
    }

    cancel(): void {
        this.closed.emit();
    }

    submit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const { companyId, alertDays1, alertDays2, alertDays3, gracePeriodDays } = this.form.getRawValue();
        this.store.dispatch(
            LicenseConfigActions.update({
                payload: { scope: 'company', companyId, alertDays1, alertDays2, alertDays3, gracePeriodDays }
            })
        );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
