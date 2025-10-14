import { Routes } from '@angular/router';
import { 
    MainLayoutComponent, 
    NotFoundComponent, 
    ServerDownComponent 
} from './shared/components';

export const appRoutes: Routes = [
    //   { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    {
        path: '',
        component: MainLayoutComponent,
        // canActivate: [AuthGuard],
        children: [
            { path: 'users', data: { breadcrumb: 'Usuarios' }, loadChildren: () => import('./features/users/users.routes').then((m) => m.usersRoutes) },
            { path: 'company-360', data: { breadcrumb: 'Compañía 360' }, loadChildren: () => import('./features/company-360/company-360.routes').then((m) => m.company360Routes) },

            // Módulos futuros...
        ]
    },
    {
        path: 'not-found',
        component: NotFoundComponent
    },
    {
        path: 'server-error',
        component: ServerDownComponent
    },

    // Ruta catch-all al final
    {
        path: '**',
        redirectTo: 'not-found'
    }
];
