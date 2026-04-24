import { Component, OnInit, OnDestroy, ViewChild, inject } from '@angular/core';
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
import { Drawer } from 'primeng/drawer';
import { Menu } from 'primeng/menu';
import { ExportToolbarComponent } from '@/shared/components/export-toolbar/export-toolbar';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { CompaniesActions } from '../../state/actions/companies.actions';
import { selectAllCompanies, selectCompaniesLoading, selectSelectedCompany } from '../../state/selectors/companies.selectors';

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
export class CompanyListComponent implements OnInit, OnDestroy {
    private store = inject(Store);
    private confirmationService = inject(ConfirmationService);
    private router = inject(Router);
    private destroy$ = new Subject<void>();

    filterFields: string[] = ['companyName', 'legalType', 'email'];
    cols!: Column[];
    exportColumns!: ExportColumn[];

    companies$ = this.store.select(selectAllCompanies);
    companiesLoading$ = this.store.select(selectCompaniesLoading);
    selectedCompany: Company | null = null;
    displayViewDrawer = false;
    rowMenuItems: MenuItem[] = [];

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
        this.store.dispatch(CompaniesActions.loadCompanies());
        this.initializeColumns();

        this.store.select(selectSelectedCompany)
            .pipe(takeUntil(this.destroy$))
            .subscribe((company) => {
                if (company) {
                    this.selectedCompany = company;
                    this.displayViewDrawer = true;
                }
            });
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
            this.store.dispatch(CompaniesActions.loadCompany({ id: Number(companyId) }));
        }
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
                command: () => this.navigateToView(company.id!)
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
        if (company) {
            this.router.navigate(['/companies/edit', company.id]);
        }
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
                this.store.dispatch(CompaniesActions.deleteCompany({ id: company.id }));
            }
        });
    }

    exportTable(_format: 'excel' | 'csv'): void {}

    ngOnDestroy(): void {
        this.store.dispatch(CompaniesActions.clearSelectedCompany());
        this.destroy$.next();
        this.destroy$.complete();
    }
}
