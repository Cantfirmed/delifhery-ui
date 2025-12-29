import { Component, output, signal } from '@angular/core';
import { Field, form, required } from '@angular/forms/signals';
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
    // This should only validate email if type is email
    // email(fieldPath.value, {
    //   message: 'Please enter a valid email address',
    // });
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
