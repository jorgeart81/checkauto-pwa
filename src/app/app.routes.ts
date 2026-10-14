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
    path: 'plan',
    loadComponent: () =>
      import('./components/tabs/tab-plan.component').then((m) => m.TabPlanComponent),
  },
  {
    path: 'procedures',
    loadComponent: () =>
      import('./components/tabs/tab-tramites.component').then((m) => m.TabTramitesComponent),
  },
  {
    path: 'garage',
    loadComponent: () =>
      import('./components/tabs/tab-garaje.component').then((m) => m.TabGarajeComponent),
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
