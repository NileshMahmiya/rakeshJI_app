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
     
    },

    itemQuantity: {
      type: String,
      
    },
  },
  { timestamps: true },
);

const SamagriItems = mongoose.model("SamagriItem", samagriItemSchema);

export default SamagriItems;
