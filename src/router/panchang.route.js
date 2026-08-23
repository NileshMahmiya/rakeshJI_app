import express from "express";

import { getPanchang } from "../controller/panchang.controller.js";

const panchnagRouter = express.Router();

panchnagRouter.get("/get-panchang", getPanchang);

export default panchnagRouter;
