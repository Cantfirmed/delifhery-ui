import { Component, effect, input, output, signal } from '@angular/core';
import { Field, form, required, min } from '@angular/forms/signals';
import { PackageModel } from '../../shared/models/models';

@Component({
  selector: 'app-package-form',
  imports: [Field],
  templateUrl: './package-form.html',
  styleUrl: './package-form.css',
})
export class PackageForm {
  initialData = input<PackageModel | null>(null);
  submitPackage = output<PackageModel>();

  packageModel = signal<PackageModel>({
    sender: {
      name: '',
      zipCode: 0,
      country: '',
      city: '',
      street: '',
      state: '',
    },
    recipient: {
      name: '',
      zipCode: 0,
      country: '',
      city: '',
      street: '',
      state: '',
    },
    weight: 0.0,
    width: 0.0,
    height: 0.0,
    length: 0.0,
  });

  constructor() {
    effect(() => {
      const data = this.initialData();
      if (data) {
        this.packageModel.set(data);
      }
    });
  }

  packageForm = form(this.packageModel, (fieldPath) => {
    // Sender validations
    required(fieldPath.sender.name, { message: 'Name is required' });
    required(fieldPath.sender.street, { message: 'Street is required' });
    required(fieldPath.sender.city, { message: 'City is required' });
    required(fieldPath.sender.zipCode, { message: 'ZIP code is required' });
    required(fieldPath.sender.country, { message: 'Country is required' });

    // Recipient validations
    required(fieldPath.recipient.name, { message: 'Name is required' });
    required(fieldPath.recipient.street, { message: 'Street is required' });
    required(fieldPath.recipient.city, { message: 'City is required' });
    required(fieldPath.recipient.zipCode, { message: 'ZIP code is required' });
    required(fieldPath.recipient.country, { message: 'Country is required' });

    // Package details validations
    min(fieldPath.weight, 0.01, { message: 'Weight must be greater than 0' });
    min(fieldPath.width, 0.01, { message: 'Width must be greater than 0' });
    min(fieldPath.height, 0.01, { message: 'Height must be greater than 0' });
    min(fieldPath.length, 0.01, { message: 'Length must be greater than 0' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.packageForm().valid()) {
      const credentials = this.packageModel();
      this.submitPackage.emit(credentials);
    }
  }
}
