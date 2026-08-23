import User from "../models/user.model.js";

import hashPassword from "../services/hash.password.js";
import sendMail from "../utils/send.main.js";
import signUpEmail from "../services/signUp.email.js";
import jwt from "jsonwebtoken"
import comparePassword from "../services/compare.password.js";
import resendOtpEmail from "../services/resendOtpEmail.js";
import { genrateOtp } from "../utils/genrateOtp.js";
import hashOtp from "../services/hash.otp.js";
import compareOtp from "../services/compare.otp.js";



export const signUp = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
     
    } = req.body;

    if (!fullName || !email || !password ) {
      return res.status(400).json({
        message:
          "Full name, email, and password are required",
      });
    }

 

    const normalizedEmail = email.trim().toLowerCase();

    const existingEmail = await User.findOne({
      email: normalizedEmail,
    });

    if (existingEmail) {
      return res.status(400).json({
        message: "User with the same email already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      userType:"user",
    });

    try {
      await sendMail({
        to: user.email,
        subject: `Thank you For Creating The Account`,
        html: signUpEmail(
          user.fullName,
          user.email,
        
         
        ),
      });

      console.log("Account creation email sent successfully");

    } catch (mailError) {
      console.log("Email sending failed:", mailError.message);
    }

    return res.status(201).json({
      message: "Sign up Successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        userType: user.userType,
      },
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Something went wrong in Sign up User API",
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

   const isPasswordCorrect =  await comparePassword(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        userType: user.userType,
        email:user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    return res.status(200).json({
      message: "Login Successfully",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        userType: user.userType,
      },
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Something went wrong in Login API",
    });
  }
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "user not found",
        status: false,
      });
    }

    

    if (
      user.otpLastSentAt &&
      Date.now() - user.otpLastSentAt.getTime() > 24 * 60 * 60 * 1000
    ) {
      user.otpResendCount = 0;
    }

    if (user.otpResendCount >= 5) {
      return res.status(400).json({
        message: "Otp Send limit reached try again after 24 hours",
        status: false,
      });
    }

    if (
      user.otpLastSentAt &&
      Date.now() - user.otpLastSentAt.getTime() < 60000
    ) {
      return res.status(400).json({
        message: "Please Wait 60 secound before requesting new otp",
        status: false,
      });
    }

    const newotp = genrateOtp();

    const newHashedOtp = await hashOtp(String(newotp));

    user.otp = newHashedOtp;
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    user.otpLastSentAt = new Date();
    user.otpResendCount += 1;

    await user.save();

    try {
      await sendMail({
        to: user.email,
        subject: `Your Otp To Reset Password`,
        html: resendOtpEmail(
          user.fullName,
          newotp,
        
         
        ),
      });

      console.log("Account creation email sent successfully");

    } catch (mailError) {
      console.log("Email sending failed:", mailError.message);
    };
    return res.status(200).json({
      message: "forgotpassword otp send",
      status: true,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "something went wrong in forgot password api ",
      status: false,
    });
  }
};




export const changePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword, confirmNewPassword } =
      req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "user not found",
        status: false,
      });
    }

    if (confirmNewPassword !== newPassword) {
      return res.status(400).json({
        message: "Both Password does not Match",
        status: "false",
      });
    }

    const isSamePassword = await comparePassword(newPassword, user.password);

    if (isSamePassword) {
      return res.status(400).json({
        message: "New password cannot be same as current password",
        status: false,
      });
    }

    const isValidPassword = await comparePassword(
      currentPassword,
      user.password,
    );
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Your current Password Does Not Match",
        status: false,
      });
    }

    const hashedPassword = await hashPassword(newPassword);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      message: "Your Password is changed Successfully",
      status: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      message: "something went wrong in change password api",
    });
  }
};



export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "user not found",
        status: false,
      });
    }


    if (
      user.otpLastSentAt &&
      Date.now() - user.otpLastSentAt.getTime() > 24 * 60 * 60 * 1000
    ) {
      user.otpResendCount = 0;
    }

 

    if (user.otpResendCount >= 5) {
      return res.status(400).json({
        message: "Otp Send limit reached try again after 24 hours",
        status: false,
      });
    }

  

    if (
      user.otpLastSentAt &&
      Date.now() - user.otpLastSentAt.getTime() < 60 * 1000
    ) {
      return res.status(400).json({
        message: "Please Wait 60 secound before requesting new otp",
        status: false,
      });
    }

    const newotp = genrateOtp();

    const newHashedOtp = await hashOtp(String(newotp));

    user.otp = newHashedOtp;
    user.otpResendCount += 1;
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    user.otpLastSentAt = new Date();
    await user.save();

   try {
      await sendMail({
        to: user.email,
        subject: `Your Otp To Reset Password`,
        html: resendOtpEmail(
          user.fullName,
          newotp,
        
         
        ),
      });

      console.log("Account creation email sent successfully");

    } catch (mailError) {
      console.log("Email sending failed:", mailError.message);
    };

    return res.status(200).json({
      message: "new otp send",
      status: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "something went wrong",
      status: false,
    });
  }
};



export const verifyForgotPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "user not found",
        status: false,
      });
    }

    if (!user.otpExpiresAt || Date.now() > user.otpExpiresAt.getTime()) {
      return res.status(400).json({
        message: "OTP has expired",
        status: false,
      });
    }

    const isOtp = await compareOtp(otp, user.otp);

    if (!isOtp) {
      return res.status(400).json({
        message: "otp did not match",
        status: false,
      });
    }

    user.isOtpVerified = true;

    await user.save();

    return res.status(200).json({
      message: "Otp Verification done please Enter New Password",
      status: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Something went wrong in verifying forgot password otp api",
      status: false,
    });
  }
};



export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmNewPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "user not found",
        status: false,
      });
    }

    if (!user.isOtpVerified) {
      return res.status(400).json({
        message: "Otp Verification is pending",
        status: false,
      });
    }

    if (confirmNewPassword !== newPassword) {
      return res.status(400).json({
        message: "Both Password does not Match",
        status: false,
      });
    }

    const isSamePassword = await comparePassword(newPassword, user.password);

    if (isSamePassword) {
      return res.status(400).json({
        message: "New password cannot be same as old password",
        status: false,
      });
    }

    const newHashedPassword = await hashPassword(newPassword);

    user.password = newHashedPassword;
    user.otp = null;
    user.otpExpiresAt = null;

    user.otpLastSentAt = null;
    user.otpResendCount = 0;
    user.isOtpVerified = false;

    await user.save();

    return res.status(200).json({
      message: "Password Reset Successful",
      status: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      message: "something went wrong in Forget Password Reset Password API",
      status: false,
    });
  }
};