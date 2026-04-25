import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptorsFromDi, withInterceptors } from '@angular/common/http';
import { provideRouter, withEnabledBlockingInitialNavigation, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';

import { appRoutes } from './app.routes';
import { AppTheme } from './core/theme/theme.config';
import { departmentCityReducer } from './core/state/reducers/department-city.reducer';
import { DepartmentCityEffects } from './core/state/effects/department-city.effects';
import { usersReducer } from './features/users/state/reducers/users.reducer';
import { UsersEffects } from './features/users/state/effects/users.effects';
import { companiesReducer } from './features/companies/state/reducers/companies.reducer';
import { CompaniesEffects } from './features/companies/state/effects/companies.effects';
import { licencesReducer } from './features/settings/state/reducers/licences.reducer';
import { LicencesEffects } from './features/settings/state/effects/licences.effects';
import { authReducer } from './features/auth/state/reducers/auth.reducer';
import { AuthEffects } from './features/auth/state/effects/auth.effects';
import { LoaderInterceptor } from './core/interceptors/loading.interceptor';
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        // HTTP Configuration
        provideHttpClient(
            withInterceptorsFromDi(),
            withInterceptors([authInterceptor])
        ),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },

        // Animation Provider
        provideAnimationsAsync(),

        // Router Configuration
        provideRouter(
            appRoutes,
            withInMemoryScrolling({
                anchorScrolling: 'enabled',
                scrollPositionRestoration: 'enabled'
            }),
            withEnabledBlockingInitialNavigation()
        ),

        // Core Providers
        MessageService,

        // NgRx Store Configuration (only for departmentCity lookup data)
        provideStore(
            {
                auth: authReducer,
                departmentCity: departmentCityReducer,
                users: usersReducer,
                companies: companiesReducer,
                licences: licencesReducer
            },
            {
                runtimeChecks: {
                    strictStateImmutability: true,
                    strictActionImmutability: true,
                    strictActionTypeUniqueness: true,
                    strictStateSerializability: true,
                    strictActionSerializability: true
                }
            }
        ),

        // NgRx Effects (only for departmentCity)
        provideEffects([
            AuthEffects,
            DepartmentCityEffects,
            UsersEffects,
            CompaniesEffects,
            LicencesEffects
        ]),

        // NgRx DevTools
        provideStoreDevtools({
            maxAge: 25,
            logOnly: !isDevMode(),
            traceLimit: 25,
            autoPause: true,
            trace: true,
            connectInZone: true
        }),

        // Animations and UI Configuration
        providePrimeNG({
            ripple: true,
            inputStyle: 'filled',
            theme: { preset: AppTheme, options: { darkModeSelector: '.app-dark' } }
        })
    ]
};
