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

  CIModel = signal<ContactInformationModel>({
    type: 'Email',
    value: '',
  });

  CIForm = form(this.CIModel, (fieldPath) => {
    required(fieldPath.type, {
      message: 'Type is required',
    });
    validate(fieldPath.value, ({ value, valueOf }) => {
      const test = value();
      const type = valueOf(fieldPath.type);
      if (type === 'Email') {
        if (!test.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          return { kind: 'invalidEmail', message: 'Invalid email format' };
        }
      } else if (type === 'PhoneNumber') {
        if (!test.match(/^\+?[1-9]\d{1,14}$/)) {
          return { kind: 'invalidPhone', message: 'Invalid phone number format' };
        }
      }
      return null;
    });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.CIForm().valid()) {
      const credentials = this.CIModel();
      console.log('Submitting:', credentials);
      this.submitForm.emit(credentials);
    }
  }
}
