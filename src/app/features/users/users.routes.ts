import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list';
import { UserFormComponent } from './components/user-form/user-form';

export const usersRoutes: Routes = [
   
    {
        path: 'list',
        component: UserListComponent,
        data: { breadcrumb: 'Usuarios' }
    },
    {
        path: 'new',
        component: UserFormComponent,
        data: { breadcrumb: 'Nuevo Usuario' }
    },
    {
        path: 'edit/:id',
        component: UserFormComponent,
        data: { breadcrumb: 'Editar Usuario' }
    }
];
