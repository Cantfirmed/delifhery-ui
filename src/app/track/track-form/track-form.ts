import { Component, signal } from '@angular/core';
import { form, Field, required } from '@angular/forms/signals';

@Component({
  selector: 'app-track-form',
  imports: [Field],
  templateUrl: './track-form.html',
  styleUrl: './track-form.css',
})
export class TrackForm {
  trackingModel = signal({
    zipCode: 0,
    trackingNumber: 0,
  });

  trackingForm = form(this.trackingModel, (fieldPath) => {
    required(fieldPath.trackingNumber, { message: 'Tracking number is required' });
    required(fieldPath.zipCode, { message: 'Zip code is required' });
  });

  onSubmit() {
    if (this.trackingForm().valid()) {
      const credentials = this.trackingModel();
      console.log('Submitting:', credentials);
    }
  }
}
