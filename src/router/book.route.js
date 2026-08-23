import express from "express";

import uploadBookPdf from "../middleware/uploadBookPdf.js";

import {
  createBook,
  fetchAllBooks,
  fetchSingleBook,
  updateBook,
  deleteBook,
} from "../controller/book.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorization from "../middleware/authorization.middleware.js";

const BookRouter =
  express.Router();


// =====================================================
// CREATE BOOK
// =====================================================

BookRouter.post(
  "/create-book",

  authMiddleware,

  authorization,

  uploadBookPdf.fields([
    {
      name: "bookPdf",
      maxCount: 1,
    },
  ]),

  createBook
);


// =====================================================
// GET ALL BOOKS
// =====================================================

BookRouter.get(
  "/get-all-books",
  fetchAllBooks
);


// =====================================================
// GET SINGLE BOOK
// =====================================================

BookRouter.get(
  "/get-book/:id",
  fetchSingleBook
);


// =====================================================
// UPDATE BOOK
// =====================================================

BookRouter.put(
  "/update-book/:id",

  authMiddleware,

  authorization,

  uploadBookPdf.fields([
    {
      name: "bookPdf",
      maxCount: 1,
    },
  ]),

  updateBook
);


// =====================================================
// DELETE BOOK
// =====================================================

BookRouter.delete(
  "/delete-book/:id",

  authMiddleware,

  authorization,

  deleteBook
);


export default BookRouter;