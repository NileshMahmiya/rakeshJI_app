import express from "express";
import { adminHomeData } from "../controller/adminHome.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import authorization from "../middleware/authorization.middleware.js";


 const adminDashboardRouter = express.Router()



 adminDashboardRouter.get("/",authMiddleware,authorization,adminHomeData )


 export default adminDashboardRouter