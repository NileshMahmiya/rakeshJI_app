import express from "express";
import {
  createBooking,
  updateBooking,
  getBookingMetrics,
  deleteBooking,
} from "../controller/poojaBooking.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js"; // Adjust path to match your auth middleware

const poojaBookingrouter = express.Router();

// All booking routes require authentication
poojaBookingrouter.use(authMiddleware);

// POST: Create a new pooja booking
poojaBookingrouter.post("/", createBooking);

// GET: Get all bookings and analytical metrics (supports ?startDate=&endDate=)
poojaBookingrouter.get("/metrics", getBookingMetrics);

// PUT: Update booking details, status, or earnings (Lifafa & Extra Pesa)
poojaBookingrouter.put("/:id", updateBooking);

// DELETE: Delete a mistaken or unwanted booking by ID
poojaBookingrouter.delete("/:id", deleteBooking);

export default poojaBookingrouter;