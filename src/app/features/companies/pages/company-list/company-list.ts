import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ConfirmationService, MessageService, MenuItem } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Column, ExportColumn } from '../../../../core/models/table-options.model';
import { Company } from '@/core/models';
import { TooltipModule } from 'primeng/tooltip';
import { InputIconModule } from 'primeng/inputicon';
import { Router } from '@angular/router';
import { CompanyService } from '@/core/services/company.service';
import { Drawer } from 'primeng/drawer';
import { Menu } from 'primeng/menu';
import { ExportToolbarComponent } from '@/shared/components/export-toolbar/export-toolbar';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'app-company-list',
    standalone: true,
    imports: [
        CommonModule,
        InputIconModule,
        TableModule,
        InputTextModule,
        TooltipModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        TagModule,
        ConfirmDialogModule,
        Drawer,
        Menu,
        ExportToolbarComponent
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './company-list.html'
})
export class CompanyListComponent implements OnInit {
    private companyService = inject(CompanyService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private router = inject(Router);

    filterFields: string[] = [
        'companyName',
        'legalType',
        'email'
    ];
    cols!: Column[];
    exportColumns!: ExportColumn[];
    companies = this.companyService.companies;
    companiesLoading = this.companyService.loading;
    
    displayViewDrawer = false;
    selectedCompany: Company | null = null;
    rowMenuItems: MenuItem[] = [];
    error$: Observable<string | null> = new BehaviorSubject(null);
    
    @ViewChild('companiesTable') companiesTable!: Table;
    @ViewChild('rowMenu') rowMenu!: Menu;

    colTooltips: Record<string, string> = {
        logoUrl: 'Logo de la compañía',
        companyName: 'Nombre legal de la compañía',
        legalType: 'Tipo de persona jurídica o natural',
        numberIdentification: 'NIT o identificación',
        email: 'Correo electrónico',
        sector: 'Sector económico',
        currency: 'Moneda principal',
        address: 'Dirección principal'
    };

    ngOnInit(): void {
        this.companyService.loadCompanies().subscribe({
            error: () => {
                console.error('Error loading companies');
            }
        });
        this.initializeColumns();
    }

    private initializeColumns(): void {
        this.cols = [
            { field: 'logoUrl', header: 'Logo', customExportHeader: 'Logo' },
            { field: 'companyName', header: 'Nombre', customExportHeader: 'Nombre legal' },
            { field: 'legalType', header: 'Tipo', customExportHeader: 'Tipo' },
            { field: 'email', header: 'Correo', customExportHeader: 'Correo electrónico' }
        ];
        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew(): void {
        this.router.navigate(['/companies/new']);
    }

    navigateToView(companyId: string | number): void {
        if (companyId) {
            this.viewCompanyDetail(Number(companyId));
        }
    }

    private viewCompanyDetail(companyId: number): void {
        this.selectedCompany = null;
        this.companyService.loadCompanyById(companyId).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.selectedCompany = response.data;
                    this.displayViewDrawer = true;
                }
            },
            error: () => {
                this.error$ = new BehaviorSubject('No se pudo cargar el detalle de la compañía.');
            }
        });
    }

    navigateToEdit(companyId: string | number): void {
        if (companyId) {
            this.router.navigate(['/companies/edit', companyId]);
        }
    }

    openRowMenu(event: MouseEvent, company: Company): void {
        event.stopPropagation();
        this.rowMenuItems = [
            {
                label: 'Ver detalle',
                icon: 'pi pi-eye',
                command: () => this.viewCompanyDetail(company.id!)
            },
            {
                label: 'Editar',
                icon: 'pi pi-pencil',
                command: () => this.navigateToEdit(company.id!)
            },
            { separator: true },
            {
                label: 'Eliminar',
                icon: 'pi pi-trash',
                styleClass: 'danger-menu-item',
                command: () => this.deleteCompany(company)
            }
        ];
        this.rowMenu.toggle(event);
    }

    editCompany(company: Company | null): void {
        if (!company) {
            return;
        }
        this.router.navigate(['/companies/edit', company.id]);
    }

    deleteCompany(company: Company): void {
        this.confirmationService.confirm({
            message: `¿Está seguro que desea eliminar la compañía <b>${company.companyName}</b>?`,
            header: 'Confirmar eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, eliminar',
            rejectLabel: 'No, cancelar',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.companyService.deleteCompany(company.id).subscribe({
                    error: (err) => {
                        console.error('Error deleting company:', err);
                    }
                });
            }
        });
    }

    exportTable(format: 'excel' | 'csv'): void {
        this.messageService.add({ severity: 'success', summary: 'Exportación', detail: `Exportado como ${format.toUpperCase()}` });
    }
}
