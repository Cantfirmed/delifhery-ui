import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../shared/auth/auth.service';
import { DeliveryCreateModel, DeliveryModel, PackageModel } from '../../shared/models/models';
import { DeliveryService } from '../../shared/services/delivery.service';
import { ErrorMessageService } from '../../shared/services/error-message.service';
import { PackageForm } from '../package-form/package-form';

@Component({
  selector: 'app-deliver',
  imports: [PackageForm],
  templateUrl: './deliver.html',
  styleUrl: './deliver.css',
})
export class Deliver {
  private deliveryService = inject(DeliveryService);
  private errorMessageService = inject(ErrorMessageService);
  private router = inject(Router);
  authService = inject(AuthService);

  delivery = signal<DeliveryModel | null>(null);
  packageData = signal<PackageModel | null>(null);
  loading = signal(false);
  subscribing = signal(false);
  subscribed = signal(false);

  constructor() {
    const nav = this.router.currentNavigation();
    if (nav?.extras?.state?.['packageData']) {
      this.packageData.set(nav.extras.state['packageData']);
    }
  }

  onRegister(packageData: PackageModel) {
    this.loading.set(true);
    const dc: DeliveryCreateModel = {
      package: packageData,
    };
    this.deliveryService
      .registerPackage(dc)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (delivery) => this.delivery.set(delivery),
        error: (err) => {
          if (err.status === 400) {
            this.errorMessageService.showMessage(
              'Invalid package data. Please check the information provided.',
            );
          }
          if (err.status === 500) {
            this.errorMessageService.showServerError();
          }
        },
      });
  }

  resetForm() {
    this.delivery.set(null);
    this.packageData.set(null);
    this.subscribed.set(false);
  }

  subscribe() {
    const d = this.delivery();
    if (!d) return;

    const zipCode = d.package.recipient.zipCode;
    this.subscribing.set(true);
    this.deliveryService
      .subscribeToNotifications(d.trackingId, zipCode)
      .pipe(finalize(() => this.subscribing.set(false)))
      .subscribe({
        next: () => {
          this.subscribed.set(true);
        },
        error: (err) => {
          if (err.status === 401) {
            this.errorMessageService.showMessage('Please log in to subscribe to notifications.');
          } else {
            this.errorMessageService.showMessage('Failed to subscribe to notifications.');
          }
        },
      });
  }
}
