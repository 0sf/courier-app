import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
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

/**
 * Get User Profile
 * Returns the authenticated user's profile details.
 */
export const getUserProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }
    const userId = req.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        address: true,
        phone_number: true,
        role: true,
      },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error: unknown) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update User Profile
 * Allows the authenticated user to update profile details.
 */
export const updateUserProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const userId = req.user.id;
    const { name, address, phone_number, password } = req.body;
    const updatedData: { [key: string]: any } = {};

    if (name !== undefined) updatedData.name = name;
    if (address !== undefined) updatedData.address = address;
    if (phone_number !== undefined) updatedData.phone_number = phone_number;
    if (password !== undefined) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedData,
      select: {
        id: true,
        email: true,
        name: true,
        address: true,
        phone_number: true,
        role: true,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error: unknown) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete User Account
 * Allows the authenticated user to delete their account.
 */
export const deleteUserAccount = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }
    const userId = req.user.id;
    await prisma.user.delete({
      where: { id: userId },
    });
    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error: unknown) {
    console.error("Error deleting user account:", error);
    res.status(500).json({ message: "Server error" });
  }
};
