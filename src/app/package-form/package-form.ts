import { Component, effect, input, output, signal } from '@angular/core';
import { Field, form, required } from '@angular/forms/signals';
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
    // Add more validations
    required(fieldPath.sender.city, {
      message: 'City is required',
    });
    required(fieldPath.sender.zipCode, {
      message: 'ZIP code is required',
    });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.packageForm().valid()) {
      const credentials = this.packageModel();
      this.submitPackage.emit(credentials);
    }
  }
}
