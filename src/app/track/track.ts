import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { AuthService } from '../../shared/auth/auth.service';
import { DeliveryModel, DeliveryStateModel, TrackingModel } from '../../shared/models/models';
import { DeliveryService } from '../../shared/services/delivery.service';
import { ErrorMessageService } from '../../shared/services/error-message.service';
import { TrackForm } from './track-form/track-form';

@Component({
  selector: 'app-track',
  imports: [TrackForm, DatePipe],
  templateUrl: './track.html',
  styleUrl: './track.css',
})
export class Track {
  private deliveryService = inject(DeliveryService);
  private errorMessageService = inject(ErrorMessageService);
  authService = inject(AuthService);

  delivery = signal<DeliveryModel | null>(null);
  history = signal<DeliveryStateModel[]>([]);
  loading = signal(false);
  subscribing = signal(false);
  subscribed = signal(false);
  private currentZipCode: number | null = null;

  onTrack(packageData: TrackingModel) {
    this.loading.set(true);
    this.delivery.set(null);
    this.subscribed.set(false);
    this.currentZipCode = packageData.zipCode;
    this.deliveryService
      .getDelivery(packageData)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (delivery) => {
          this.delivery.set(delivery);
          this.fetchHistory(packageData);
        },
        error: (err) => {
          if (err.status === 404) {
            this.errorMessageService.showMessage(
              'Delivery not found. Please check your tracking number and zip code.',
            );
          }
          if (err.status === 500) {
            this.errorMessageService.showServerError();
          }
        },
      });
  }

  private fetchHistory(packageData: TrackingModel) {
    this.deliveryService.getDeliveryHistory(packageData).subscribe({
      next: (history) => this.history.set(history),
      error: () => this.history.set([]),
    });
  }

  subscribe() {
    const d = this.delivery();
    if (!d || this.currentZipCode === null) return;

    this.subscribing.set(true);
    this.deliveryService
      .subscribeToNotifications(d.trackingId, this.currentZipCode)
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
