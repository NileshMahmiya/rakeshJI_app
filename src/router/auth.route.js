import express from "express"
import { changePassword, forgotPassword, login, resendOtp, resetPassword, signUp, verifyForgotPasswordOtp } from "../controller/auth.controller.js"
import authMiddleware from "../middleware/auth.middleware.js";
const authRouter = express.Router()



authRouter.post("/sign-up", signUp);
authRouter.post("/login", login)
authRouter.post("/resend-otp", resendOtp);
authRouter.post("/forgot-password",forgotPassword )
authRouter.post("/verify-otp", verifyForgotPasswordOtp)
authRouter.post("/reset-password", resetPassword)
authRouter.post("/change-password",authMiddleware, changePassword);

export default authRouter