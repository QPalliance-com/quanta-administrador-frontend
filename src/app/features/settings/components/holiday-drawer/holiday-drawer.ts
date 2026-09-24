import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Subject, takeUntil } from 'rxjs';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { HolidayCalendar } from '@/core/models';
import { HolidaysActions } from '../../state/actions/holidays.actions';
import { selectHolidaysLoading } from '../../state/selectors/holidays.selectors';

@Component({
    standalone: true,
    selector: 'app-holiday-drawer',
    templateUrl: './holiday-drawer.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, ReactiveFormsModule, DrawerModule, InputTextModule, DatePickerModule, ToggleSwitchModule, ButtonModule, MessageModule]
})
export class HolidayDrawerComponent implements OnChanges, OnDestroy {
    private fb = inject(FormBuilder);
    private store = inject(Store);
    private actions$ = inject(Actions);
    private destroy$ = new Subject<void>();

    @Input() visible = false;
    @Input() mode: 'create' | 'edit' = 'create';
    @Input() holiday: HolidayCalendar | null = null;
    @Output() closed = new EventEmitter<void>();

    form: FormGroup = this.buildForm();
    inlineError: string | null = null;
    loading$ = this.store.select(selectHolidaysLoading);

    constructor() {
        this.actions$
            .pipe(ofType(HolidaysActions.createSuccess, HolidaysActions.updateSuccess), takeUntil(this.destroy$))
            .subscribe(() => this.closed.emit());

        this.actions$
            .pipe(ofType(HolidaysActions.createFailure, HolidaysActions.updateFailure), takeUntil(this.destroy$))
            .subscribe(({ error }) => {
                this.inlineError = error;
            });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['visible'] && this.visible) {
            this.inlineError = null;
            this.form = this.buildForm();
            if (this.mode === 'edit' && this.holiday) {
                this.form.patchValue({
                    holidayDate: this.fromIsoDate(this.holiday.holidayDate),
                    name: this.holiday.name,
                    isActive: this.holiday.isActive
                });
            }
        }
    }

    get title(): string {
        return this.mode === 'edit' ? 'Editar día no laborable' : 'Agregar día no laborable';
    }

    isInvalid(fieldName: string): boolean {
        const field = this.form.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    getError(fieldName: string): string {
        const control = this.form.get(fieldName);
        if (!control || !control.errors) return '';

        if (control.errors['required']) return 'Este campo es requerido';
        if (control.errors['maxlength'])
            return `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;

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
            Object.keys(this.form.controls).forEach((key) => this.form.get(key)?.markAsTouched());
            return;
        }

        this.inlineError = null;
        const holidayDate = this.toIsoDate(this.form.value.holidayDate);

        if (this.mode === 'edit' && this.holiday) {
            this.store.dispatch(
                HolidaysActions.update({
                    id: this.holiday.id,
                    payload: {
                        holidayDate,
                        name: this.form.value.name,
                        countryCode: 'CO',
                        isActive: this.form.value.isActive
                    }
                })
            );
        } else {
            this.store.dispatch(
                HolidaysActions.create({
                    payload: { holidayDate, name: this.form.value.name, countryCode: 'CO' }
                })
            );
        }
    }

    private buildForm(): FormGroup {
        return this.fb.group({
            holidayDate: [null, Validators.required],
            name: ['', [Validators.required, Validators.maxLength(100)]],
            isActive: [true]
        });
    }

    private toIsoDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    private fromIsoDate(value: string): Date {
        const [year, month, day] = value.slice(0, 10).split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
