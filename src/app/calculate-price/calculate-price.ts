import { Component, inject, signal } from '@angular/core';
import { PackageForm } from '../package-form/package-form';
import { DeliveryService } from '../../shared/services/delivery.service';
import { CurrencyPipe } from '@angular/common';
import { PackageModel } from '../../shared/models/models';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-calculate-price',
  imports: [PackageForm, CurrencyPipe],
  templateUrl: './calculate-price.html',
  styleUrl: './calculate-price.css',
})
export class CalculatePrice {
  private deliveryService = inject(DeliveryService);
  private router = inject(Router);
  private authService = inject(AuthService);

  price = signal<number | null>(null);
  isLoggedIn = this.authService.isLoggedIn;
  lastCalculatedPackage = signal<PackageModel | null>(null);

  onCalculate(packageData: PackageModel) {
    this.lastCalculatedPackage.set(packageData);
    this.deliveryService.calculatePrice(packageData).subscribe({
      next: (price) => this.price.set(price.price),
      error: (err) => console.error('Error calculating price:', err),
    });
  }

  transferToDeliver() {
    const pkg = this.lastCalculatedPackage();
    if (pkg) {
      this.router.navigate(['/deliver'], { state: { packageData: pkg } });
    }
  }
}
