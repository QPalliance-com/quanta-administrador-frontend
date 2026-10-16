import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { Company, generateTenantSlug, CompanyRequest } from '@/core/models';
import { Department } from '@/core/models/department-city.model';
import { IdentificationType } from '@/core/models/identification-type.model';
import { buildNumberValidator } from '@/core/validators/identification-number.validator';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Store } from '@ngrx/store';
import { DepartmentCityActions, initLocationData } from '@/core/state/actions/department-city.actions';
import { selectAllDepartments, selectCitiesByDepartment } from '@/core/state/selectors/department-city.selectors';
import { IdentificationTypeActions } from '@/core/state/actions/identification-type.actions';
import { selectAllIdentificationTypes } from '@/core/state/selectors/identification-type.selectors';
import { Observable, Subject, combineLatest, filter, map, of, startWith, switchMap, takeUntil, distinctUntilChanged } from 'rxjs';
import { TooltipModule } from 'primeng/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { CompaniesActions } from '../../state/actions/companies.actions';
import { CountriesActions } from '../../state/actions/countries.actions';
import { selectSelectedCompany, selectCompaniesLoading, selectCompaniesFieldError } from '../../state/selectors/companies.selectors';
import { selectAllCountries } from '../../state/selectors/countries.selectors';

// Texto de formato por código de tipo de identificación (refleja las reglas del backend, ms-admin V64)
const IDENTIFICATION_FORMAT_HINTS: Record<string, string> = {
    NIT: 'Formato: 9 o 10 dígitos, sin guiones ni dígito de verificación',
    CC: 'Formato: entre 6 y 10 dígitos',
    CE: 'Formato: entre 6 y 7 dígitos',
    RFC: 'Formato: 12 caracteres (persona moral) o 13 (persona física), se convierte a mayúsculas',
    CURP: 'Formato: 18 caracteres, se convierte a mayúsculas'
};

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
    countries = toSignal(this.store.select(selectAllCountries), { initialValue: [] });
    departments$!: Observable<Department[]>;
    cities$!: Observable<{ id: number; name: string; departmentId: number }[]>;

    identificationTypeOptions$!: Observable<{ label: string; value: string }[]>;
    // Tipo de identificación seleccionado (del catálogo del país); null si no hay o es legado/no cargado
    selectedType = signal<IdentificationType | null>(null);

    // Ayuda visible bajo el número de identificación: se muestra solo si hay tipo seleccionado con texto de formato
    identificationFormatHint(): string | null {
        const code = this.selectedType()?.code;
        return code ? (IDENTIFICATION_FORMAT_HINTS[code] ?? null) : null;
    }

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
            this.fileToBase64(file).then((base64) => this.form.patchValue({ taxRegistrationDocUrl: base64 }));
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

        // Error del backend (422 60/61/62) asociado al campo; se limpia al volver a validar el control
        if (control.errors['server']) return control.errors['server'];
        if (control.errors['required']) return 'Este campo es requerido';
        if (control.errors['pattern']) return 'El formato no es válido para el tipo de identificación seleccionado';
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
        // Descarta un error de campo de un intento anterior antes de suscribirse
        this.store.dispatch(CompaniesActions.clearError());

        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.companyId = +id;
            // El país es inmutable: sin preselección y deshabilitado (no viaja en form.value)
            this.form.get('countryCode')!.reset({ value: null, disabled: true });
            this.store.dispatch(CompaniesActions.loadCompany({ id: this.companyId }));

            this.store.select(selectSelectedCompany)
                .pipe(filter(Boolean), takeUntil(this.destroy$))
                .subscribe((company: Company) => {
                    this.companyName.set(company.companyName);
                    this.form.patchValue(company);
                    // El país es inmutable: se usa el de la company, nunca null
                    if (company.countryCode) {
                        this.store.dispatch(DepartmentCityActions.loadDepartments({ countryCode: company.countryCode }));
                        this.store.dispatch(IdentificationTypeActions.loadIdentificationTypes({ countryCode: company.countryCode }));
                    }
                });
        }

        this.store.dispatch(initLocationData());
        this.store.dispatch(CountriesActions.loadCountries());

        // Solo los departamentos del país seleccionado (el state acumula los de todos los países)
        const countryCode$ = this.form.get('countryCode')!.valueChanges.pipe(
            startWith(this.form.get('countryCode')!.value),
            map(() => this.form.get('countryCode')!.getRawValue() as string | null),
            distinctUntilChanged()
        );
        this.departments$ = combineLatest([this.store.select(selectAllDepartments), countryCode$]).pipe(
            map(([departments, countryCode]) => departments.filter((d) => d.countryCode === countryCode))
        );

        // Tipos de identificación del país del form (el state acumula los de todos los países)
        const identificationTypes$ = combineLatest([this.store.select(selectAllIdentificationTypes), countryCode$]).pipe(
            map(([types, countryCode]) => types.filter((t) => t.countryCode === countryCode))
        );
        const identificationTypeCode$ = this.form.get('identificationType')!.valueChanges.pipe(
            startWith(this.form.get('identificationType')!.value as string | null),
            distinctUntilChanged()
        );

        // Opciones del select; en edición un tipo legado fuera del catálogo se muestra tal cual (el backend valida al guardar)
        this.identificationTypeOptions$ = combineLatest([identificationTypes$, identificationTypeCode$]).pipe(
            map(([types, code]) => {
                const options = types.map((t) => ({ label: t.displayName, value: t.code }));
                if (this.isEditMode && code && !types.some((t) => t.code === code)) {
                    options.push({ label: code, value: code });
                }
                return options;
            })
        );

        // Cambia el tipo (o llega el catálogo): recalcula dígito de verificación y validador del número
        combineLatest([identificationTypes$, identificationTypeCode$])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([types, code]) => this.applyIdentificationType(types.find((t) => t.code === code) ?? null));

        // Mayúsculas automáticas: el match del backend es case-sensitive sobre el valor ya normalizado
        this.form
            .get('numberIdentification')!
            .valueChanges.pipe(takeUntil(this.destroy$))
            .subscribe((value) => {
                if (typeof value === 'string' && value !== value.toUpperCase()) {
                    this.form.get('numberIdentification')!.setValue(value.toUpperCase(), { emitEvent: false });
                }
            });

        // 422 del backend (60/61/62) -> error en el campo correspondiente
        this.store
            .select(selectCompaniesFieldError)
            .pipe(filter(Boolean), takeUntil(this.destroy$))
            .subscribe(({ field, message }) => {
                const control = this.form.get(field);
                control?.setErrors({ server: message });
                control?.markAsTouched();
            });

        if (!this.isEditMode) {
            this.store.dispatch(
                IdentificationTypeActions.loadIdentificationTypes({
                    countryCode: this.form.get('countryCode')!.value
                })
            );
            this.form
                .get('countryCode')!
                .valueChanges.pipe(takeUntil(this.destroy$), distinctUntilChanged())
                .subscribe((countryCode) => {
                    // Tipos y formatos dependen del país: se limpia la identificación completa
                    this.form.patchValue({
                        departmentId: null,
                        cityId: null,
                        identificationType: null,
                        numberIdentification: '',
                        verificationDigit: ''
                    });
                    if (countryCode) {
                        this.store.dispatch(DepartmentCityActions.loadDepartments({ countryCode }));
                        this.store.dispatch(IdentificationTypeActions.loadIdentificationTypes({ countryCode }));
                    }
                });
        }

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

    /**
     * Ajusta validadores según el tipo seleccionado: el dígito solo aplica si hasVerificationDigit
     * y el número se valida contra el validationRegex del tipo. Sin tipo conocido (legado/no cargado) no se
     * valida formato en cliente ni se exige dígito.
     */
    private applyIdentificationType(type: IdentificationType | null): void {
        this.selectedType.set(type);

        const number = this.form.get('numberIdentification')!;
        number.setValidators([Validators.required, buildNumberValidator(type)]);
        number.updateValueAndValidity({ emitEvent: false });

        const digit = this.form.get('verificationDigit')!;
        if (type?.hasVerificationDigit) {
            digit.setValidators(Validators.required);
        } else {
            digit.clearValidators();
            if (type) digit.setValue('', { emitEvent: false });
        }
        digit.updateValueAndValidity({ emitEvent: false });
    }

    private buildForm(): void {
        this.form = this.fb.group({
            id: [null],
            countryCode: ['CO', Validators.required],
            logoUrl: [''],
            companyName: ['', Validators.required],
            identificationType: [null, Validators.required],
            numberIdentification: ['', Validators.required],
            verificationDigit: [''],
            email: ['', [Validators.required, Validators.email]],
            names: [''],
            lastNames: [''],
            phone: [''],
            taxRegistrationDocUrl: [''],
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
        // En creación el país es obligatorio: no se envía hasta que el catálogo esté cargado
        if (!this.isEditMode && !this.countries().length) return;

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
            numberIdentification: String(formData.numberIdentification ?? '').trim().toUpperCase(),
            providerCustomerPmId: formData.providerCustomerPmId,
            identifyProvider: formData.identifyProvider,
            verificationDigit: this.selectedType()?.hasVerificationDigit ? formData.verificationDigit : undefined,
            email: formData.email,
            tenantSlug: formData.tenantSlug,
            taxRegistrationDocUrl: formData.taxRegistrationDocUrl,
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
            companyRequest.countryCode = formData.countryCode;
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
