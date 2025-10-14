import { Component, OnInit, OnDestroy, inject } from '@angular/core';
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
import * as companyActions from '../../state/actions/company-360.actions';
import * as fromCompany from '../../state/selectors/company-360.selectors';
import { DepartmentCityActions } from '@/core/state/actions/department-city.actions';
import { selectAllDepartments, selectAllCities } from '@/core/state/selectors/department-city.selectors';
import { Observable, Subject, filter, takeUntil, distinctUntilChanged } from 'rxjs';
import { TooltipModule } from 'primeng/tooltip';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-company-form',
    templateUrl: './company-form.html',
    imports: [CommonModule, ToastModule, TooltipModule, InputTextModule, SelectModule, ButtonModule, FileUploadModule, CheckboxModule, ReactiveFormsModule, ProgressSpinnerModule]
})
export class CompanyFormComponent implements OnInit, OnDestroy {
    // Archivos cargados
    rutFileUrlFile: File | null = null;
    certificateFileFile: File | null = null;
    orgChartFileFile: File | null = null;

    onRutFileChange(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.rutFileUrlFile = file;
            this.form.patchValue({ rutFileUrl: file.name });
        }
    }

    onCertificateFileChange(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.certificateFileFile = file;
            this.form.patchValue({ certificateFile: file.name });
        }
    }

    onOrgChartFileChange(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.orgChartFileFile = file;
            this.form.patchValue({ orgChartFile: file.name });
        }
    }
    private fb = inject(FormBuilder);
    private store = inject(Store);
    private messageService = inject(MessageService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private destroy$ = new Subject<void>();

    form!: FormGroup;
    isEditMode = false;
    companyId!: number;
    company$!: Observable<Company | null | undefined>;
    loading$!: Observable<boolean>;
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

    ngOnInit(): void {
        this.buildForm();
        // Detectar modo edición y cargar compañía
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.companyId = +id;
            this.store.dispatch(companyActions.loadCompanyById({ id: this.companyId }));
            this.company$ = this.store.select(fromCompany.selectCompanyById(this.companyId));
            this.company$
                .pipe(
                    takeUntil(this.destroy$),
                    filter((company) => !!company)
                )
                .subscribe((company) => {
                    this.form.patchValue(company!);
                });
        } else {
            this.company$ = this.store.select(fromCompany.selectCompanyById(0));
        }
        this.loading$ = this.store.select(fromCompany.selectCompanyLoading);

        // Cargar datos iniciales
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
            logoUrl: ['', Validators.required],
            companyName: ['', Validators.required],
            legalType: [null, Validators.required],
            documentType: [null, Validators.required],
            numberIdentification: [null, [Validators.required, Validators.min(1)]],
            verificationDigit: [''],
            email: ['', [Validators.required, Validators.email]],
            rutFileUrl: [''],
            certificateFile: [''],
            taxRegime: [null, Validators.required],
            taxResponsibility: [null, Validators.required],
            sector: [''],
            website: [''],
            currency: [null, Validators.required],
            orgChartFile: [''],
            address: [''],
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
            this.store.dispatch(companyActions.updateCompany({ company }));
        } else {
            this.store.dispatch(companyActions.createCompany({ company }));
        }
        this.router.navigate(['/company-360/list']);
    }

    cancel(): void {
        this.router.navigate(['/company-360/list']);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
