import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import shipmentRoutes from "./routes/shipment.routes";
import userRoutes from "./routes/user.routes";
import errorMiddleware from "./middleware/errorMiddleware";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/shipments", shipmentRoutes);

// Error handling middleware (must be after all routes)
app.use(errorMiddleware);

export default app;
