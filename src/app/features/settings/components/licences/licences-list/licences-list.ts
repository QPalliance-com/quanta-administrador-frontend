import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService, MenuItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { Licence } from '@/core/models';
import { LicenceStateService } from '../../../state/services/licence-state.service';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { Drawer } from 'primeng/drawer';
import { Menu } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { InputIconModule } from 'primeng/inputicon';
import { BehaviorSubject, Observable } from 'rxjs';
import { Column, ExportColumn } from '@/core/models/table-options.model';

@Component({
    standalone: true,
    selector: 'app-licences-list',
    templateUrl: './licences-list.html',
    imports: [
        CommonModule,
        RouterModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        ToastModule,
        ConfirmDialogModule,
        FormsModule,
        TagModule,
        TooltipModule,
        ToolbarModule,
        Drawer,
        Menu,
        RippleModule,
        InputIconModule
    ],
    providers: [ConfirmationService, MessageService]
})
export class LicencesListComponent implements OnInit {
    private router = inject(Router);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    licenceStateService = inject(LicenceStateService);

    filterFields: string[] = ['licences', 'amountUsd', 'amountCop', 'currency'];
    cols!: Column[];
    exportColumns!: ExportColumn[];

    displayViewDrawer = false;
    selectedLicence: Licence | null = null;
    rowMenuItems: MenuItem[] = [];
    error$: Observable<string | null> = new BehaviorSubject(null);

    @ViewChild('licencesTable') licencesTable!: Table;
    @ViewChild('rowMenu') rowMenu!: Menu;

    colTooltips: Record<string, string> = {
        licences: 'Tipo de plan de suscripción',
        amountUsd: 'Monto en dólares estadounidenses',
        amountCop: 'Monto en pesos colombianos',
        currency: 'Moneda de referencia',
        exchangeRate: 'Tasa de cambio USD/COP'
    };

    licences$!: Observable<Licence[]>;

    ngOnInit(): void {
        this.licenceStateService.loadLicences();
        this.licences$ = new BehaviorSubject(this.licenceStateService.licences()).asObservable();
        this.initializeColumns();
        this.initializeRowMenu();
    }

    private initializeColumns(): void {
        this.cols = [
            { field: 'licences', header: 'Tipo de Plan', customExportHeader: 'Tipo de Plan' },
            { field: 'amountUsd', header: 'Monto USD', customExportHeader: 'Monto USD' },
            { field: 'amountCop', header: 'Monto COP', customExportHeader: 'Monto COP' },
            { field: 'currency', header: 'Moneda', customExportHeader: 'Moneda' },
            { field: 'exchangeRate', header: 'Tasa de Cambio', customExportHeader: 'Tasa de Cambio' }
        ];
        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    private initializeRowMenu(): void {
        this.rowMenuItems = [
            {
                label: 'Ver detalles',
                icon: 'pi pi-eye',
                command: () => {
                    if (this.selectedLicence) {
                        this.displayViewDrawer = true;
                    }
                }
            },
            {
                label: 'Editar',
                icon: 'pi pi-pencil',
                command: () => {
                    if (this.selectedLicence) {
                        this.navigateToEdit(this.selectedLicence.id);
                    }
                }
            },
            {
                label: 'Eliminar',
                icon: 'pi pi-trash',
                severity: 'danger',
                command: () => {
                    if (this.selectedLicence) {
                        this.onDelete(this.selectedLicence);
                    }
                }
            }
        ];
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew(): void {
        this.router.navigate(['/settings/licences/new']);
    }

    openRowMenu(event: Event, licence: Licence): void {
        this.selectedLicence = licence;
        this.rowMenu.toggle(event);
    }

    navigateToEdit(id: number): void {
        this.router.navigate(['/settings/licences', id]);
    }

    onDelete(licence: Licence): void {
        this.confirmationService.confirm({
            message: `¿Estás seguro de que deseas eliminar el plan "${this.formatPlanName(licence.licences)}"?`,
            header: 'Confirmar eliminación',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.licenceStateService.deleteLicence(licence.id);
            }
        });
    }

    formatPlanName(name: string): string {
        return name.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
    }
}
