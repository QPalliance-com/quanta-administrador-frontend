import { Routes } from '@angular/router';
import { SettingsComponent } from './settings';
import { LicencesListComponent } from './components/licences/licences-list/licences-list';
import { HolidaysListComponent } from './pages/holidays-list/holidays-list';
import { LicenseConfigComponent } from './pages/license-config/license-config';

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
                        path: 'config',
                        component: LicenseConfigComponent
                    }
                ]
            },
            {
                path: 'holidays',
                children: [
                    {
                        path: 'list',
                        component: HolidaysListComponent
                    }
                ]
            }
        ]
    }
];
