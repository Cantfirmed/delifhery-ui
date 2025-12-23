import { Routes } from '@angular/router';
import { Track } from './track/track';
import { CalculatePrice } from './calculate-price/calculate-price';
import { Deliver } from './deliver/deliver';
import { Dashboard } from './dashboard/dashboard';
import { ContactInformation } from './contact-information/contact-information';

export const routes: Routes = [
  { path: '', redirectTo: 'calculate-price', pathMatch: 'full' },
  { path: 'track', component: Track },
  {
    path: 'calculate-price',
    component: CalculatePrice,
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
  { path: 'deliver', component: Deliver },
  { path: 'contact-information', component: ContactInformation },
];
