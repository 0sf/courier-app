export interface CreateShipmentData {
  id: number;
  user_id: number;
  tracking_number: string;
  sender_name: string;
  sender_address: string;
  recipient_name: string;
  recipient_address: string;
  shipment_details: string;
  weight: number;
  dimensions: string;
  status: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateShipmentPayload {
  id: number;
  user_id: number;
  tracking_number: string;
  sender_name: string;
  sender_address: string;
  recipient_name: string;
  recipient_address: string;
  shipment_details: string;
  weight: number;
  dimensions: string;
  status: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface User {
  id: number;
  email: string;
  name: string;
  address: string;
  phone_number: string;
  role: string;
  created_at?: Date;
}

export interface Shipment {
  id: number;
  user_id: number;
  tracking_number: string;
  sender_name: string;
  sender_address: string;
  recipient_name: string;
  recipient_address: string;
  shipment_details: string;
  weight: number;
  dimensions: string;
  status: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ShipmentFormData {
  recipient_name: string;
  recipient_address: string;
  shipment_details: string;
  weight: string;
  dimensions: string;
  sender_name: string; 
  tracking_number?: string;
}
