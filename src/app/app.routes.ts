import { Routes } from '@angular/router';
import { TaskBoxComponent } from './components/task-box/task-box.component';

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
    path: 'geolocation',
    loadComponent: () =>
      import('./geolocation/geolocation.page').then((m) => m.GeolocationPage),
  },
  {
    path: 'distance',
    loadComponent: () =>
      import('./distance/distance.page').then((m) => m.DistancePage),
  },
  {
    path: 'qr',
    loadComponent: () => import('./qr/qr.page').then((m) => m.QrPage),
  },
  {
    path: 'sensor',
    loadComponent: () =>
      import('./sensor/sensor.page').then((m) => m.SensorPage),
  },
  {
    path: 'charger',
    loadComponent: () =>
      import('./charger/charger.page').then((m) => m.ChargerPage),
  },
  {
    path: 'wifi',
    loadComponent: () => import('./wifi/wifi.page').then((m) => m.WifiPage),
  },
  {
    path: 'finish',
    loadComponent: () => import('./finish/finish.page').then( m => m.FinishPage)
  },
];
