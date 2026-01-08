import { Component, inject, signal } from '@angular/core';
import { DeliveryModel, TrackingModel } from '../../shared/models/models';
import { DeliveryService } from '../../shared/services/delivery.service';
import { ErrorMessageService } from '../../shared/services/error-message.service';
import { TrackForm } from './track-form/track-form';

@Component({
  selector: 'app-track',
  imports: [TrackForm],
  templateUrl: './track.html',
  styleUrl: './track.css',
})
export class Track {
  private deliveryService = inject(DeliveryService);
  private errorMessageService = inject(ErrorMessageService);

  delivery = signal<DeliveryModel | null>(null);

  onTrack(packageData: TrackingModel) {
    this.deliveryService.getDelivery(packageData).subscribe({
      next: (price) => this.delivery.set(price),
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
}
