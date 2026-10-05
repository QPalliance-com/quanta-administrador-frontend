import { Routes } from '@angular/router';
import { CompanyListComponent } from './pages/company-list/company-list';
import { CompanyFormComponent } from './components/company-form/company-form';
import { LicenceLotsListComponent } from '../licence-lots/pages/licence-lots-list/licence-lots-list';

export const companiesRoutes: Routes = [
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
            },
            {
                path: ':companyId/licences',
                component: LicenceLotsListComponent,
                data: { breadcrumb: 'Licencias' }
            }
        ]
    }
];
