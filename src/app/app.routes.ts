import { Routes } from '@angular/router';
import { authGuard } from '../shared/auth/auth.guard';
import { CalculatePrice } from './calculate-price/calculate-price';
import { ContactInformation } from './contact-information/contact-information';
import { Deliver } from './deliver/deliver';
import { Track } from './track/track';

export const routes: Routes = [
  { path: '', redirectTo: 'track', pathMatch: 'full' },
  { path: 'track', component: Track },
  { path: 'calculate-price', component: CalculatePrice },
  // Disable tab if not logged in?
  { path: 'deliver', component: Deliver, canActivate: [authGuard] },
  { path: 'contact-information', component: ContactInformation, canActivate: [authGuard] },
];
