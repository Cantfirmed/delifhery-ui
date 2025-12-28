import { Component, inject, signal } from '@angular/core';
import { TrackForm } from './track-form/track-form';
import { DeliveryModel, TrackingModel } from '../../shared/models/models';
import { DeliveryService } from '../../shared/services/delivery.service';

@Component({
  selector: 'app-track',
  imports: [TrackForm],
  templateUrl: './track.html',
  styleUrl: './track.css',
})
export class Track {
  private deliveryService = inject(DeliveryService);
  delivery = signal<DeliveryModel | null>(null);

  onTrack(packageData: TrackingModel) {
    this.deliveryService.getDelivery(packageData).subscribe({
      next: (price) => this.delivery.set(price),
      error: (err) => console.error('Error tracking delivery:', err),
    });
  }
}
