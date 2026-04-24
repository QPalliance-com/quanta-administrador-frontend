import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Licence } from '@/core/models';
import { LicenceStateService } from '../../../state/services/licence-state.service';

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
    private messageService = inject(MessageService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    licenceStateService = inject(LicenceStateService);
    private destroy$ = new Subject<void>();

    form!: FormGroup;
    isEditMode = false;
    licenceName = signal<string>('');
    licenceId!: number;

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

            const currentLicence = this.licenceStateService.selectedLicence();
            if (currentLicence) {
                this.licenceName.set(currentLicence.licences);
                this.form.patchValue(currentLicence);
            } else {
                this.licenceStateService.getLicence(this.licenceId);
            }
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
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
        if (!control || !control.errors) {
            return '';
        }

        if (control.errors['required']) {
            return 'Este campo es requerido';
        }
        if (control.errors['minlength']) {
            return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
        }
        if (control.errors['min']) {
            return `El valor mínimo es ${control.errors['min'].min}`;
        }

        return 'Este campo es inválido';
    }

    onSubmit(): void {
        if (this.form.invalid) {
            Object.keys(this.form.controls).forEach((key) => {
                const control = this.form.get(key);
                if (control?.invalid) {
                    control.markAsTouched();
                }
            });
            return;
        }

        const licence: Licence = this.form.value;

        if (this.isEditMode) {
            this.licenceStateService.updateLicence(this.licenceId, licence);
            
        } else {
            this.licenceStateService.createLicence(licence);
            setTimeout(() => {
                this.router.navigate(['/settings/licences/list']);
            }, 1500);
        }
    }

    cancel(): void {
        this.router.navigate(['/settings/licences/list']);
    }
}

