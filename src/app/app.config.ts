import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';
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
import { menuReducer, MenuEffects } from './shared/state/layout';
import { DepartmentCityEffects } from './core/state/effects/department-city.effects';
import { LoaderInterceptor } from './core/interceptors/loading.interceptor';
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { SettingsEffects, settingsReducer } from './features/users/state';
import { Company360Effects, reducers as company360Reducers } from './features/company-360/state';

export const appConfig: ApplicationConfig = {
    providers: [
        // HTTP Configuration
        provideHttpClient(withInterceptorsFromDi()),
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
            withEnabledBlockingInitialNavigation(),
            withHashLocation()
        ),

        // Core Providers
        MessageService,

        // NgRx Store Configuration
        provideStore(
            {
                // Core Module
                departmentCity: departmentCityReducer,
                menu: menuReducer,
                // Settings Module
                settings: settingsReducer,
                // Company360 (spread para soportar featureKey dinámico)
                ...company360Reducers
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

        // NgRx Effects
        provideEffects([
            // Core Effects
            DepartmentCityEffects,
            MenuEffects,
              ...SettingsEffects,
            ...Company360Effects
          
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
