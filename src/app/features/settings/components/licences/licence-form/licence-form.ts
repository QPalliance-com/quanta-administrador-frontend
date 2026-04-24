import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { Subject, filter, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Licence } from '@/core/models';
import { Store } from '@ngrx/store';
import { LicencesActions } from '../../../state/actions/licences.actions';
import { selectSelectedLicence, selectLicencesLoading } from '../../../state/selectors/licences.selectors';

@Component({
    standalone: true,
    selector: 'app-licence-form',
    templateUrl: './licence-form.html',
    imports: [
        CommonModule,
        ToastModule,
        InputTextModule,
        SelectModule,
        ButtonModule,
        ReactiveFormsModule,
        InputNumberModule
    ],
    providers: [MessageService]
})
export class LicenceFormComponent implements OnInit, OnDestroy {
    private fb = inject(FormBuilder);
    private store = inject(Store);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private destroy$ = new Subject<void>();

    form!: FormGroup;
    isEditMode = false;
    licenceName = signal<string>('');
    licenceId!: number;

    loading$ = this.store.select(selectLicencesLoading);

    currencies = [
        { label: 'USD', value: 'USD' },
        { label: 'COP', value: 'COP' }
    ];

    licenceTypes = [
        { label: 'Basic', value: 'basic' },
        { label: 'Standard', value: 'standard' },
        { label: 'Premium', value: 'premium' },
        { label: 'System Admin', value: 'system_admin' }
    ];

    ngOnInit(): void {
        this.buildForm();

        const id = this.route.snapshot.paramMap.get('id');
        if (id && id !== 'new') {
            this.isEditMode = true;
            this.licenceId = +id;
            this.store.dispatch(LicencesActions.loadLicence({ id: this.licenceId }));

            this.store.select(selectSelectedLicence)
                .pipe(filter(Boolean), takeUntil(this.destroy$))
                .subscribe((licence: Licence) => {
                    this.licenceName.set(licence.licences);
                    this.form.patchValue(licence);
                });
        }
    }

    private buildForm(): void {
        this.form = this.fb.group({
            licences: ['', [Validators.required, Validators.minLength(3)]],
            amountUsd: [0, [Validators.required, Validators.min(0)]],
            amountCop: [0, [Validators.required, Validators.min(0)]],
            currency: ['USD', Validators.required],
            exchangeRate: [0, [Validators.required, Validators.min(0)]]
        });
    }

    isInvalid(fieldName: string): boolean {
        const field = this.form.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    getError(fieldName: string): string {
        const control = this.form.get(fieldName);
        if (!control || !control.errors) return '';

        if (control.errors['required']) return 'Este campo es requerido';
        if (control.errors['minlength'])
            return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
        if (control.errors['min']) return `El valor mínimo es ${control.errors['min'].min}`;

        return 'Este campo es inválido';
    }

    onSubmit(): void {
        if (this.form.invalid) {
            Object.keys(this.form.controls).forEach((key) => {
                this.form.get(key)?.markAsTouched();
            });
            return;
        }

        const licence: Licence = this.form.value;

        if (this.isEditMode) {
            this.store.dispatch(LicencesActions.updateLicence({ id: this.licenceId, licence }));
        } else {
            this.store.dispatch(LicencesActions.createLicence({ licence }));
        }
    }

    cancel(): void {
        this.router.navigate(['/settings/licences/list']);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
