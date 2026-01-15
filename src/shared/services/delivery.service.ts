import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';
import {
  DeliveryCreateModel,
  DeliveryModel,
  DeliveryStateModel,
  PackageModel,
  PriceModel,
  TrackingModel,
} from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private http = inject(HttpClient);
  private apiUrl = environments.apiUrl;

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

  registerPackage(packageData: DeliveryCreateModel): Observable<DeliveryModel> {
    return this.http.post<DeliveryModel>(`${this.apiUrl}/delivery`, packageData);
  }

  getDeliveryHistory(deliveryData: TrackingModel): Observable<DeliveryStateModel[]> {
    return this.http.get<DeliveryStateModel[]>(
      `${this.apiUrl}/deliverystate/history/${deliveryData.trackingId}?zipCode=${deliveryData.zipCode}`,
    );
  }

  subscribeToNotifications(trackingId: number, zipCode: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/notifications`, { trackingId, zipCode });
  }
}
