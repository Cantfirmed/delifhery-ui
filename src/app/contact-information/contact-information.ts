import { Component, inject, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ContactInformationModel } from '../../shared/models/models';
import { ContactService } from '../../shared/services/contact.service';
import { ErrorMessageService } from '../../shared/services/error-message.service';
import { CiForm } from './ci-form/ci-form';

@Component({
  selector: 'app-contact-information',
  imports: [CiForm],
  templateUrl: './contact-information.html',
  styleUrl: './contact-information.css',
})
export class ContactInformation implements OnInit {
  private contactService = inject(ContactService);
  private errorMessageService = inject(ErrorMessageService);
  contactInformation = signal<ContactInformationModel | null>(null);
  allContactInformation = signal<ContactInformationModel[] | null>(null);

  loading = signal(false);

  ngOnInit() {
    this.listAll();
  }

  listAll() {
    this.contactService.getContactInformation().subscribe({
      next: (info) => this.allContactInformation.set(info),
      error: () => this.errorMessageService.showMessage('Error fetching contact information.'),
    });
  }

  createNew(contactInfo: ContactInformationModel) {
    this.loading.set(true);
    this.contactService
      .addNewContactInformation(contactInfo)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (info) => {
          this.allContactInformation.update((current) => [...(current || []), info]);
          this.contactInformation.set(info);
        },
        // show error message if 500

        error: (err) => {
          if (err.status === 500) {
            this.errorMessageService.showMessage(
              'Server error occurred while adding contact information.',
            );
          } else if (err.status === 400) {
            this.errorMessageService.showMessage('Invalid contact information provided.');
          } else {
            this.errorMessageService.showMessage(
              'An error occurred while adding contact information.',
            );
          }
        },
      });
  }
}
