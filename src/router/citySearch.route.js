import express from "express";
import citySeach from "../controller/citySearch.controller.js";

const searchRouter = express.Router();

searchRouter.get("/search", citySeach);

export default searchRouter