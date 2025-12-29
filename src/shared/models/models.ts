// Maybe split up these in different files later if I remember...
// These are all the DTOs needed for communication with the backend

export interface Address {
  name: string;
  zipCode: number;
  country: string;
  city: string;
  street: string;
  state: string;
}

export interface PackageModel {
  sender: Address;
  recipient: Address;
  weight: number;
  width: number;
  height: number;
  length: number;
}

export interface DeliveryCreateModel {
  package: PackageModel;
}

export interface DeliveryModel {
  id: number;
  trackingId: number;
  price: number;
  createdById: number;
  package: PackageModel;
  contactInformation: ContactInformationModel;
  currentState: DeliveryStateModel;
  label: string;
  paymentUrl: string;
}

export interface DeliveryStateModel {
  id: number | null;
  createdDate: string | null;
  value: string | null; // Additional info
  state: 'Registered' | 'In Transit' | 'Delivered';
}

export interface ContactInformationModel {
  type: 'Email' | 'PhoneNumber';
  value: string;
}

export interface TrackingModel {
  zipCode: number;
  trackingId: number;
}

export interface PriceModel {
  price: number;
}
