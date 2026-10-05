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
import { LicenceLot } from '@/core/models';
import { DateColombiaPipe } from '@/core/pipes/date-colombia.pipe';
import { CatalogsActions } from '../../state/actions/catalogs.actions';
import { LicenceLotsActions } from '../../state/actions/licence-lots.actions';
import { selectPaymentTypes, selectPeriods } from '../../state/selectors/catalogs.selectors';
import { selectAllLicenceLots, selectLicenceLotsSaving } from '../../state/selectors/licence-lots.selectors';
import { PROFILE_OPTIONS, findMergeableLot } from '../../utils/licence-lot.utils';

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
                this.cdr.markForCheck();
            });

        this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.cdr.markForCheck());

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
        }
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
