import express from "express";
import {
  createShipment,
  trackShipment,
  getAllShipments,
  getUserShipments,
  updateShipmentStatus,
  deleteShipment,
} from "../controllers/shipment.controller";
import authMiddleware from "../middleware/authMiddleware";
import { body, param } from "express-validator";

const router = express.Router();

// Create Shipment (Protected Route)
router.post(
  "/",
  authMiddleware as express.RequestHandler,
  [
    body("recipient_name").notEmpty().withMessage("Recipient name is required"),
    body("recipient_address")
      .notEmpty()
      .withMessage("Recipient address is required"),
  ],
  createShipment as express.RequestHandler
);

// Track Shipment
router.get(
  "/track/:tracking_number",
  [
    param("tracking_number")
      .notEmpty()
      .withMessage("Tracking number is required"),
  ],
  trackShipment as express.RequestHandler
);

// Get All Shipments (Admin Only)
router.get(
  "/all",
  authMiddleware as express.RequestHandler,
  getAllShipments as express.RequestHandler
);

// Get User's Shipments (Protected Route)
router.get(
  "/user",
  authMiddleware as express.RequestHandler,
  getUserShipments as express.RequestHandler
);

// Update Shipment Status (Admin Only)
router.put(
  "/:id/status",
  authMiddleware as express.RequestHandler,
  [
    param("id").isInt().withMessage("Invalid shipment ID"),
    body("status").notEmpty().withMessage("Status is required"),
  ],
  updateShipmentStatus as express.RequestHandler
);

// Delete Shipment (Admin Only)
router.delete(
  "/:id",
  authMiddleware as express.RequestHandler,
  deleteShipment as express.RequestHandler
);

export default router;
