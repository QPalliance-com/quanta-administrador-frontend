import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { Company, generateTenantSlug, CompanyRequest } from '@/core/models';
import { DOCUMENT_TYPE_LABELS, DocumentType } from '@/core/enums/document-type.enum';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Store } from '@ngrx/store';
import { initLocationData } from '@/core/state/actions/department-city.actions';
import { selectAllDepartments, selectCitiesByDepartment } from '@/core/state/selectors/department-city.selectors';
import { Observable, Subject, filter, of, startWith, switchMap, takeUntil, distinctUntilChanged } from 'rxjs';
import { TooltipModule } from 'primeng/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { CompaniesActions } from '../../state/actions/companies.actions';
import { selectSelectedCompany, selectCompaniesLoading } from '../../state/selectors/companies.selectors';

@Component({
    standalone: true,
    selector: 'app-company-form',
    templateUrl: './company-form.html',
    imports: [CommonModule, ToastModule, TooltipModule, InputTextModule, SelectModule, ButtonModule, FileUploadModule, CheckboxModule, ReactiveFormsModule, ProgressSpinnerModule]
})
export class CompanyFormComponent implements OnInit, OnDestroy {
    private fb = inject(FormBuilder);
    private store = inject(Store);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private destroy$ = new Subject<void>();

    rutFileUrlFile: File | null = null;
    certificateFileFile: File | null = null;
    orgChartFileFile: File | null = null;
    logoFile: File | null = null;

    form!: FormGroup;
    isEditMode = false;
    companyName = signal<string>('');
    companyId!: number;

    loading$ = this.store.select(selectCompaniesLoading);
    departments$ = this.store.select(selectAllDepartments);
    cities$!: Observable<{ id: number; name: string; departmentId: number }[]>;

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
            this.fileToBase64(file).then((base64) => this.form.patchValue({ logoUrl: base64 }));
        }
    }

    private fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    }

    onRutFileChange(event: any): void {
        const file = event.files?.[0];
        if (file) {
            this.rutFileUrlFile = file;
            this.fileToBase64(file).then((base64) => this.form.patchValue({ rutUrl: base64 }));
        }
    }

    onCertificateFileChange(event: any): void {
        const file = event.files?.[0];
        if (file) {
            this.certificateFileFile = file;
            this.fileToBase64(file).then((base64) => this.form.patchValue({ certificateFile: base64 }));
        }
    }

    onOrgChartFileChange(event: any): void {
        const file = event.files?.[0];
        if (file) {
            this.orgChartFileFile = file;
            this.fileToBase64(file).then((base64) => this.form.patchValue({ orgChartFile: base64 }));
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
        if (control.errors['email']) return 'Ingresa un correo válido';
        if (control.errors['min']) return `El valor mínimo es ${control.errors['min'].min}`;
        if (control.errors['minlength'])
            return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
        if (control.errors['maxlength'])
            return `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;

        return 'Este campo es inválido';
    }

    ngOnInit(): void {
        this.buildForm();

        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.companyId = +id;
            this.store.dispatch(CompaniesActions.loadCompany({ id: this.companyId }));

            this.store.select(selectSelectedCompany)
                .pipe(filter(Boolean), takeUntil(this.destroy$))
                .subscribe((company: Company) => {
                    this.companyName.set(company.companyName);
                    this.form.patchValue(company);
                });
        }

        this.store.dispatch(initLocationData());

        this.cities$ = this.form.get('departmentId')!.valueChanges.pipe(
            startWith(this.form.get('departmentId')!.value),
            distinctUntilChanged(),
            switchMap((departmentId) =>
                departmentId ? this.store.select(selectCitiesByDepartment(departmentId)) : of([])
            )
        );

        this.form
            .get('departmentId')
            ?.valueChanges.pipe(takeUntil(this.destroy$), distinctUntilChanged())
            .subscribe(() => {
                this.form.patchValue({ cityId: null }, { emitEvent: false });
            });
    }

    private buildForm(): void {
        this.form = this.fb.group({
            id: [null],
            logoUrl: [''],
            companyName: ['', Validators.required],
            documentType: [null],
            identificationType: [null, Validators.required],
            numberIdentification: ['', [Validators.required, Validators.min(1)]],
            verificationDigit: [''],
            email: ['', [Validators.required, Validators.email]],
            names: [''],
            lastNames: [''],
            phone: [''],
            rutUrl: [''],
            certificateFile: [''],
            tenantSlug: ['', Validators.required],
            website: [''],
            providerCustomerPmId: ['PENDI'],
            identifyProvider: ['', Validators.required],
            orgChartFile: [''],
            address: ['', Validators.required],
            departmentId: [null, Validators.required],
            cityId: [null, Validators.required],
            onBoardingComplete: [false],
            postalCode: [''],
            fullNameBilling: [''],
            emailBilling: ['', Validators.email],
            contactPhoneBilling: ['']
        });

        this.form
            .get('companyName')
            ?.valueChanges.pipe(takeUntil(this.destroy$), distinctUntilChanged())
            .subscribe((companyName) => {
                if (companyName) {
                    this.form.patchValue(
                        { tenantSlug: generateTenantSlug(companyName) },
                        { emitEvent: false }
                    );
                }
            });
    }

    onUpload(_event: UploadEvent): void {}

    onSubmit(): void {
        if (this.form.invalid) {
            Object.keys(this.form.controls).forEach((key) => {
                this.form.get(key)?.markAsTouched();
            });
            return;
        }

        const formData = this.form.value;
        const companyRequest: CompanyRequest = {
            logoUrl: formData.logoUrl,
            companyName: formData.companyName,
            identificationType: formData.identificationType,
            numberIdentification: formData.numberIdentification,
            providerCustomerPmId: formData.providerCustomerPmId,
            identifyProvider: formData.identifyProvider,
            verificationDigit: formData.verificationDigit,
            email: formData.email,
            tenantSlug: formData.tenantSlug,
            rutUrl: formData.rutUrl,
            website: formData.website,
            address: formData.address,
            departmentId: formData.departmentId,
            cityId: formData.cityId,
            names: formData.names,
            lastNames: formData.lastNames,
            phone: formData.phone,
            onBoardingComplete: formData.onBoardingComplete ?? false,
            postalCode: formData.postalCode || undefined,
            fullNameBilling: formData.fullNameBilling || undefined,
            emailBilling: formData.emailBilling || undefined,
            contactPhoneBilling: formData.contactPhoneBilling || undefined
        };

        if (this.isEditMode && this.companyId) {
            companyRequest.id = this.companyId;
            this.store.dispatch(CompaniesActions.updateCompany({ company: companyRequest }));
        } else {
            this.store.dispatch(CompaniesActions.createCompany({ company: companyRequest }));
        }
    }

    cancel(): void {
        this.router.navigate(['/companies/list']);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
