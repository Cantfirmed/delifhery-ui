import { Component } from '@angular/core';
import { CiForm } from './ci-form/ci-form';

@Component({
  selector: 'app-contact-information',
  imports: [CiForm],
  templateUrl: './contact-information.html',
  styleUrl: './contact-information.css',
})
export class ContactInformation {}
