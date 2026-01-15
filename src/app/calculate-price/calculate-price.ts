import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../shared/auth/auth.service';
import { PackageModel } from '../../shared/models/models';
import { DeliveryService } from '../../shared/services/delivery.service';
import { PackageForm } from '../package-form/package-form';

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
  loading = signal(false);

  onCalculate(packageData: PackageModel) {
    this.loading.set(true);
    this.price.set(null);
    this.lastCalculatedPackage.set(packageData);
    this.deliveryService
      .calculatePrice(packageData)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
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
