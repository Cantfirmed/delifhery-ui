import { Component } from '@angular/core';
import { PackageForm } from '../package-form/package-form';

@Component({
  selector: 'app-calculate-price',
  imports: [PackageForm],
  templateUrl: './calculate-price.html',
  styleUrl: './calculate-price.css',
})
export class CalculatePrice {}
