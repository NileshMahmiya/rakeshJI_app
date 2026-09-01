import mongoose from "mongoose";

const poojaBookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    poojaName: {
      type: String,
      required: [true, "Pooja name is required"],
      trim: true,
    },
    yajmanName: {
      type: String,
      required: [true, "Yajman (Client) name is required"],
      trim: true,
    },
    yajmanPhone: {
      type: String,
      trim: true,
      default: "",
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["upcoming", "completed", "cancelled"],
      default: "upcoming",
    },
    earnings: {
      lifafa: {
        type: Number,
        default: 0,
      },
      extraPesa: {
        type: Number,
        default: 0, // Renamed from chuttaPesa
      },
      expenses: {
        type: Number,
        default: 0,
      },
    },
    remarks: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for total combined earnings (Lifafa + Extra Pesa)
poojaBookingSchema.virtual("combinedEarnings").get(function () {
  return (this.earnings.lifafa || 0) + (this.earnings.extraPesa || 0);
});

const PoojaBooking = mongoose.model("PoojaBooking", poojaBookingSchema);
export default PoojaBooking;