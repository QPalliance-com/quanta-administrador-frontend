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
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { Licence, PeriodCatalog } from '@/core/models';
import { LicencesActions } from '@/features/settings/state/actions/licences.actions';
import { selectAllLicences } from '@/features/settings/state/selectors/licences.selectors';
import { CatalogsActions } from '../../state/actions/catalogs.actions';
import { LicenceLotsActions } from '../../state/actions/licence-lots.actions';
import { selectPeriods } from '../../state/selectors/catalogs.selectors';
import { selectPseCheckout, selectPseLoading } from '../../state/selectors/licence-lots.selectors';
import { PROFILE_LABELS, PURCHASABLE_PROFILE_OPTIONS, formatMoney, fullPeriodAmountUsd, unitPriceUsd } from '../../utils/licence-lot.utils';

const COP_FORMAT = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

@Component({
    standalone: true,
    selector: 'app-pse-link-drawer',
    templateUrl: './pse-link-drawer.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, ReactiveFormsModule, DrawerModule, SelectModule, InputNumberModule, ButtonModule, MessageModule]
})
export class PseLinkDrawerComponent implements OnChanges, OnDestroy {
    private fb = inject(FormBuilder);
    private store = inject(Store);
    private actions$ = inject(Actions);
    private cdr = inject(ChangeDetectorRef);
    private destroy$ = new Subject<void>();
    private copiedTimer: ReturnType<typeof setTimeout> | null = null;

    @Input() visible = false;
    @Input({ required: true }) companyId!: number;
    /** Email de facturación de la empresa; si no existe el botón "Enviar por email" se oculta. */
    @Input() recipientEmail: string | null = null;
    @Output() closed = new EventEmitter<void>();

    readonly profileOptions = PURCHASABLE_PROFILE_OPTIONS;
    readonly profileLabels: Record<string, string> = PROFILE_LABELS;
    readonly formatMoney = formatMoney;
    periods: PeriodCatalog[] = [];
    plans: Licence[] = []; // precio mensual en USD por perfil (subscription/plans)
    periods$ = this.store.select(selectPeriods);
    checkout$ = this.store.select(selectPseCheckout);
    loading$ = this.store.select(selectPseLoading);

    form: FormGroup = this.fb.group({
        roleTypeProfile: [null, Validators.required],
        userCount: [1, [Validators.required, Validators.min(1)]],
        periodCatalogId: [null, Validators.required]
    });
    inlineError: string | null = null;
    copied = false;

    constructor() {
        this.store
            .select(selectPeriods)
            .pipe(takeUntil(this.destroy$))
            .subscribe((periods) => {
                this.periods = periods;
                this.cdr.markForCheck();
            });

        this.store
            .select(selectAllLicences)
            .pipe(takeUntil(this.destroy$))
            .subscribe((plans) => {
                this.plans = plans;
                this.cdr.markForCheck();
            });

        // La estimación depende de perfil, cantidad y periodo: hay que re-renderizar al editar
        this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.cdr.markForCheck());

        this.actions$.pipe(ofType(LicenceLotsActions.generatePseLinkFailure), takeUntil(this.destroy$)).subscribe(({ error }) => {
            this.inlineError = error;
            this.cdr.markForCheck();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['visible'] && this.visible) {
            this.resetForm();
            this.store.dispatch(CatalogsActions.load());
            if (!this.plans.length) this.store.dispatch(LicencesActions.loadLicences());
        }
    }

    /** Precio de una licencia por todo el periodo elegido (aplica descuento del periodo). */
    private get unitPrice(): number | null {
        const monthly = this.plans.find((plan) => plan.licences === this.form.value.roleTypeProfile)?.amountUsd ?? null;
        const period = this.periods.find((item) => item.id === this.form.value.periodCatalogId);
        return monthly !== null && period ? unitPriceUsd(monthly, period) : null;
    }

    /** El checkout PSE cobra el periodo completo (B14), sin prorrateo: mismo monto que el backend convierte a COP. */
    get estimatedAmountUsd(): number | null {
        const unit = this.unitPrice;
        const quantity: number | null = this.form.value.userCount;
        const period = this.periods.find((item) => item.id === this.form.value.periodCatalogId);
        return unit !== null && quantity && period ? fullPeriodAmountUsd(unit, quantity, period.durationDays) : null;
    }

    get amountBreakdown(): string | null {
        const unit = this.unitPrice;
        const quantity = this.form.value.userCount;
        const period = this.periods.find((item) => item.id === this.form.value.periodCatalogId);
        return unit !== null && quantity && period ? `${quantity} × ${formatMoney(unit)} por licencia (${period.displayName})` : null;
    }

    formatCop(amount: number): string {
        return COP_FORMAT.format(amount);
    }

    mailtoHref(paymentUrl: string, profile: string): string | null {
        if (!this.recipientEmail) return null;
        const subject = encodeURIComponent('Link de pago PSE para tus licencias Quanta');
        const body = encodeURIComponent(`Hola,\n\nPuedes pagar tus licencias ${profile} de Quanta con PSE desde este enlace:\n\n${paymentUrl}\n\nGracias.`);
        return `mailto:${this.recipientEmail}?subject=${subject}&body=${body}`;
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
        this.store.dispatch(LicenceLotsActions.generatePseLink({ companyId: this.companyId, payload: this.form.value }));
    }

    generateAnother(): void {
        this.resetForm();
    }

    async copyLink(paymentUrl: string): Promise<void> {
        try {
            await navigator.clipboard.writeText(paymentUrl);
            this.copied = true;
        } catch {
            this.inlineError = 'No se pudo copiar el enlace. Cópialo manualmente desde el campo.';
        }
        if (this.copiedTimer) clearTimeout(this.copiedTimer);
        this.copiedTimer = setTimeout(() => {
            this.copied = false;
            this.cdr.markForCheck();
        }, 2000);
        this.cdr.markForCheck();
    }

    private resetForm(): void {
        this.inlineError = null;
        this.copied = false;
        this.form.reset({ roleTypeProfile: null, userCount: 1, periodCatalogId: null });
        this.store.dispatch(LicenceLotsActions.clearPseLink());
    }

    ngOnDestroy(): void {
        if (this.copiedTimer) clearTimeout(this.copiedTimer);
        this.destroy$.next();
        this.destroy$.complete();
    }
}
