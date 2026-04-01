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
import { User } from '@/core/models';
import { TooltipModule } from 'primeng/tooltip';
import { InputIconModule } from 'primeng/inputicon';
import { Router } from '@angular/router';
import { UserService } from '@/core/services/user.service';
import { Drawer } from 'primeng/drawer';
import { Menu } from 'primeng/menu';
import { ExportToolbarComponent } from '@/shared/components/export-toolbar/export-toolbar';
import { BehaviorSubject, Observable } from 'rxjs';

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
export class UserListComponent implements OnInit {
    private userService = inject(UserService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private router = inject(Router);

    filterFields: string[] = ['names', 'lastNames', 'email', 'phone', 'position', 'status'];
    cols!: Column[];
    exportColumns!: ExportColumn[];

    displayViewDrawer = false;
    selectedUser: User | null = null;
    rowMenuItems: MenuItem[] = [];
    error$: Observable<string | null> = new BehaviorSubject(null);

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

    users$!: Observable<User[]>;

    ngOnInit(): void {
        this.userService.getUsers().subscribe({
            next: (response) => {
                this.users$ = new BehaviorSubject(response.data).asObservable();
            },
            error: () => {
                this.users$ = new BehaviorSubject<User[]>([]).asObservable();
            }
        });
        this.initializeColumns();
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
            this.userService.getUser(userId).subscribe({
                next: (response) => {
                    this.selectedUser = response.data || null;
                    this.displayViewDrawer = true;
                }
            });
        }
    }

    navigateToEdit(userId: number): void {
        if (userId) {
            this.router.navigate(['/settings/users/edit', userId]);
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
        this.userService.updateUserStatus(user.id, newStatus).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: `Usuario ${newStatus === 'active' ? 'activado' : 'inactivado'}`
                });
                this.displayViewDrawer = false;
                this.ngOnInit();
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudo cambiar el estado del usuario'
                });
            }
        });
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
                this.userService.deleteUser(user.id).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Éxito',
                            detail: 'Usuario eliminado correctamente'
                        });
                        this.displayViewDrawer = false;
                        this.ngOnInit();
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'No se pudo eliminar el usuario'
                        });
                    }
                });
            }
        });
    }

    exportTable(format: 'excel' | 'csv'): void {
        this.messageService.add({ severity: 'success', summary: 'Exportación', detail: `Exportado como ${format.toUpperCase()}` });
    }
}
