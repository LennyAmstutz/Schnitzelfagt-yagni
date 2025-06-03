import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'setup',
    loadComponent: () => import('./setup/setup.page').then( m => m.SetupPage)
  },
  {
    path: 'camera-permission',
    loadComponent: () => import('./camera-permission/camera-permission.page').then( m => m.CameraPermissionPage)
  },
  {
    path: 'geolocation-permission',
    loadComponent: () => import('./geolocation-permission/geolocation-permission.page').then( m => m.GeolocationPermissionPage)
  },
];
