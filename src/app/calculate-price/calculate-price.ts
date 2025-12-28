import { Component, inject, signal } from '@angular/core';
import { PackageForm } from '../package-form/package-form';
import { DeliveryService } from '../../shared/services/delivery.service';
import { CurrencyPipe } from '@angular/common';
import { PackageModel } from '../../shared/models/models';

@Component({
  selector: 'app-calculate-price',
  imports: [PackageForm, CurrencyPipe],
  templateUrl: './calculate-price.html',
  styleUrl: './calculate-price.css',
})
export class CalculatePrice {
  private deliveryService = inject(DeliveryService);
  price = signal<number | null>(null);

  onCalculate(packageData: PackageModel) {
    this.deliveryService.calculatePrice(packageData).subscribe({
      next: (price) => this.price.set(price.price),
      error: (err) => console.error('Error calculating price:', err),
    });
  }
}
