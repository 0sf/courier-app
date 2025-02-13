import axios from "axios";
import { Shipment, CreateShipmentData } from "../types";

const API_BASE_URL =
  import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

export const createShipment = async (
  shipmentData: CreateShipmentData
): Promise<Shipment> => {
  const response = await axios.post(`${API_BASE_URL}/shipments`, shipmentData);
  return response.data;
};

// Get user shipments
export const getUserShipments = async (): Promise<Shipment[]> => {
  const response = await axios.get(`${API_BASE_URL}/shipments/user`);
  return response.data;
};

// Tracking
export const trackShipment = async (
  trackingNumber: string
): Promise<Shipment> => {
  const response = await axios.get(
    `${API_BASE_URL}/shipments/track/${trackingNumber}`
  );
  return response.data;
};

//Get All Shipments (for admins)
export const getAllShipments = async (): Promise<Shipment[]> => {
  const response = await axios.get(`${API_BASE_URL}/shipments/all`);
  return response.data;
};

// Update Shipments (admin)
export const updateShipmentStatus = async (
  id: number,
  status: string
): Promise<Shipment> => {
  const response = await axios.put(`${API_BASE_URL}/shipments/${id}/status`, {
    status,
  });
  return response.data;
};

export const deleteShipment = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/shipments/${id}`);
};
