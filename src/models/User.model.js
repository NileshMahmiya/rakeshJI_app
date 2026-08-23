import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    userType: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },

  otp: {
    type: String,
  },
  loginAttempt: {
    type: Number,
    default: 0,
  },
  otpExpiresAt: {
    type: Date,
  },
  otpResendCount: {
    type: Number,
    default: 0,
  },
  otpLastSentAt: {
    type: Date,
  },
  isOtpVerified:{
    type:Boolean,
    default:false
  }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;