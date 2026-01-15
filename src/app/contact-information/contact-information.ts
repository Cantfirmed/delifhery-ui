import { Component, inject, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ContactInformationModel } from '../../shared/models/models';
import { ContactService } from '../../shared/services/contact.service';
import { CiForm } from './ci-form/ci-form';

@Component({
  selector: 'app-contact-information',
  imports: [CiForm],
  templateUrl: './contact-information.html',
  styleUrl: './contact-information.css',
})
export class ContactInformation implements OnInit {
  private contactService = inject(ContactService);
  contactInformation = signal<ContactInformationModel | null>(null);
  allContactInformation = signal<ContactInformationModel[] | null>(null);
  loading = signal(false);

  ngOnInit() {
    this.listAll();
  }

  listAll() {
    this.contactService.getContactInformation().subscribe({
      next: (info) => this.allContactInformation.set(info),
      error: (err) => console.error('Error tracking delivery:', err),
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
        error: (err) => console.error('Error creating contact information:', err),
      });
  }
}
