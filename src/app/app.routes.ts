import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';

/** Relative route segments used in the router configuration. */
export const AppPath = {
  Home: 'home',
  Garage: 'garage',
  GarageAdd: 'garage/add',
  Plan: 'plan',
  Procedures: 'procedures',
  Settings: 'settings',
} as const;

export type AppPathKey = keyof typeof AppPath;

/** Absolute URLs used by `routerLink` and `Router.navigateByUrl`. */
export const AppRoute = Object.fromEntries(
  Object.entries(AppPath).map(([key, path]) => [key, `/${path}`]),
) as { readonly [K in AppPathKey]: `/${(typeof AppPath)[K]}` };

export interface RouteData {
  isFullscreen: boolean;
}

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppPath.Home,
  },
  {
    path: AppPath.Home,
    component: HomePage,
  },
  {
    path: AppPath.GarageAdd,
    data: { isFullscreen: true } satisfies RouteData,
    loadComponent: () =>
      import('./pages/add-vehicle-page/add-vehicle-page').then((m) => m.AddVehiclePage),
  },
  {
    path: AppPath.Garage,
    loadComponent: () => import('./pages/garage-page/garage-page').then((m) => m.GaragePage),
  },
  {
    path: AppPath.Plan,
    loadComponent: () => import('./pages/plan-page/plan-page').then((m) => m.PlanPage),
  },
  {
    path: AppPath.Procedures,
    loadComponent: () =>
      import('./pages/procedures-page/procedures-page').then((m) => m.ProceduresPage),
  },
  {
    path: AppPath.Settings,
    data: { isFullscreen: true } satisfies RouteData,
    loadComponent: () => import('./pages/settings-page/settings-page').then((m) => m.SettingsPage),
  },
  {
    path: '**',
    redirectTo: AppPath.Home,
  },
];
