import { Component, inject, signal } from '@angular/core';
import { DeliveryCreateModel, DeliveryModel, PackageModel } from '../../shared/models/models';
import { DeliveryService } from '../../shared/services/delivery.service';
import { PackageForm } from '../package-form/package-form';

@Component({
  selector: 'app-deliver',
  imports: [PackageForm],
  templateUrl: './deliver.html',
  styleUrl: './deliver.css',
})
export class Deliver {
  private deliveryService = inject(DeliveryService);
  delivery = signal<DeliveryModel | null>(null);

  onRegister(packageData: PackageModel) {
    const dc: DeliveryCreateModel = {
      package: packageData,
    };
    this.deliveryService.registerPackage(dc).subscribe({
      next: (delivery) => this.delivery.set(delivery),
      // Show errors in UI with daisyUI later
      error: (err) => console.error('Error registering package:', err),
    });
  }
}
