import mongoose from "mongoose";

const samagriCategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },



   
  },
  {
    timestamps: true,
  }
);

const SamagriCategory = mongoose.model(
  "SamagriCategory",
  samagriCategorySchema
);

export default SamagriCategory;