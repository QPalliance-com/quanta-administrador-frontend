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
                loadChildren: () => import('./features/company-360/company-360.routes').then((m) => m.company360Routes) 
            },
            { 
                path: 'company-360', 
                data: { breadcrumb: 'Compañía 360' }, 
                loadChildren: () => import('./features/company-360/company-360.routes').then((m) => m.company360Routes) 
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
