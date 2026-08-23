import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

export const app = express();

// 1. Enable CORS for all headers and methods
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept","X-Requested-With"],
}));

// 2. Body parsers (must have extended: true)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Static files
app.use("/uploads", express.static("uploads"));

// 4. Routes

import BookRouter from "./router/book.route.js";

import quantityTypeRouter from "./router/item-qt-type.route.js";
import samagriItemsRouter from "./router/samagri-items.route.js";


import panchnagRouter from "./router/panchang.route.js";

import userRouter from "./router/user.route.js";
import authRouter from "./router/auth.route.js";



import searchRouter from "./router/citySearch.route.js";
import authMiddleware from "./middleware/auth.middleware.js";
import adminDashboardRouter from "./router/admin-dashboard.route.js";
import samagriListRouter from "./router/samagriList.route.js";
import bookCategoryRouter from "./router/bookCategory.route.js";


app.use("/api/v1/book", BookRouter);
app.use("/api/v1/admin", adminDashboardRouter);
app.use("/api/v1/qt-type", quantityTypeRouter);
app.use("/api/v1/samagri-item", samagriItemsRouter);

app.use("/api/v1/panchang", panchnagRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

app.use("/api/v1/search", searchRouter);

app.use("/api/v1/samagriList", samagriListRouter);
app.use("/api/v1/book-category", bookCategoryRouter)
import kundaliRoutes from "./router/kundali.route.js";

app.use(
  "/api/v1/kundali",
  kundaliRoutes
);

app.get("/", (req, res) => {
  res.send("hello everyone");
});