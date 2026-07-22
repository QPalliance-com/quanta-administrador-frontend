import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { Menu } from 'primeng/menu';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map, Subject, takeUntil } from 'rxjs';
import { HolidayCalendar } from '@/core/models';
import { DateColombiaPipe } from '@/core/pipes/date-colombia.pipe';
import { HolidaysActions } from '../../state/actions/holidays.actions';
import {
    selectAllHolidays,
    selectHolidaysLoading,
    selectHolidaysError,
    selectSelectedYear,
    selectTotalActiveInYear,
    selectAlertLowCount
} from '../../state/selectors/holidays.selectors';
import { HolidayDrawerComponent } from '../../components/holiday-drawer/holiday-drawer';
import { HolidayImportDialogComponent } from '../../components/holiday-import-dialog/holiday-import-dialog';

type StatusFilter = 'all' | 'active' | 'inactive';

@Component({
    standalone: true,
    selector: 'app-holidays-list',
    templateUrl: './holidays-list.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        ConfirmDialogModule,
        SelectButtonModule,
        MessageModule,
        TagModule,
        InputTextModule,
        TooltipModule,
        Menu,
        DateColombiaPipe,
        HolidayDrawerComponent,
        HolidayImportDialogComponent
    ],
    providers: [MessageService, ConfirmationService]
})
export class HolidaysListComponent implements OnInit, OnDestroy {
    private store = inject(Store);
    private confirmationService = inject(ConfirmationService);
    private destroy$ = new Subject<void>();
    private dateColombiaPipe = new DateColombiaPipe();
    private statusFilter$ = new BehaviorSubject<StatusFilter>('all');

    filterFields: string[] = ['name'];
    rowMenuItems: MenuItem[] = [];

    filterOptions: { label: string; value: StatusFilter }[] = [
        { label: 'Todos', value: 'all' },
        { label: 'Activos', value: 'active' },
        { label: 'Inactivos', value: 'inactive' }
    ];
    statusFilter: StatusFilter = 'all';

    holidays$ = combineLatest([this.store.select(selectAllHolidays), this.statusFilter$]).pipe(
        map(([holidays, filter]) => {
            if (filter === 'active') return holidays.filter((h) => h.isActive);
            if (filter === 'inactive') return holidays.filter((h) => !h.isActive);
            return holidays;
        })
    );
    loading$ = this.store.select(selectHolidaysLoading);
    error$ = this.store.select(selectHolidaysError);
    totalActiveInYear$ = this.store.select(selectTotalActiveInYear);
    alertLowCount$ = this.store.select(selectAlertLowCount);

    currentYear = new Date().getFullYear();
    displayDrawer = false;
    drawerMode: 'create' | 'edit' = 'create';
    selectedHoliday: HolidayCalendar | null = null;
    displayImportDialog = false;

    @ViewChild('holidaysTable') holidaysTable!: Table;
    @ViewChild('rowMenu') rowMenu!: Menu;

    ngOnInit(): void {
        this.store
            .select(selectSelectedYear)
            .pipe(takeUntil(this.destroy$))
            .subscribe((year) => {
                this.currentYear = year;
            });

        this.loadYear(this.currentYear);
    }

    loadYear(year: number): void {
        this.store.dispatch(HolidaysActions.loadList({ year }));
    }

    retry(): void {
        this.loadYear(this.currentYear);
    }

    previousYear(): void {
        this.loadYear(this.currentYear - 1);
    }

    nextYear(): void {
        this.loadYear(this.currentYear + 1);
    }

    onFilterChange(value: StatusFilter): void {
        this.statusFilter = value;
        this.statusFilter$.next(value);
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openCreateDrawer(): void {
        this.drawerMode = 'create';
        this.selectedHoliday = null;
        this.displayDrawer = true;
    }

    openEditDrawer(holiday: HolidayCalendar): void {
        this.drawerMode = 'edit';
        this.selectedHoliday = holiday;
        this.displayDrawer = true;
    }

    openImportDialog(): void {
        this.displayImportDialog = true;
    }

    openRowMenu(event: MouseEvent, holiday: HolidayCalendar): void {
        event.stopPropagation();
        this.rowMenuItems = [
            {
                label: 'Editar',
                icon: 'pi pi-pencil',
                command: () => this.openEditDrawer(holiday)
            },
            {
                label: 'Eliminar',
                icon: 'pi pi-trash',
                styleClass: 'danger-menu-item',
                command: () => this.confirmDelete(holiday)
            }
        ];
        this.rowMenu.toggle(event);
    }

    confirmDelete(holiday: HolidayCalendar): void {
        this.confirmationService.confirm({
            message: `¿Eliminar el festivo <b>${holiday.name}</b> del <b>${this.dateColombiaPipe.transform(holiday.holidayDate)}</b>?`,
            header: 'Confirmar eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, eliminar',
            rejectLabel: 'No, cancelar',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.store.dispatch(HolidaysActions.delete({ id: holiday.id }));
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
