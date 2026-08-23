import mongoose from "mongoose";

const samagriListSchema = new mongoose.Schema(
  {
    samagriListTitle: {
      type: String,
      required: true,
      trim: true,
    },
    samagriListDescription: {
      type: String,
      required: true,
      trim: true,
    },
    headers: [
      {
        headerTitle: {
          type: String,
          required: true,
          trim: true,
        },
        samagriItems: [
          {
            item: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "SamagriItem",
              required: true,
            },
            customQuantity: {
              type: String,
              required: true,
            },
            customQtType: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "QuantityType",
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const SamagriList = mongoose.model("SamagriList", samagriListSchema);
export default SamagriList;