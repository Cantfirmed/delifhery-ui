// Maybe split up these in different files later if I remember...
// These are all the DTOs needed for communication with the backend

export interface PackageModel {
  sender: {
    name: string;
    zip: number;
    country: string;
    city: string;
    street: string;
  };
  recipient: {
    name: string;
    zip: number;
    country: string;
    city: string;
    street: string;
  };
  weight: number;
  width: number;
  height: number;
  length: number;
}

export interface DeliveryModel {
  id: number;
  trackingNumber: number;
  createdById: number;
  package: PackageModel;
  contactInformation: ContactInformationModel;
  status: DeliveryStateModel;
  labelBase64: string; // PDF as base64 string
  paymentUrl: string;
}

export interface DeliveryStateModel {
  id: number | null;
  createdDate: string | null;
  value: string | null; // Additional info
  status: 'Registered' | 'In Transit' | 'Delivered';
}

export interface ContactInformationModel {
  type: 'Email' | 'Phone';
  value: string;
}

export interface TrackingModel {
  zipCode: number;
  trackingId: number;
}

export interface PriceModel {
  price: number;
}
