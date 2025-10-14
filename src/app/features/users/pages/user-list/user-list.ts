import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ExportToolbarComponent } from '@/shared/components/export-toolbar/export-toolbar';
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
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Column, ExportColumn } from '../../../../core/models/table-options.model';
import { User } from '@/core/models';
import * as fromUser from '../../state/selectors/user.selectors';
import * as userActions from '../../state/actions/user.actions';
import { Observable } from 'rxjs';
import { TooltipModule } from 'primeng/tooltip';
import { ProfileInfoComponent } from '../../components/profile-info/profile-info';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
@Component({
    selector: 'app-user-list',
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
        ExportToolbarComponent,
        ProfileInfoComponent
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './user-list.html'
})
export class UserListComponent implements OnInit {
    filterFields: string[] = ['id', 'names', 'lastNames', 'email', 'status', 'roleId'];
    exportColumns!: ExportColumn[];
    cols!: Column[];
    users$!: Observable<User[]>;
    usersLoading$!: Observable<boolean>;
    selectedUsers!: User[] | null;
    selectedUser!: User;
    displayViewDialog = false;
    @ViewChild('usersTable') usersTable!: Table;

    constructor(
        private store: Store,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {
        this.users$ = this.store.select(fromUser.selectAllUsers);
        this.usersLoading$ = this.store.select(fromUser.selectUsersLoading);
    }

    ngOnInit(): void {
        this.store.dispatch(userActions.initUsers());
        this.cols = [
            { field: 'id', header: 'ID', customExportHeader: 'User ID' },
            { field: 'names', header: 'Nombres', customExportHeader: 'User Names' },
            { field: 'lastNames', header: 'Apellidos', customExportHeader: 'User Last Names' },
            { field: 'email', header: 'Correo', customExportHeader: 'Email' },
            { field: 'status', header: 'Estado', customExportHeader: 'Status' },
            { field: 'roleId', header: 'Rol', customExportHeader: 'Role' }
        ];
    }

    openNew() {
        this.router.navigate(['/users/new']);
    }

    editUser(user: User) {
        this.router.navigate(['/users/edit', user.id]);
    }

    viewUser(user: User) {
        this.selectedUser = user;
        this.displayViewDialog = true;
    }

    deleteUser(user: User) {
        this.confirmationService.confirm({
            message: `¿Seguro que deseas eliminar al usuario ${user.names}?`,
            accept: () => {
                this.store.dispatch(userActions.deleteUser({ id: user.id }));
            }
        });
    }

    exportTable(format: 'excel' | 'csv') {
        if (!this.usersTable) return;
        if (format === 'excel') {
            (this.usersTable as any).exportExcel?.();
        } else {
            this.usersTable.exportCSV();
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
