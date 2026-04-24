import { Routes } from '@angular/router';
import { 
    MainLayoutComponent, 
    NotFoundComponent, 
    ServerDownComponent 
} from './shared/components';
import { authGuard } from './core/guards';

export const appRoutes: Routes = [
    // Auth routes (no guard)
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes)
    },
    // Protected routes (with AuthGuard)
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            { 
                path: '', 
                redirectTo: 'dashboard', 
                pathMatch: 'full' 
            },
            {
                path: 'dashboard',
                data: { breadcrumb: 'Dashboard' },
                loadChildren: () => import('./features/dashboard/dashboard.routes').then((m) => m.dashboardRoutes)
            },
            { 
                path: 'companies', 
                data: { breadcrumb: 'Compañías' }, 
                loadChildren: () => import('./features/companies/companies.routes').then((m) => m.companiesRoutes) 
            },
            { 
                path: 'users', 
                data: { breadcrumb: 'Usuarios' }, 
                loadChildren: () => import('./features/users/users.routes').then((m) => m.usersRoutes) 
            },
            { 
                path: 'settings', 
                data: { breadcrumb: 'Configuración' }, 
                loadChildren: () => import('./features/settings/settings.routes').then((m) => m.SETTINGS_ROUTES) 
            }
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
