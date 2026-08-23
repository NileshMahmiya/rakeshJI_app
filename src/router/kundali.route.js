import express from "express";
import {
  generateKundali,
} from "../controller/kundali.controller.js";

const router = express.Router();

router.post(
  "/generate",
  generateKundali
);

export default router;