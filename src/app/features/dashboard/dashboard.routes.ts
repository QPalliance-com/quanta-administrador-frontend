import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/main-dashboard/main-dashboard').then(
        m => m.MainDashboardComponent
      )
  }
];
