import { Routes } from '@angular/router';
import { CompanyListComponent } from './pages/company-list/company-list';
import { CompanyFormComponent } from './components/company-form/company-form';

export const companiesRoutes: Routes = [
    {
        path: '',
         component: CompanyListComponent,
                data: { breadcrumb: 'Lista de Compañías' },
        children: [
             {
                path: 'new',
                component: CompanyFormComponent,
                data: { breadcrumb: 'Nueva Compañía' }
            },
            {
                path: 'edit/:id',
                component: CompanyFormComponent,
                data: { breadcrumb: 'Editar Compañía' }
            }
        ]
    }
];
