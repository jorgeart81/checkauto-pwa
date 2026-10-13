import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/tabs/tab-inicio.component').then((m) => m.TabInicioComponent),
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
    path: '**',
    redirectTo: 'home',
  },
];
