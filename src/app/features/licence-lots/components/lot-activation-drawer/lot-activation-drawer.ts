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
import { DrawerModule } from 'primeng/drawer';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { PeriodCatalog } from '@/core/models';
import { DateColombiaPipe } from '@/core/pipes/date-colombia.pipe';
import { CatalogsActions } from '../../state/actions/catalogs.actions';
import { LicenceLotsActions } from '../../state/actions/licence-lots.actions';
import { selectPaymentTypes, selectPeriods } from '../../state/selectors/catalogs.selectors';
import { selectLicenceLotsSaving } from '../../state/selectors/licence-lots.selectors';
import { PROFILE_LABELS, PROFILE_OPTIONS, addDays, toIsoDate } from '../../utils/licence-lot.utils';

@Component({
    standalone: true,
    selector: 'app-lot-activation-drawer',
    templateUrl: './lot-activation-drawer.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DrawerModule,
        SelectModule,
        InputNumberModule,
        InputTextModule,
        TextareaModule,
        DatePickerModule,
        ButtonModule,
        MessageModule,
        DateColombiaPipe
    ]
})
export class LotActivationDrawerComponent implements OnChanges, OnDestroy {
    private fb = inject(FormBuilder);
    private store = inject(Store);
    private actions$ = inject(Actions);
    private confirmationService = inject(ConfirmationService);
    private cdr = inject(ChangeDetectorRef);
    private destroy$ = new Subject<void>();

    @Input() visible = false;
    @Input({ required: true }) companyId!: number;
    @Output() closed = new EventEmitter<void>();

    readonly profileOptions = PROFILE_OPTIONS;
    paymentTypes$ = this.store.select(selectPaymentTypes);
    periods$ = this.store.select(selectPeriods);
    saving$ = this.store.select(selectLicenceLotsSaving);

    periods: PeriodCatalog[] = [];
    form: FormGroup = this.fb.group({
        roleTypeProfile: [null, Validators.required],
        userCount: [1, [Validators.required, Validators.min(1)]],
        paymentTypeCatalogId: [null, Validators.required],
        periodCatalogId: [null, Validators.required],
        startDate: [new Date(), Validators.required],
        amountCharged: [null, Validators.min(0)],
        paymentReference: ['', Validators.maxLength(200)],
        activationNotes: ['']
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

        // endDate y descuento son derivados del formulario: hay que re-renderizar al editar
        this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.cdr.markForCheck());

        this.actions$.pipe(ofType(LicenceLotsActions.createSuccess), takeUntil(this.destroy$)).subscribe(() => this.closed.emit());

        this.actions$.pipe(ofType(LicenceLotsActions.createFailure), takeUntil(this.destroy$)).subscribe(({ error }) => {
            this.inlineError = error;
            this.cdr.markForCheck();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['visible'] && this.visible) {
            this.inlineError = null;
            this.form.reset({ roleTypeProfile: null, userCount: 1, startDate: new Date(), paymentReference: '', activationNotes: '' });
            this.store.dispatch(CatalogsActions.load());
        }
    }

    get selectedPeriod(): PeriodCatalog | null {
        const id = this.form.value.periodCatalogId;
        return this.periods.find((period) => period.id === id) ?? null;
    }

    /** Fecha fin calculada con la misma regla del backend: inicio + duración del periodo. */
    get endDate(): string | null {
        const start: Date | null = this.form.value.startDate;
        const period = this.selectedPeriod;
        return start && period ? toIsoDate(addDays(start, period.durationDays)) : null;
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

        const value = this.form.value;
        this.confirmationService.confirm({
            header: 'Confirmar activación',
            icon: 'pi pi-question-circle',
            message: `¿Activar ${value.userCount} licencias ${PROFILE_LABELS[value.roleTypeProfile as keyof typeof PROFILE_LABELS]} con vencimiento el ${this.formatDate(this.endDate)}?`,
            acceptLabel: 'Sí, activar',
            rejectLabel: 'Cancelar',
            accept: () => this.dispatchCreate()
        });
    }

    private dispatchCreate(): void {
        this.inlineError = null;
        const value = this.form.value;
        this.store.dispatch(
            LicenceLotsActions.create({
                companyId: this.companyId,
                payload: {
                    roleTypeProfile: value.roleTypeProfile,
                    userCount: value.userCount,
                    paymentTypeCatalogId: value.paymentTypeCatalogId,
                    periodCatalogId: value.periodCatalogId,
                    startDate: toIsoDate(value.startDate),
                    amountCharged: value.amountCharged ?? null,
                    paymentReference: value.paymentReference?.trim() || null,
                    activationNotes: value.activationNotes?.trim() || null
                }
            })
        );
    }

    private formatDate(iso: string | null): string {
        if (!iso) return '—';
        const [year, month, day] = iso.split('-');
        return `${day}/${month}/${year}`;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
