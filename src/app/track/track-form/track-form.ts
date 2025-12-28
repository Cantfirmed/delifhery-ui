import { Component, output, signal } from '@angular/core';
import { Field, form, required } from '@angular/forms/signals';
import { TrackingModel } from '../../../shared/models/models';

@Component({
  selector: 'app-track-form',
  imports: [Field],
  templateUrl: './track-form.html',
  styleUrl: './track-form.css',
})
export class TrackForm {
  submitTracking = output<TrackingModel>();

  trackingModel = signal<TrackingModel>({
    zipCode: 0,
    trackingId: 0,
  });

  trackingForm = form(this.trackingModel, (fieldPath) => {
    required(fieldPath.trackingId, { message: 'Tracking number is required' });
    required(fieldPath.zipCode, { message: 'Zip code is required' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.trackingForm().valid()) {
      const credentials = this.trackingModel();
      this.submitTracking.emit(credentials);
    }
  }
}
