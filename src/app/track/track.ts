import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
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

  delivery = signal<DeliveryModel | null>(null);
  history = signal<DeliveryStateModel[]>([]);

  onTrack(packageData: TrackingModel) {
    this.deliveryService.getDelivery(packageData).subscribe({
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
}
