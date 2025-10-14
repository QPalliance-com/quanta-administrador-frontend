import { Component, OnInit, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Store } from '@ngrx/store';
import { Column } from '../../../../core/models/table-options.model';
import { Company } from '@/core/models';
import * as fromCompany from '../../state/selectors/company-360.selectors';
import * as companyActions from '../../state/actions/company-360.actions';
import { Observable } from 'rxjs';
import { TooltipModule } from 'primeng/tooltip';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CompanyInfoComponent } from '../../components/company-info/company-info';
import { Router } from '@angular/router';

@Component({
    selector: 'app-company-list',
    standalone: true,
    imports: [
        CommonModule,
        IconFieldModule,
        InputIconModule,
        TableModule,
        InputTextModule,
        TooltipModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        DialogModule,
        TagModule,
        ConfirmDialogModule,
        ProgressSpinnerModule,
        CompanyInfoComponent
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './company-list.html'
})
export class CompanyListComponent implements OnInit {
    filterFields: string[] = [
        'companyName',
        'legalType',
        'numberIdentification',
        'email',
        'sector',
        'currency',
        'address'
    ];
    cols!: Column[];
    companies$!: Observable<Company[]>;
    companiesLoading$!: Observable<boolean>;
    selectedCompanies: Company[] = [];
    selectedCompany: Company | null = null;
    displayViewDialog = false;
    @ViewChild('companiesTable') companiesTable!: Table;

    constructor(
        private store: Store,
        private confirmationService: ConfirmationService,
        private cdr: ChangeDetectorRef,
        private router: Router
    ) {
        this.companies$ = this.store.select(fromCompany.selectCompanies);
        this.companiesLoading$ = this.store.select(fromCompany.selectCompanyLoading);
    }

    ngOnInit(): void {
        this.store.dispatch(companyActions.loadCompanies());
        this.cols = [
            { field: 'logoUrl', header: 'Logo', customExportHeader: 'Logo' },
            { field: 'companyName', header: 'Nombre', customExportHeader: 'Nombre legal' },
            { field: 'legalType', header: 'Tipo Legal', customExportHeader: 'Tipo Legal' },
            { field: 'numberIdentification', header: 'NIT', customExportHeader: 'NIT' },
            { field: 'email', header: 'Correo', customExportHeader: 'Correo electrónico' },
            { field: 'sector', header: 'Sector', customExportHeader: 'Sector económico' },
            { field: 'currency', header: 'Moneda', customExportHeader: 'Moneda principal' },
            { field: 'address', header: 'Dirección', customExportHeader: 'Dirección principal' }
        ];
    }

    openNew() {
           this.router.navigate(['/company-360/new']);
       }
   
       editCompany(company:Company) {
           this.router.navigate(['/company-360/edit', company.id]);
       }

    viewCompany(company: Company) {
        this.selectedCompany = company;
          this.displayViewDialog = true;
    
    }

    deleteCompany(company: Company) {
        this.confirmationService.confirm({
            message: `¿Seguro que deseas eliminar la compañía ${company.companyName}?`,
            accept: () => {
                this.store.dispatch(companyActions.deleteCompany({ id: company.id }));
            }
        });
    }

    exportTable(format: 'excel' | 'csv') {
        if (!this.companiesTable) return;
        if (format === 'excel') {
            (this.companiesTable as any).exportExcel?.();
        } else {
            this.companiesTable.exportCSV();
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
