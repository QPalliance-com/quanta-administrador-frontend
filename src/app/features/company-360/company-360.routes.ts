import { Routes } from '@angular/router';
import { CompanyListComponent } from './pages/company-list/company-list';
import { CompanyFormComponent } from './components/company-form/company-form';

export const company360Routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: CompanyListComponent,
                data: { breadcrumb: 'Lista de Compañías' }
            },
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
