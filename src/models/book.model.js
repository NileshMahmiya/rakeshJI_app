import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    bookTitle: {
      type: String,
      required: true,
      trim: true,
    },

    bookDescription: {
      type: String,
      required: true,
      trim: true,
    },

    bookPdfUrl: {
      type: String,
      default: null,
    },

    bookPdfPath: {
      type: String,
      default: null,
    },

    bookCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookCategory",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;