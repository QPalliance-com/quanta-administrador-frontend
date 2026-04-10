import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/option-c-aurora/option-c').then(
        m => m.DashboardOptionCComponent
      )
  }
];
