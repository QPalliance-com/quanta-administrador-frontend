import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Subject, takeUntil } from 'rxjs';
import { DrawerModule } from 'primeng/drawer';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { Licence, LicenceLot, PeriodCatalog } from '@/core/models';
import { DateColombiaPipe } from '@/core/pipes/date-colombia.pipe';
import { LicencesActions } from '@/features/settings/state/actions/licences.actions';
import { selectAllLicences } from '@/features/settings/state/selectors/licences.selectors';
import { CatalogsActions } from '../../state/actions/catalogs.actions';
import { LicenceLotsActions } from '../../state/actions/licence-lots.actions';
import { selectPaymentTypes, selectPeriods } from '../../state/selectors/catalogs.selectors';
import { selectAllLicenceLots, selectLicenceLotsSaving } from '../../state/selectors/licence-lots.selectors';
import {
    PROFILE_OPTIONS,
    findMergeableLot,
    formatMoney,
    fromIsoDate,
    fullPeriodAmountUsd,
    proratedAmountUsd,
    remainingDays,
    syncCalculatedAmount,
    unitPriceUsd
} from '../../utils/licence-lot.utils';

@Component({
    standalone: true,
    selector: 'app-add-licences-drawer',
    templateUrl: './add-licences-drawer.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DrawerModule,
        SelectModule,
        InputNumberModule,
        InputTextModule,
        ButtonModule,
        MessageModule,
        DateColombiaPipe
    ]
})
export class AddLicencesDrawerComponent implements OnChanges, OnDestroy {
    private fb = inject(FormBuilder);
    private store = inject(Store);
    private actions$ = inject(Actions);
    private cdr = inject(ChangeDetectorRef);
    private destroy$ = new Subject<void>();

    @Input() visible = false;
    @Input({ required: true }) companyId!: number;
    @Output() closed = new EventEmitter<void>();

    readonly profileOptions = PROFILE_OPTIONS;
    paymentTypes$ = this.store.select(selectPaymentTypes);
    periods$ = this.store.select(selectPeriods);
    saving$ = this.store.select(selectLicenceLotsSaving);

    lots: LicenceLot[] = [];
    periods: PeriodCatalog[] = [];
    plans: Licence[] = []; // precio mensual en USD por perfil (subscription/plans)
    form: FormGroup = this.fb.group({
        roleTypeProfile: [null, Validators.required],
        quantityToAdd: [1, [Validators.required, Validators.min(1)]],
        paymentTypeCatalogId: [null, Validators.required],
        periodCatalogId: [null, Validators.required],
        amountCharged: [null, Validators.min(0)],
        paymentReference: ['', Validators.maxLength(200)]
    });
    inlineError: string | null = null;

    constructor() {
        // Los lotes ya vienen cargados desde el listado (F01): no se pide nada extra para detectar la fusión
        this.store
            .select(selectAllLicenceLots)
            .pipe(takeUntil(this.destroy$))
            .subscribe((lots) => {
                this.lots = lots;
                this.refreshAmount();
            });

        this.store
            .select(selectPeriods)
            .pipe(takeUntil(this.destroy$))
            .subscribe((periods) => {
                this.periods = periods;
                this.refreshAmount();
            });

        this.store
            .select(selectAllLicences)
            .pipe(takeUntil(this.destroy$))
            .subscribe((plans) => {
                this.plans = plans;
                this.refreshAmount();
            });

        // El monto depende de perfil, cantidad y periodo (y del lote fusionable): se recalcula al editar
        this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.refreshAmount());

        this.actions$.pipe(ofType(LicenceLotsActions.addLicencesSuccess), takeUntil(this.destroy$)).subscribe(() => this.closed.emit());

        this.actions$.pipe(ofType(LicenceLotsActions.addLicencesFailure), takeUntil(this.destroy$)).subscribe(({ error }) => {
            this.inlineError = error;
            this.cdr.markForCheck();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['visible'] && this.visible) {
            this.inlineError = null;
            this.form.reset({ roleTypeProfile: null, quantityToAdd: 1, paymentReference: '' });
            this.store.dispatch(CatalogsActions.load());
            if (!this.plans.length) this.store.dispatch(LicencesActions.loadLicences());
        }
    }

    private get selectedPeriod(): PeriodCatalog | null {
        return this.periods.find((period) => period.id === this.form.value.periodCatalogId) ?? null;
    }

    /** Precio de una licencia por todo el periodo (aplica descuento del periodo). */
    private get unitPrice(): number | null {
        const monthly = this.plans.find((plan) => plan.licences === this.form.value.roleTypeProfile)?.amountUsd ?? null;
        const period = this.selectedPeriod;
        return monthly !== null && period ? unitPriceUsd(monthly, period) : null;
    }

    /** Días que le quedan al lote fusionable; null si se va a crear un lote nuevo (periodo completo). */
    private get daysRemaining(): number | null {
        const lot = this.mergeableLot;
        const period = this.selectedPeriod;
        return lot && period ? remainingDays(new Date(), fromIsoDate(lot.endDate), period.durationDays) : null;
    }

    /** Misma regla que el backend: fusión = prorrateo por los días restantes del lote; lote nuevo = periodo completo. */
    get calculatedAmount(): number | null {
        const unit = this.unitPrice;
        const quantity: number | null = this.form.value.quantityToAdd;
        const period = this.selectedPeriod;
        if (unit === null || !quantity || !period) return null;

        const days = this.daysRemaining;
        return days === null
            ? fullPeriodAmountUsd(unit, quantity, period.durationDays)
            : proratedAmountUsd(unit, quantity, days, period.durationDays);
    }

    get amountBreakdown(): string | null {
        const unit = this.unitPrice;
        const quantity = this.form.value.quantityToAdd;
        const period = this.selectedPeriod;
        if (unit === null || !quantity || !period) return null;

        const days = this.daysRemaining;
        return days === null
            ? `${quantity} × ${formatMoney(unit)} por licencia (periodo completo)`
            : `${quantity} × ${formatMoney(unit)} por licencia, prorrateado: ${days} de ${period.durationDays} días restantes del lote`;
    }

    get amountDiffersFromCalculated(): boolean {
        return this.calculatedAmount !== null && this.form.value.amountCharged !== this.calculatedAmount;
    }

    useCalculatedAmount(): void {
        const control = this.form.get('amountCharged');
        control?.setValue(this.calculatedAmount, { emitEvent: false });
        control?.markAsPristine();
        this.cdr.markForCheck();
    }

    private refreshAmount(): void {
        syncCalculatedAmount(this.form.get('amountCharged'), this.calculatedAmount);
        this.cdr.markForCheck();
    }

    /** Hay que elegir perfil y periodo para poder anticipar qué hará el backend. */
    get selectionReady(): boolean {
        return !!this.form.value.roleTypeProfile && !!this.form.value.periodCatalogId;
    }

    get mergeableLot(): LicenceLot | null {
        return findMergeableLot(this.lots, this.form.value.roleTypeProfile, this.form.value.periodCatalogId);
    }

    isInvalid(fieldName: string): boolean {
        const field = this.form.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    getError(fieldName: string): string {
        const errors = this.form.get(fieldName)?.errors;
        if (!errors) return '';
        if (errors['required']) return 'Este campo es requerido';
        if (errors['min']) return `El valor mínimo es ${errors['min'].min}`;
        if (errors['maxlength']) return `Máximo ${errors['maxlength'].requiredLength} caracteres`;
        return 'Este campo es inválido';
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

        this.inlineError = null;
        const value = this.form.value;
        this.store.dispatch(
            LicenceLotsActions.addLicences({
                companyId: this.companyId,
                payload: {
                    roleTypeProfile: value.roleTypeProfile,
                    quantityToAdd: value.quantityToAdd,
                    paymentTypeCatalogId: value.paymentTypeCatalogId,
                    periodCatalogId: value.periodCatalogId,
                    amountCharged: value.amountCharged ?? null,
                    paymentReference: value.paymentReference?.trim() || null
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
