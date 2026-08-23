import mongoose from "mongoose";

const quantityTypeSchema = new mongoose.Schema(
  {
    typeName: {
      type: String,
      required: true,
      unique: true,
    },
    quantityShortForm: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const QuantityType = mongoose.model("QuantityType", quantityTypeSchema);

export default QuantityType;
