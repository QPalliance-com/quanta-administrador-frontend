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
import { User } from '@/core/models';
import { TooltipModule } from 'primeng/tooltip';
import { InputIconModule } from 'primeng/inputicon';
import { Router } from '@angular/router';
import { Drawer } from 'primeng/drawer';
import { Menu } from 'primeng/menu';
import { ExportToolbarComponent } from '@/shared/components/export-toolbar/export-toolbar';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { UsersActions } from '../../state/actions/users.actions';
import { selectAllUsers, selectUsersLoading, selectSelectedUser } from '../../state/selectors/users.selectors';

@Component({
    selector: 'app-user-list',
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
    templateUrl: './user-list.html'
})
export class UserListComponent implements OnInit, OnDestroy {
    private store = inject(Store);
    private confirmationService = inject(ConfirmationService);
    private router = inject(Router);
    private destroy$ = new Subject<void>();

    filterFields: string[] = ['names', 'lastNames', 'email', 'phone', 'position', 'status'];
    cols!: Column[];
    exportColumns!: ExportColumn[];

    users$ = this.store.select(selectAllUsers);
    loading$ = this.store.select(selectUsersLoading);
    selectedUser: User | null = null;
    displayViewDrawer = false;
    rowMenuItems: MenuItem[] = [];
    error$ = this.store.select((state) => state.users.error);

    @ViewChild('usersTable') usersTable!: Table;
    @ViewChild('rowMenu') rowMenu!: Menu;

    colTooltips: Record<string, string> = {
        names: 'Nombres del usuario',
        lastNames: 'Apellidos del usuario',
        email: 'Correo electrónico',
        phone: 'Teléfono de contacto',
        position: 'Posición del usuario',
        status: 'Estado del usuario'
    };

    ngOnInit(): void {
        this.store.dispatch(UsersActions.loadUsers());
        this.initializeColumns();

        this.store.select(selectSelectedUser)
            .pipe(takeUntil(this.destroy$))
            .subscribe((user) => {
                if (user) {
                    this.selectedUser = user;
                    this.displayViewDrawer = true;
                }
            });
    }

    private initializeColumns(): void {
        this.cols = [
            { field: 'names', header: 'Nombres', customExportHeader: 'Nombres' },
            { field: 'lastNames', header: 'Apellidos', customExportHeader: 'Apellidos' },
            { field: 'email', header: 'Correo', customExportHeader: 'Correo electrónico' },
            { field: 'phone', header: 'Teléfono', customExportHeader: 'Teléfono' },
            { field: 'position', header: 'Posición', customExportHeader: 'Posición' },
            { field: 'status', header: 'Estado', customExportHeader: 'Estado' }
        ];
        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew(): void {
        this.router.navigate(['/users/new']);
    }

    navigateToView(userId: number): void {
        if (userId) {
            this.store.dispatch(UsersActions.loadUser({ id: userId }));
        }
    }

    navigateToEdit(userId: number): void {
        if (userId) {
            this.router.navigate(['/users/edit', userId]);
        }
    }

    openRowMenu(event: MouseEvent, user: User): void {
        event.stopPropagation();
        this.rowMenuItems = [
            {
                label: 'Ver detalle',
                icon: 'pi pi-eye',
                command: () => {
                    this.selectedUser = user;
                    this.displayViewDrawer = true;
                }
            },
            {
                label: 'Editar',
                icon: 'pi pi-pencil',
                command: () => this.navigateToEdit(user.id!)
            },
            { separator: true },
            {
                label: 'Cambiar estado',
                icon: 'pi pi-toggle-off',
                command: () => this.toggleUserStatus(user)
            },
            {
                label: 'Eliminar',
                icon: 'pi pi-trash',
                styleClass: 'danger-menu-item',
                command: () => this.deleteUser(user)
            }
        ];
        this.rowMenu.toggle(event);
    }

    toggleUserStatus(user: User): void {
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        this.store.dispatch(UsersActions.updateUserStatus({ id: user.id, status: newStatus }));
        this.displayViewDrawer = false;
    }

    deleteUser(user: User): void {
        this.confirmationService.confirm({
            message: `¿Está seguro que desea eliminar al usuario <b>${user.names} ${user.lastNames}</b>?`,
            header: 'Confirmar eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, eliminar',
            rejectLabel: 'No, cancelar',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.store.dispatch(UsersActions.deleteUser({ id: user.id }));
                this.displayViewDrawer = false;
            }
        });
    }

    exportTable(_format: 'excel' | 'csv'): void {}

    ngOnDestroy(): void {
        this.store.dispatch(UsersActions.clearSelectedUser());
        this.destroy$.next();
        this.destroy$.complete();
    }
}
