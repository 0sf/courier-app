import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import prisma from "../config/prisma";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role: string;
    name: string;
    email: string;
    iat: number;
    exp: number;
  };
}

// Create Shipment
export const createShipment = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      recipient_name,
      recipient_address,
      shipment_details,
      weight,
      dimensions,
    } = req.body;
    const userId = req.user.id;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const tracking_number = uuidv4();

    const newShipment = await prisma.shipment.create({
      data: {
        user_id: userId,
        tracking_number,
        sender_name: user.name,
        sender_address: user.address,
        recipient_name,
        recipient_address,
        shipment_details,
        weight,
        dimensions,
        status: "Pending",
      },
    });
    res.status(201).json(newShipment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

// Delete(Soft) Shipment (Admin)
export const deleteShipment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const requestingUser = req.user as any;

    if (requestingUser.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const existingShipment = await prisma.shipment.findFirst({
      where: {
        id: parseInt(id),
        deleted_at: null,
      },
    });

    if (!existingShipment) {
      return res
        .status(404)
        .json({ message: "Shipment not found or already deleted" });
    }

    const deletedShipment = await prisma.shipment.update({
      where: { id: parseInt(id) },
      data: { deleted_at: new Date() },
    });

    res.status(200).json({
      message: "Shipment deleted successfully",
      shipment: deletedShipment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Track Shipment (Excludes deleted shipments)
export const trackShipment = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { tracking_number } = req.params;

    const shipment = await prisma.shipment.findFirst({
      where: {
        tracking_number,
        deleted_at: null, 
      },
      include: { user: { select: { name: true, email: true } } },
    });

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.status(200).json(shipment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Shipments (Admin)
export const getAllShipments = async (req: Request, res: Response) => {
  try {
    const requestingUser = req.user as any;

    if (requestingUser.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const shipments = await prisma.shipment.findMany({
      where: {
        deleted_at: null, 
      },
      include: { user: { select: { name: true, email: true } } },
    });
    res.status(200).json(shipments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get User's Shipments 
export const getUserShipments = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any).id;
    const shipments = await prisma.shipment.findMany({
      where: {
        user_id: userId,
        deleted_at: null,
      },
      include: { user: { select: { name: true, email: true } } },
    });
    res.status(200).json(shipments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Shipment Status (Admin Only)
export const updateShipmentStatus = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { status } = req.body;
    const requestingUser = req.user as any;

    if (requestingUser?.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedShipment = await prisma.shipment.update({
      where: { id: parseInt(id) },
      data: { status, updated_at: new Date() },
    });

    if (!updatedShipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.status(200).json(updatedShipment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
