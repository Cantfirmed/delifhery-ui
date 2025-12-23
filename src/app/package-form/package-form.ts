import { Component, signal } from '@angular/core';
import { Field, form, required } from '@angular/forms/signals';

@Component({
  selector: 'app-package-form',
  imports: [Field],
  templateUrl: './package-form.html',
  styleUrl: './package-form.css',
})
export class PackageForm {
  packageModel = signal({
    fromZip: 0,
    fromCountry: '',
    fromCity: '',
    fromStreet: '',
    toZip: 0,
    toCountry: '',
    toCity: '',
    toStreet: '',
    weight: 0.0,
    width: 0.0,
    height: 0.0,
    length: 0.0,
  });

  packageForm = form(this.packageModel, (fieldPath) => {
    required(fieldPath.fromCity);
    required(fieldPath.fromZip);
  });

  onSubmit() {
    if (this.packageForm().valid()) {
      const credentials = this.packageModel();
      console.log('Submitting:', credentials);
    }
  }
}
