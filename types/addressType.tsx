export interface AddressType {
  userId?: string;
  customerName: string;
  phoneNumber: string;
  detail: string;
  placeId: string;
  latitude: number;
  longitude: number;
  default: boolean;
}

export interface AddressPlaces {
  description: string;
  place_id: string;
}
