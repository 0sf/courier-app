import { create } from "zustand";
import {
  getUserShipments,
  createShipment,
  trackShipment,
  getAllShipments,
  updateShipmentStatus,
  deleteShipment,
} from "../services/shipmentService";
import { Shipment, CreateShipmentPayload } from "../types";

interface ShipmentState {
  shipments: Shipment[];
  allShipments: Shipment[];
  loading: boolean;
  error: string | null;
  fetchUserShipments: () => Promise<void>;
  createShipment: (data: CreateShipmentPayload) => Promise<void>;
  trackedShipment: Shipment | null;
  trackShipment: (trackingNumber: string) => Promise<void>;
  clearTrackedShipment: () => void;
  fetchAllShipments: () => Promise<void>;
  updateShipmentStatus: (id: number, status: string) => Promise<void>;
  deleteShipment: (id: number) => Promise<void>;
}

const useShipmentStore = create<ShipmentState>((set) => ({
  shipments: [],
  allShipments: [],
  loading: false,
  error: null,
  trackedShipment: null,
  deleteShipment: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteShipment(id);
      // Update local state to remove the deleted shipment
      set((state) => ({
        shipments: state.shipments.filter((shipment) => shipment.id !== id),
        allShipments: state.allShipments.filter(
          (shipment) => shipment.id !== id
        ),
        loading: false,
      }));
    } catch (error: unknown) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to delete shipment",
        loading: false,
      });
    }
  },

  fetchUserShipments: async () => {
    set({ loading: true, error: null });
    try {
      const shipments = await getUserShipments();
      set({ shipments, loading: false });
    } catch (error: unknown) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch shipments",
        loading: false,
      });
    }
  },

  createShipment: async (data: CreateShipmentPayload) => {
    set({ loading: true, error: null });
    try {
      const newShipment = await createShipment(data);
      set((state) => ({
        shipments: [...state.shipments, newShipment],
        loading: false,
      }));
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : "Failed to create shipment";
      set({ error: errMsg, loading: false });
      throw error;
    }
  },

  trackShipment: async (trackingNumber: string) => {
    set({ loading: true, error: null });
    try {
      const shipment = await trackShipment(trackingNumber);
      set({ trackedShipment: shipment, loading: false });
    } catch (error: unknown) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to track shipment",
        loading: false,
      });
    }
  },

  clearTrackedShipment: () => {
    set({ trackedShipment: null });
  },

  fetchAllShipments: async () => {
    set({ loading: true, error: null });
    try {
      const allShipments = await getAllShipments();
      set({ allShipments, loading: false });
    } catch (error: unknown) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch all shipments",
        loading: false,
      });
    }
  },

  updateShipmentStatus: async (id, status) => {
    set({ loading: true, error: null });
    try {
      const updatedShipment = await updateShipmentStatus(id, status);
      set((state) => ({
        shipments: state.shipments.map((shipment) =>
          shipment.id === id
            ? { ...shipment, status: updatedShipment.status }
            : shipment
        ),
        allShipments: state.allShipments.map((shipment) =>
          shipment.id === id
            ? { ...shipment, status: updatedShipment.status }
            : shipment
        ),
        loading: false,
      }));
    } catch (error: unknown) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to update shipment status",
        loading: false,
      });
    }
  },
}));

export default useShipmentStore;
