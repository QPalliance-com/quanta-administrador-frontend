import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { HealthEntity, HealthEntityType } from '@/core/models';
import { selectHealthEntityTypesByCountry } from '@/core/state/selectors/health-entity-type.selectors';
import { HealthEntitiesActions } from '../../state/actions/health-entities.actions';
import { selectHealthEntitiesLoading } from '../../state/selectors/health-entities.selectors';

@Component({
    standalone: true,
    selector: 'app-health-entity-drawer',
    templateUrl: './health-entity-drawer.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, ReactiveFormsModule, DrawerModule, InputTextModule, TextareaModule, SelectModule, ButtonModule, MessageModule]
})
export class HealthEntityDrawerComponent implements OnChanges, OnDestroy {
    private fb = inject(FormBuilder);
    private store = inject(Store);
    private actions$ = inject(Actions);
    private destroy$ = new Subject<void>();

    @Input() visible = false;
    @Input() mode: 'create' | 'edit' = 'create';
    @Input() healthEntity: HealthEntity | null = null;
    // País del filtro de la página; solo se usa al crear
    @Input() countryCode: string | null = null;
    @Output() closed = new EventEmitter<void>();

    form: FormGroup = this.buildForm();
    inlineError: string | null = null;
    entityTypes$: Observable<HealthEntityType[]> = of([]);
    loading$ = this.store.select(selectHealthEntitiesLoading);

    constructor() {
        this.actions$
            .pipe(ofType(HealthEntitiesActions.createSuccess, HealthEntitiesActions.updateSuccess), takeUntil(this.destroy$))
            .subscribe(() => this.closed.emit());

        this.actions$
            .pipe(ofType(HealthEntitiesActions.createFailure, HealthEntitiesActions.updateFailure), takeUntil(this.destroy$))
            .subscribe(({ error }) => {
                this.inlineError = error;
            });
    }

    // En edición el país viene del registro y no se cambia
    get effectiveCountryCode(): string | null {
        return this.mode === 'edit' ? (this.healthEntity?.countryCode ?? null) : this.countryCode;
    }

    get title(): string {
        return this.mode === 'edit' ? 'Editar entidad de salud' : 'Crear entidad de salud';
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['visible'] && this.visible) {
            this.inlineError = null;
            this.form = this.buildForm();
            this.entityTypes$ = this.store.select(selectHealthEntityTypesByCountry(this.effectiveCountryCode));
            if (this.mode === 'edit' && this.healthEntity) {
                this.form.patchValue({
                    entityTypeId: this.healthEntity.entityTypeId,
                    name: this.healthEntity.name,
                    externalCode: this.healthEntity.externalCode,
                    mobilityCode: this.healthEntity.mobilityCode,
                    nit: this.healthEntity.nit,
                    scope: this.healthEntity.scope,
                    notes: this.healthEntity.notes
                });
            }
        }
    }

    isInvalid(fieldName: string): boolean {
        const field = this.form.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    getError(fieldName: string): string {
        const control = this.form.get(fieldName);
        if (!control || !control.errors) return '';

        if (control.errors['required']) return 'Este campo es requerido';
        if (control.errors['maxlength']) return `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;

        return 'Este campo es inválido';
    }

    onVisibleChange(value: boolean): void {
        if (!value) this.closed.emit();
    }

    cancel(): void {
        this.closed.emit();
    }

    submit(): void {
        const countryCode = this.effectiveCountryCode;
        if (this.form.invalid || !countryCode) {
            Object.keys(this.form.controls).forEach((key) => this.form.get(key)?.markAsTouched());
            return;
        }

        this.inlineError = null;
        const value = this.form.value;
        const fields = {
            entityTypeId: value.entityTypeId,
            name: (value.name as string).trim(),
            externalCode: this.toNullable(value.externalCode),
            mobilityCode: this.toNullable(value.mobilityCode),
            nit: this.toNullable(value.nit),
            scope: this.toNullable(value.scope),
            notes: this.toNullable(value.notes)
        };

        if (this.mode === 'edit' && this.healthEntity) {
            this.store.dispatch(HealthEntitiesActions.update({ id: this.healthEntity.id, countryCode, payload: fields }));
        } else {
            this.store.dispatch(HealthEntitiesActions.create({ payload: { countryCode, ...fields } }));
        }
    }

    private toNullable(value: string | null): string | null {
        const trimmed = value?.trim();
        return trimmed ? trimmed : null;
    }

    private buildForm(): FormGroup {
        return this.fb.group({
            entityTypeId: [null as number | null, Validators.required],
            name: ['', [Validators.required, Validators.maxLength(200)]],
            externalCode: [null as string | null, Validators.maxLength(50)],
            mobilityCode: [null as string | null, Validators.maxLength(50)],
            nit: [null as string | null, Validators.maxLength(50)],
            scope: [null as string | null, Validators.maxLength(100)],
            notes: [null as string | null, Validators.maxLength(500)]
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
