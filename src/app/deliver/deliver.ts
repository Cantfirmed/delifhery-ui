import { Component, inject, signal } from '@angular/core';
import { DeliveryCreateModel, DeliveryModel, PackageModel } from '../../shared/models/models';
import { DeliveryService } from '../../shared/services/delivery.service';
import { ErrorMessageService } from '../../shared/services/error-message.service';
import { PackageForm } from '../package-form/package-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deliver',
  imports: [PackageForm],
  templateUrl: './deliver.html',
  styleUrl: './deliver.css',
})
export class Deliver {
  private deliveryService = inject(DeliveryService);
  private errorMessageService = inject(ErrorMessageService);
  private router = inject(Router);

  delivery = signal<DeliveryModel | null>(null);
  packageData = signal<PackageModel | null>(null);

  constructor() {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['packageData']) {
      this.packageData.set(nav.extras.state['packageData']);
    }
  }

  onRegister(packageData: PackageModel) {
    const dc: DeliveryCreateModel = {
      package: packageData,
    };
    this.deliveryService.registerPackage(dc).subscribe({
      next: (delivery) => this.delivery.set(delivery),
      error: (err) => {
        if (err.status === 400) {
          this.errorMessageService.showMessage(
            'Invalid package data. Please check the information provided.',
          );
        }
        if (err.status === 500) {
          this.errorMessageService.showServerError();
        }
      },
    });
  }

  resetForm() {
    this.delivery.set(null);
    this.packageData.set(null);
  }
}
