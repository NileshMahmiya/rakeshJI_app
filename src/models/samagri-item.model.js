import mongoose from "mongoose";

const samagriItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    itemCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SamagriCategory",
      default: null,
    },
  },

  { timestamps: true }
);

const SamagriItems = mongoose.model("SamagriItem", samagriItemSchema);

export default SamagriItems;