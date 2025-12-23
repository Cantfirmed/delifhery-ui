import { Component, signal } from '@angular/core';
import { email, Field, form, required } from '@angular/forms/signals';

@Component({
  selector: 'app-ci-form',
  imports: [Field],
  templateUrl: './ci-form.html',
  styleUrl: './ci-form.css',
})
export class CiForm {
  CIModel = signal({
    type: '',
    value: '',
  });

  CIForm = form(this.CIModel, (fieldPath) => {
    required(fieldPath.type, {
      message: 'Type is required',
    });
    email(fieldPath.value);
  });

  onSubmit() {
    if (this.CIForm().valid()) {
      const credentials = this.CIForm();
      console.log('Submitting:', credentials);
    }
  }
}
