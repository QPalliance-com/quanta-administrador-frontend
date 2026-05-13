import { Component, OnInit, OnDestroy, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService, MenuItem } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Licence } from '@/core/models';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { Menu } from 'primeng/menu';
import { Actions, ofType } from '@ngrx/effects';
import { Subject, takeUntil } from 'rxjs';
import { Column } from '@/core/models/table-options.model';
import { Store } from '@ngrx/store';
import { LicencesActions } from '../../../state/actions/licences.actions';
import { selectAllLicences, selectLicencesLoading, selectSelectedLicence } from '../../../state/selectors/licences.selectors';
import { selectAllLicences, selectLicencesLoading, selectLicencesError } from '../../../state/selectors/licences.selectors';

@Component({
    standalone: true,
    selector: 'app-licences-list',
    templateUrl: './licences-list.html',
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        ToastModule,
        ReactiveFormsModule,
        TooltipModule,
        ToolbarModule,
        DialogModule,
        InputNumberModule,
        Menu
    ],
    providers: [MessageService]
})
export class LicencesListComponent implements OnInit, OnDestroy {
    private store = inject(Store);
    private fb = inject(FormBuilder);
    private actions$ = inject(Actions);
    private destroy$ = new Subject<void>();

    filterFields: string[] = ['licences', 'amountUsd', 'currency'];
    cols!: Column[];

    licences$ = this.store.select(selectAllLicences);
    loading$ = this.store.select(selectLicencesLoading);
    error$ = this.store.select(selectLicencesError);
    selectedLicence: Licence | null = null;
    displayPriceDialog = false;
    priceForm!: FormGroup;
    rowMenuItems: MenuItem[] = [];

    @ViewChild('licencesTable') licencesTable!: Table;
    @ViewChild('rowMenu') rowMenu!: Menu;

    colTooltips: Record<string, string> = {
        licences: 'Tipo de licencia',
        amountUsd: 'Monto en dólares estadounidenses',
        currency: 'Moneda de referencia'
    };

    ngOnInit(): void {
        this.store.dispatch(LicencesActions.loadLicences());
        this.initializeColumns();
        this.initializeRowMenu();
        this.buildPriceForm();

        this.actions$.pipe(
            ofType(LicencesActions.updateLicencePriceSuccess),
            takeUntil(this.destroy$)
        ).subscribe(() => {
            this.displayPriceDialog = false;
        });
    }

    private buildPriceForm(): void {
        this.priceForm = this.fb.group({
            amount: [null, [Validators.required, Validators.min(0)]]
        });
    }

    openPriceDialog(): void {
        if (!this.selectedLicence) return;
        this.priceForm.setValue({ amount: this.selectedLicence.amountUsd });
        this.displayPriceDialog = true;
    }

    submitPrice(): void {
        if (this.priceForm.invalid || !this.selectedLicence) return;
        this.store.dispatch(LicencesActions.updateLicencePrice({
            id: this.selectedLicence.id,
            amount: this.priceForm.value.amount
        }));
    }

    private initializeColumns(): void {
        this.cols = [
            { field: 'licences', header: 'Tipo de Licencia', customExportHeader: 'Tipo de Licencia' },
            { field: 'amountUsd', header: 'Monto USD', customExportHeader: 'Monto USD' },
            { field: 'currency', header: 'Moneda', customExportHeader: 'Moneda' }
        ];
    }

    private initializeRowMenu(): void {
        this.rowMenuItems = [
            {
                label: 'Actualizar precio',
                icon: 'pi pi-dollar',
                command: () => this.openPriceDialog()
            }
        ];
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openRowMenu(event: Event, licence: Licence): void {
        this.selectedLicence = licence;
        this.rowMenu.toggle(event);
    }

    formatPlanName(name: string): string {
        return name.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
