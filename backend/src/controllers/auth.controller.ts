import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { generateToken } from "../utils/auth";
import prisma from "../config/prisma";

// User Registration
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { email, password, name, address, phone_number } = req.body;

    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch (dbError: unknown) {
      console.error("Database connection probe failed:", dbError);
      throw {
        code: "P5010",
        message: "Database service unavailable",
        originalError: dbError,
      };
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        address,
        phone_number,
        role: "client",
      },
    });

    const token = generateToken(newUser);

    res.status(201).json({
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        address: newUser.address,
        phone_number: newUser.phone_number,
      },
      token,
    });
  } catch (error: unknown) {
    console.error("Registration process failed:", error);

    if (typeof error === "object" && error !== null && "code" in error) {
      const errObj = error as { code?: string; message?: string; meta?: any };

      if (errObj.code === "P5010") {
        if (errObj.meta && errObj.meta.modelName === "User") {
          res.status(503).json({
            error: "Database Schema Missing",
            message:
              "User table not found. Please run the initial migrations to create the required tables.",
          });
        } else {
          res.status(503).json({
            error: "Database Connection Failure",
            message:
              "Failed to establish database connection. Please check your database credentials and network connectivity.",
          });
        }
        return;
      } else if (errObj.code === "P2021") {
        res.status(500).json({
          error: "Database Schema Missing",
          message: "Please run the database migrations before proceeding.",
        });
        return;
      }
    }

    res.status(500).json({
      error: "Registration failed",
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

// User Login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const token = generateToken(user);

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        phone_number: user.phone_number,
        role: user.role,
      },
      token,
    });
  } catch (error: unknown) {
    console.error("Login process failed:", error);
    res.status(401).json({ error: "Invalid credentials" });
  }
};
