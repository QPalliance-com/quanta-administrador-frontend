import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { Company } from '@/core/models';
import { DOCUMENT_TYPE_LABELS, DocumentType } from '@/core/enums/document-type.enum';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { DepartmentCityActions } from '@/core/state/actions/department-city.actions';
import { selectAllDepartments, selectAllCities } from '@/core/state/selectors/department-city.selectors';
import { Subject, filter, takeUntil, distinctUntilChanged } from 'rxjs';
import { TooltipModule } from 'primeng/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '@/core/services/company.service';

@Component({
    standalone: true,
    selector: 'app-company-form',
    templateUrl: './company-form.html',
    imports: [CommonModule, ToastModule, TooltipModule, InputTextModule, SelectModule, ButtonModule, FileUploadModule, CheckboxModule, ReactiveFormsModule, ProgressSpinnerModule]
})
export class CompanyFormComponent implements OnInit, OnDestroy {
    private fb = inject(FormBuilder);
    private store = inject(Store);
    private messageService = inject(MessageService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private companyService = inject(CompanyService);
    private destroy$ = new Subject<void>();

    // Archivos cargados
    rutFileUrlFile: File | null = null;
    certificateFileFile: File | null = null;
    orgChartFileFile: File | null = null;
    logoFile: File | null = null;

    form!: FormGroup;
    isEditMode = false;
    companyName = signal<string>('');
    companyId!: number;
    loading = this.companyService.loading;
    departments$ = this.store.select(selectAllDepartments);
    cities$ = this.store.select(selectAllCities);
    
    documentTypes = Object.values(DocumentType).map((type) => ({
        label: DOCUMENT_TYPE_LABELS[type],
        value: type
    }));
    legalTypes = [
        { label: 'Persona Natural', value: 'natural' },
        { label: 'Persona Jurídica', value: 'juridical' }
    ];
    taxRegimes = [
        { label: 'Régimen Común', value: 'comun' },
        { label: 'Régimen Simplificado', value: 'simplificado' }
    ];
    taxResponsibilities = [
        { label: 'Responsable de IVA', value: 'iva' },
        { label: 'No responsable de IVA', value: 'no_iva' }
    ];
    sectors = [
        { label: 'Comercio', value: 'comercio' },
        { label: 'Servicios', value: 'servicios' },
        { label: 'Industria', value: 'industria' }
    ];
    currencies = [
        { label: 'Peso Colombiano (COP)', value: 'COP' },
        { label: 'Dólar (USD)', value: 'USD' },
        { label: 'Euro (EUR)', value: 'EUR' }
    ];

    onLogoFileChange(event: any): void {
        const file = event.files?.[0];
        if (file) {
            this.logoFile = file;
            this.form.patchValue({ logoUrl: file.name });
        }
    }

    onRutFileChange(event: any): void {
        const file = event.files?.[0];
        if (file) {
            this.rutFileUrlFile = file;
            this.form.patchValue({ rutFileUrl: file.name });
        }
    }

    onCertificateFileChange(event: any): void {
        const file = event.files?.[0];
        if (file) {
            this.certificateFileFile = file;
            this.form.patchValue({ certificateFileUrl: file.name });
        }
    }

    onOrgChartFileChange(event: any): void {
        const file = event.files?.[0];
        if (file) {
            this.orgChartFileFile = file;
            this.form.patchValue({ orgChartFileUrl: file.name });
        }
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
        if (control.errors['email']) {
            return 'Ingresa un correo válido';
        }
        if (control.errors['min']) {
            return `El valor mínimo es ${control.errors['min'].min}`;
        }
        if (control.errors['minlength']) {
            return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
        }
        if (control.errors['maxlength']) {
            return `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;
        }

        return 'Este campo es inválido';
    }

    ngOnInit(): void {
        this.buildForm();
        
        // Detectar modo edición y cargar compañía
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.companyId = +id;
            this.companyService.loadCompanyById(this.companyId)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (response) => {
                        if (response.data) {
                            this.companyName.set(response.data.companyName);
                            this.form.patchValue(response.data);
                        }
                    },
                    error: (err) => console.error('Error loading company', err)
                });
        }

        // Cargar datos iniciales de departamentos
        this.store.dispatch(DepartmentCityActions.loadDepartments());

        // Escuchar cambios de departamento para cargar ciudades
        this.form
            .get('departmentId')
            ?.valueChanges.pipe(takeUntil(this.destroy$), distinctUntilChanged())
            .subscribe((departmentId) => {
                if (departmentId) {
                    this.store.dispatch(DepartmentCityActions.loadCities({ departmentId }));
                    this.form.patchValue({ cityId: null }, { emitEvent: false });
                }
            });
    }

    private buildForm(): void {
        this.form = this.fb.group({
            id: [null],
            logoUrl: [''],
            companyName: ['', Validators.required],
            legalType: [null, Validators.required],
            documentType: [null, Validators.required],
            numberIdentification: [null, [Validators.required, Validators.min(1)]],
            verificationDigit: [''],
            contactFirstName: ['', Validators.required],
            contactLastName: ['', Validators.required],
            contactEmail: ['', [Validators.required, Validators.email]],
            contactPhone: ['', Validators.required],
            rutFileUrl: [''],
            certificateFileUrl: [''],
            taxRegime: [null],
            taxResponsibility: [null],
            sector: [''],
            website: [''],
            currency: [null, Validators.required],
            orgChartFileUrl: [''],
            address: ['', Validators.required],
            departmentId: [null, Validators.required],
            cityId: [null, Validators.required],
            collaboratorsCount: [{ value: null, disabled: true }]
        });
    }

    onUpload(event: UploadEvent): void {
        this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'File Uploaded with Basic Mode'
        });
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
        const company: Company = this.form.value;
        if (this.isEditMode) {
            this.companyService.updateCompany(company)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: () => this.router.navigate(['/company-360/list']),
                    error: (err) => console.error('Error updating company', err)
                });
        } else {
            this.companyService.createCompany(company)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: () => this.router.navigate(['/company-360/list']),
                    error: (err) => console.error('Error creating company', err)
                });
        }
    }

    cancel(): void {
        this.router.navigate(['/company-360/list']);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
