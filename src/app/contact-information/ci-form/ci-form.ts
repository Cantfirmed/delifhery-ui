import { Component, output, signal } from '@angular/core';
import { Field, form, required, validate } from '@angular/forms/signals';
import { ContactInformationModel } from '../../../shared/models/models';

@Component({
  selector: 'app-ci-form',
  imports: [Field],
  templateUrl: './ci-form.html',
  styleUrl: './ci-form.css',
})
export class CiForm {
  submitForm = output<ContactInformationModel>();

  submitted = signal(false);

  CIModel = signal<ContactInformationModel>({
    type: 'Email',
    value: '',
  });

  CIForm = form(this.CIModel, (fieldPath) => {
    required(fieldPath.type, {
      message: 'Type is required',
    });
    required(fieldPath.value, {
      message: 'Value is required',
    });
    validate(fieldPath.value, ({ value, valueOf }) => {
      const val = value();
      const type = valueOf(fieldPath.type);
      console.log('Validating', type, val);
      if (val.trim() === '') {
        return null;
      }
      if (type === 'Email') {
        if (!val.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          return { kind: 'invalidEmail', message: 'Invalid email format' };
        }
      } else if (type === 'PhoneNumber') {
        const normalized = val.replace(/[\s()-]/g, ''); // drop common formatting chars
        if (!normalized.match(/^\+?[1-9]\d{6,14}$/)) {
          return { kind: 'invalidPhone', message: 'Invalid phone number format' };
        }
      }
      return null;
    });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    this.submitted.set(true);
    if (this.CIForm().valid()) {
      const credentials = this.CIModel();
      console.log('Submitting:', credentials);
      this.submitForm.emit(credentials);
    }
  }
}
