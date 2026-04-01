import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout.component';
import { LoginFormComponent } from './components/login-form.component';

export const authRoutes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'login',
                component: LoginFormComponent,
                data: {
                    title: 'Iniciar Sesión - Admin',
                    description: 'Panel de autenticación para super administradores'
                }
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            }
        ]
    }
];
