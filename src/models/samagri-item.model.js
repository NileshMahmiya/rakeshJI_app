import mongoose from "mongoose";

const samagriItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      unique: true,
    },

    itemQtType: {
      type: mongoose.Schema.ObjectId,
      ref: "QuantityType",
      required: true,
    },

    itemQuantity: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const SamagriItems = mongoose.model("SamagriItem", samagriItemSchema);

export default SamagriItems;
