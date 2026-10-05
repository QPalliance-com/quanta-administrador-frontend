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
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';
import { ExtendableLot, PeriodCatalog, RenewalType } from '@/core/models';
import { DateColombiaPipe } from '@/core/pipes/date-colombia.pipe';
import { CatalogsActions } from '../../state/actions/catalogs.actions';
import { LicenceLotsActions } from '../../state/actions/licence-lots.actions';
import { selectPeriods } from '../../state/selectors/catalogs.selectors';
import { selectLicenceLotsSaving } from '../../state/selectors/licence-lots.selectors';
import { PROFILE_LABELS, calcNewEndDate, formatIsoDate, renewalTypeFor, toIsoDate } from '../../utils/licence-lot.utils';

@Component({
    standalone: true,
    selector: 'app-extend-lot-dialog',
    templateUrl: './extend-lot-dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DialogModule,
        SelectModule,
        InputNumberModule,
        InputTextModule,
        ButtonModule,
        MessageModule,
        TagModule,
        DateColombiaPipe
    ]
})
export class ExtendLotDialogComponent implements OnChanges, OnDestroy {
    private fb = inject(FormBuilder);
    private store = inject(Store);
    private actions$ = inject(Actions);
    private confirmationService = inject(ConfirmationService);
    private cdr = inject(ChangeDetectorRef);
    private destroy$ = new Subject<void>();

    @Input() visible = false;
    @Input({ required: true }) companyId!: number;
    @Input() lot: ExtendableLot | null = null;
    @Output() closed = new EventEmitter<void>();

    readonly profileLabels = PROFILE_LABELS;
    periods: PeriodCatalog[] = [];
    saving$ = this.store.select(selectLicenceLotsSaving);

    form: FormGroup = this.fb.group({
        periodCatalogId: [null, Validators.required],
        amountCharged: [null, Validators.min(0)],
        paymentReference: ['', Validators.maxLength(200)]
    });
    inlineError: string | null = null;

    constructor() {
        this.store
            .select(selectPeriods)
            .pipe(takeUntil(this.destroy$))
            .subscribe((periods) => {
                this.periods = periods;
                this.cdr.markForCheck();
            });

        this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.cdr.markForCheck());

        this.actions$.pipe(ofType(LicenceLotsActions.extendSuccess), takeUntil(this.destroy$)).subscribe(() => this.closed.emit());

        this.actions$.pipe(ofType(LicenceLotsActions.extendFailure), takeUntil(this.destroy$)).subscribe(({ error }) => {
            this.inlineError = error;
            this.cdr.markForCheck();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['visible'] && this.visible) {
            this.inlineError = null;
            this.form.reset({ paymentReference: '' });
            this.store.dispatch(CatalogsActions.load());
        }
    }

    get renewalType(): RenewalType | null {
        return this.lot ? renewalTypeFor(this.lot.status) : null;
    }

    get selectedPeriod(): PeriodCatalog | null {
        const id = this.form.value.periodCatalogId;
        return this.periods.find((period) => period.id === id) ?? null;
    }

    /** Nuevo vencimiento según el tipo de renovación (misma regla que B11). */
    get newEndDate(): string | null {
        const period = this.selectedPeriod;
        return this.lot && period ? toIsoDate(calcNewEndDate(this.lot, period.durationDays)) : null;
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
        if (this.form.invalid || !this.lot) {
            this.form.markAllAsTouched();
            return;
        }

        const lot = this.lot;
        this.confirmationService.confirm({
            header: this.renewalType === 'early' ? 'Confirmar extensión' : 'Confirmar reactivación',
            icon: 'pi pi-question-circle',
            message: `¿${this.renewalType === 'early' ? 'Extender' : 'Reactivar'} el lote #${lot.id} hasta el ${this.newEndDate ? formatIsoDate(this.newEndDate) : '—'}?`,
            acceptLabel: this.renewalType === 'early' ? 'Sí, extender' : 'Sí, reactivar',
            rejectLabel: 'Cancelar',
            accept: () => this.dispatchExtend(lot.id)
        });
    }

    private dispatchExtend(lotId: number): void {
        this.inlineError = null;
        const value = this.form.value;
        this.store.dispatch(
            LicenceLotsActions.extend({
                companyId: this.companyId,
                lotId,
                payload: {
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
