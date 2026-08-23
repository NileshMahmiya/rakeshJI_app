import mongoose from "mongoose";


const bookCategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      default:"Other"
    },
  },
  {
    timestamps: true,
  }
);

const BookCategory = mongoose.model(
  "BookCategory",
  bookCategorySchema
);

export default BookCategory