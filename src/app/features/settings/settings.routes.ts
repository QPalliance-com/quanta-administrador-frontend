import { Routes } from '@angular/router';
import { SettingsComponent } from './settings';
import { LicencesListComponent } from './components/licences/licences-list/licences-list';
import { LicenceFormComponent } from './components/licences/licence-form/licence-form';

export const SETTINGS_ROUTES: Routes = [
    {
        path: '',
        component: SettingsComponent,
        children: [
            {
                path: 'licences',
                children: [
                    {
                        path: 'list',
                        component: LicencesListComponent
                    },
                    {
                        path: ':id',
                        component: LicenceFormComponent
                    }
                ]
            }
        ]
    }
];
