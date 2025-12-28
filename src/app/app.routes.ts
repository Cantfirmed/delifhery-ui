import { Routes } from '@angular/router';
import { authGuard } from '../shared/auth/auth.guard';
import { CalculatePrice } from './calculate-price/calculate-price';
import { ContactInformation } from './contact-information/contact-information';
import { Dashboard } from './dashboard/dashboard';
import { Deliver } from './deliver/deliver';
import { Track } from './track/track';

export const routes: Routes = [
  { path: '', redirectTo: 'calculate-price', pathMatch: 'full' },
  { path: 'track', component: Track },
  { path: 'calculate-price', component: CalculatePrice },
  { path: 'deliver', component: Deliver },
  // Disable tab if not logged in
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'contact-information', component: ContactInformation, canActivate: [authGuard] },
];
