import express, { Request, Response, NextFunction } from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} from "../controllers/user.controller";

const router = express.Router();

const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

/**
 * Get User Profile
 * Endpoint: GET /profile
 */
router.get("/profile", asyncHandler(getUserProfile));

/**
 * Update User Profile
 * Endpoint: PUT /profile
 */
router.put("/profile", asyncHandler(updateUserProfile));

/**
 * Delete User Account
 * Endpoint: DELETE /profile
 */
router.delete("/profile", asyncHandler(deleteUserAccount));

export default router;
