import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'garage/add',
    loadComponent: () =>
      import('./pages/add-vehicle-page/add-vehicle-page').then((m) => m.AddVehiclePage),
  },
  {
    path: 'garage',
    loadComponent: () => import('./pages/garage-page/garage-page').then((m) => m.GaragePage),
  },
  {
    path: 'plan',
    loadComponent: () => import('./pages/plan-page/plan-page').then((m) => m.PlanPage),
  },
  {
    path: 'procedures',
    loadComponent: () =>
      import('./pages/procedures-page/procedures-page').then((m) => m.ProceduresPage),
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings-page/settings-page').then((m) => m.SettingsPage),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
