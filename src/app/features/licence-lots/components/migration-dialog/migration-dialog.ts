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
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { LicenceLot, PaymentTypeCatalog } from '@/core/models';
import { DateColombiaPipe } from '@/core/pipes/date-colombia.pipe';
import { CatalogsActions } from '../../state/actions/catalogs.actions';
import { LicenceLotsActions } from '../../state/actions/licence-lots.actions';
import { selectPaymentTypes } from '../../state/selectors/catalogs.selectors';
import { selectLicenceLotsSaving } from '../../state/selectors/licence-lots.selectors';
import { PROFILE_LABELS, formatIsoDate } from '../../utils/licence-lot.utils';

@Component({
    standalone: true,
    selector: 'app-migration-dialog',
    templateUrl: './migration-dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, ReactiveFormsModule, DialogModule, SelectModule, ButtonModule, MessageModule, DateColombiaPipe]
})
export class MigrationDialogComponent implements OnChanges, OnDestroy {
    private fb = inject(FormBuilder);
    private store = inject(Store);
    private actions$ = inject(Actions);
    private confirmationService = inject(ConfirmationService);
    private cdr = inject(ChangeDetectorRef);
    private destroy$ = new Subject<void>();

    @Input() visible = false;
    @Input({ required: true }) companyId!: number;
    @Input() lot: LicenceLot | null = null;
    @Output() closed = new EventEmitter<void>();

    readonly profileLabels = PROFILE_LABELS;
    paymentTypes: PaymentTypeCatalog[] = [];
    saving$ = this.store.select(selectLicenceLotsSaving);

    form: FormGroup = this.fb.group({
        newPaymentTypeCatalogId: [null, Validators.required]
    });
    inlineError: string | null = null;

    constructor() {
        this.store
            .select(selectPaymentTypes)
            .pipe(takeUntil(this.destroy$))
            .subscribe((paymentTypes) => {
                this.paymentTypes = paymentTypes;
                this.cdr.markForCheck();
            });

        this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.cdr.markForCheck());

        this.actions$
            .pipe(ofType(LicenceLotsActions.scheduleMigrationSuccess), takeUntil(this.destroy$))
            .subscribe(() => this.closed.emit());

        this.actions$.pipe(ofType(LicenceLotsActions.scheduleMigrationFailure), takeUntil(this.destroy$)).subscribe(({ error }) => {
            this.inlineError = error;
            this.cdr.markForCheck();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['visible'] && this.visible) {
            this.inlineError = null;
            this.form.reset();
            this.store.dispatch(CatalogsActions.load());
        }
    }

    /** El backend rechaza migrar a la misma forma de pago, así que ni se ofrece. */
    get options(): PaymentTypeCatalog[] {
        return this.paymentTypes.filter((type) => type.id !== this.lot?.paymentType.id);
    }

    get selectedType(): PaymentTypeCatalog | null {
        const id = this.form.value.newPaymentTypeCatalogId;
        return this.paymentTypes.find((type) => type.id === id) ?? null;
    }

    isInvalid(): boolean {
        const field = this.form.get('newPaymentTypeCatalogId');
        return !!(field && field.invalid && (field.dirty || field.touched));
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
            header: 'Confirmar migración',
            icon: 'pi pi-question-circle',
            message: `¿Programar que el lote #${lot.id} pase a ${this.selectedType?.displayName} el ${formatIsoDate(lot.endDate)}?`,
            acceptLabel: 'Sí, programar',
            rejectLabel: 'Cancelar',
            accept: () => this.dispatchSchedule(lot.id)
        });
    }

    private dispatchSchedule(lotId: number): void {
        this.inlineError = null;
        this.store.dispatch(
            LicenceLotsActions.scheduleMigration({
                companyId: this.companyId,
                lotId,
                payload: { newPaymentTypeCatalogId: this.form.value.newPaymentTypeCatalogId }
            })
        );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
