import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DeliveryModel, PackageModel, PriceModel, TrackingModel } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5003';

  // Price Controller
  calculatePrice(packageData: PackageModel): Observable<PriceModel> {
    return this.http.post<PriceModel>(`${this.apiUrl}/price`, packageData);
  }

  // Delivery Controller
  getDelivery(deliveryData: TrackingModel): Observable<DeliveryModel> {
    // from query param
    return this.http.get<DeliveryModel>(
      `${this.apiUrl}/delivery?ZipCode=${deliveryData.zipCode}&TrackingId=${deliveryData.trackingId}`,
    );
  }

  registerPackage(packageData: PackageModel): Observable<DeliveryModel> {
    return this.http.post<DeliveryModel>(`${this.apiUrl}/delivery`, packageData);
  }
}
