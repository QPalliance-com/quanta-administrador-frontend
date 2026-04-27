import { Component, OnInit, OnDestroy, ViewChild, inject } from '@angular/core';
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
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { Drawer } from 'primeng/drawer';
import { Menu } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { InputIconModule } from 'primeng/inputicon';
import { Subject, takeUntil } from 'rxjs';
import { Column, ExportColumn } from '@/core/models/table-options.model';
import { Store } from '@ngrx/store';
import { LicencesActions } from '../../../state/actions/licences.actions';
import { selectAllLicences, selectLicencesLoading, selectSelectedLicence } from '../../../state/selectors/licences.selectors';

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
export class LicencesListComponent implements OnInit, OnDestroy {
    private store = inject(Store);
    private router = inject(Router);
    private confirmationService = inject(ConfirmationService);
    private destroy$ = new Subject<void>();

    filterFields: string[] = ['licences', 'amountUsd', 'amountCop', 'currency'];
    cols!: Column[];
    exportColumns!: ExportColumn[];

    licences$ = this.store.select(selectAllLicences);
    loading$ = this.store.select(selectLicencesLoading);
    error$ = this.store.select((state) => state.licences.error);
    selectedLicence: Licence | null = null;
    displayViewDrawer = false;
    rowMenuItems: MenuItem[] = [];

    @ViewChild('licencesTable') licencesTable!: Table;
    @ViewChild('rowMenu') rowMenu!: Menu;

    colTooltips: Record<string, string> = {
        licences: 'Tipo de plan de suscripción',
        amountUsd: 'Monto en dólares estadounidenses',
        amountCop: 'Monto en pesos colombianos',
        currency: 'Moneda de referencia',
        exchangeRate: 'Tasa de cambio USD/COP'
    };

    ngOnInit(): void {
        this.store.dispatch(LicencesActions.loadLicences());
        this.initializeColumns();
        this.initializeRowMenu();

        this.store.select(selectSelectedLicence)
            .pipe(takeUntil(this.destroy$))
            .subscribe((licence) => {
                if (licence) {
                    this.selectedLicence = licence;
                }
            });
    }

    private initializeColumns(): void {
        this.cols = [
            { field: 'licences', header: 'Tipo de Plan', customExportHeader: 'Tipo de Plan' },
            { field: 'amountUsd', header: 'Monto USD', customExportHeader: 'Monto USD' },
            { field: 'currency', header: 'Moneda', customExportHeader: 'Moneda' },
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
                this.store.dispatch(LicencesActions.deleteLicence({ id: licence.id }));
            }
        });
    }

    formatPlanName(name: string): string {
        return name.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
    }

    ngOnDestroy(): void {
        this.store.dispatch(LicencesActions.clearSelectedLicence());
        this.destroy$.next();
        this.destroy$.complete();
    }
}
