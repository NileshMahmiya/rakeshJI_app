import Book from "../models/book.model.js";
import BookCategory from "../models/bookCategory.model.js";

import uploadPdfToSupabase from "../utils/uploadPdfToSupabase.js";
import deletePdfFromSupabase from "../utils/deletePdfFromSupabase.js";


// =====================================================
// CREATE BOOK
// PDF IS OPTIONAL
// =====================================================

export const createBook = async (req, res) => {
  try {
    const {
      bookTitle,
      bookDescription,
      bookCategory,
    } = req.body;


    // =================================================
    // VALIDATION
    // =================================================

    if (!bookTitle || !bookTitle.trim()) {
      return res.status(400).json({
        success: false,
        message: "Book title is required",
      });
    }


    if (!bookDescription || !bookDescription.trim()) {
      return res.status(400).json({
        success: false,
        message: "Book description is required",
      });
    }


    // =================================================
    // CHECK DUPLICATE BOOK
    // =================================================

    const existingBook = await Book.findOne({
      bookTitle: bookTitle.trim(),
    });


    if (existingBook) {
      return res.status(409).json({
        success: false,
        message: "Book with this title already exists",
      });
    }


    // =================================================
    // CHECK CATEGORY
    // =================================================

    if (bookCategory) {
      const category = await BookCategory.findById(
        bookCategory
      );


      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Book category not found",
        });
      }
    }


    // =================================================
    // PDF IS OPTIONAL
    // =================================================

    const pdfFile = req.files?.bookPdf?.[0];


    let bookPdfUrl = null;
    let bookPdfPath = null;


    // =================================================
    // UPLOAD PDF TO SUPABASE
    // =================================================

    if (pdfFile) {

      const uploadedPdf = await uploadPdfToSupabase(
        pdfFile.buffer,
        pdfFile.originalname
      );


      bookPdfUrl = uploadedPdf.publicUrl;
      bookPdfPath = uploadedPdf.filePath;
    }


    // =================================================
    // CREATE BOOK
    // =================================================

    const book = await Book.create({
      bookTitle: bookTitle.trim(),

      bookDescription: bookDescription.trim(),

      bookPdfUrl,

      bookPdfPath,

      bookCategory: bookCategory || undefined,
    });


    // =================================================
    // RESPONSE
    // =================================================

    return res.status(201).json({
      success: true,
      message: "Book created successfully",
      book,
    });


  } catch (error) {

    console.error(
      "Create Book Error:",
      error
    );


    // Invalid MongoDB ObjectId
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid book category ID",
      });
    }


    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while creating book",
      error: error.message,
    });
  }
};



// =====================================================
// FETCH ALL BOOKS
// SEARCH + PAGINATION + CATEGORY
// =====================================================

export const fetchAllBooks = async (req, res) => {
  try {

    // =================================================
    // QUERY PARAMETERS
    // =================================================

    const page =
      parseInt(req.query.page) || 1;

    const limit =
      parseInt(req.query.limit) || 10;

    const search =
      req.query.search?.trim() || "";

    const category =
      req.query.category?.trim() || "";


    // =================================================
    // VALIDATE PAGINATION
    // =================================================

    if (page < 1) {
      return res.status(400).json({
        success: false,
        message: "Page must be greater than 0",
      });
    }


    if (limit < 1) {
      return res.status(400).json({
        success: false,
        message: "Limit must be greater than 0",
      });
    }


    // =================================================
    // CALCULATE SKIP
    // =================================================

    const skip =
      (page - 1) * limit;


    // =================================================
    // BUILD QUERY
    // =================================================

    const query = {};


    // =================================================
    // SEARCH
    // TITLE + DESCRIPTION
    // =================================================

    if (search) {

      query.$or = [

        {
          bookTitle: {
            $regex: search,
            $options: "i",
          },
        },

        {
          bookDescription: {
            $regex: search,
            $options: "i",
          },
        },

      ];
    }


    // =================================================
    // CATEGORY FILTER
    // =================================================

    if (category) {
      query.bookCategory = category;
    }


    // =================================================
    // COUNT BOOKS
    // =================================================

    const totalBooks =
      await Book.countDocuments(query);


    const totalPages =
      Math.ceil(totalBooks / limit);


    // =================================================
    // FETCH BOOKS
    // =================================================

    const books = await Book.find(query)

      .populate(
        "bookCategory",
        "categoryName"
      )

      .sort({
        createdAt: -1,
      })

      .skip(skip)

      .limit(limit);


    // =================================================
    // NO BOOKS FOUND
    // =================================================

    if (books.length === 0) {

      return res.status(404).json({

        success: false,

        message: search
          ? "No books found for this search"
          : "No books found",

        books: [],

        pagination: {
          currentPage: page,
          limit,
          totalBooks,
          totalPages,
        },

        search,

        category,
      });
    }


    // =================================================
    // SUCCESS
    // =================================================

    return res.status(200).json({

      success: true,

      message:
        "All books fetched successfully",

      books,

      pagination: {
        currentPage: page,
        limit,
        totalBooks,
        totalPages,
      },

      search,

      category,
    });


  } catch (error) {

    console.error(
      "Fetch All Books Error:",
      error
    );


    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }


    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while fetching books",
      error: error.message,
    });
  }
};



// =====================================================
// FETCH SINGLE BOOK
// =====================================================

export const fetchSingleBook = async (
  req,
  res
) => {

  try {

    const { id } = req.params;


    // =================================================
    // FIND BOOK
    // =================================================

    const book = await Book.findById(id)

      .populate(
        "bookCategory",
        "categoryName"
      );


    // =================================================
    // BOOK NOT FOUND
    // =================================================

    if (!book) {

      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }


    // =================================================
    // SUCCESS
    // =================================================

    return res.status(200).json({

      success: true,

      message:
        "Book fetched successfully",

      book,
    });


  } catch (error) {

    console.error(
      "Fetch Single Book Error:",
      error
    );


    if (error.name === "CastError") {

      return res.status(400).json({
        success: false,
        message: "Invalid book ID",
      });
    }


    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while fetching book",
      error: error.message,
    });
  }
};



// =====================================================
// UPDATE BOOK
// PDF IS OPTIONAL
// =====================================================

export const updateBook = async (
  req,
  res
) => {

  try {

    const { id } = req.params;


    const {
      bookTitle,
      bookDescription,
      bookCategory,
    } = req.body;


    // =================================================
    // FIND BOOK
    // =================================================

    const book = await Book.findById(id);


    if (!book) {

      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }


    // =================================================
    // UPDATE TITLE
    // =================================================

    if (bookTitle !== undefined) {

      if (!bookTitle.trim()) {

        return res.status(400).json({
          success: false,
          message:
            "Book title cannot be empty",
        });
      }


      // Check duplicate title

      const existingBook =
        await Book.findOne({

          bookTitle:
            bookTitle.trim(),

          _id: {
            $ne: id,
          },

        });


      if (existingBook) {

        return res.status(409).json({
          success: false,
          message:
            "Another book with this title already exists",
        });
      }


      book.bookTitle =
        bookTitle.trim();
    }



    // =================================================
    // UPDATE DESCRIPTION
    // =================================================

    if (
      bookDescription !== undefined
    ) {

      if (!bookDescription.trim()) {

        return res.status(400).json({
          success: false,
          message:
            "Book description cannot be empty",
        });
      }


      book.bookDescription =
        bookDescription.trim();
    }



    // =================================================
    // UPDATE CATEGORY
    // =================================================

    if (
      bookCategory !== undefined
    ) {

      // Remove category

      if (bookCategory === "") {

        book.bookCategory =
          undefined;

      }

      // Set category

      else {

        const category =
          await BookCategory.findById(
            bookCategory
          );


        if (!category) {

          return res.status(404).json({
            success: false,
            message:
              "Book category not found",
          });
        }


        book.bookCategory =
          bookCategory;
      }
    }



    // =================================================
    // UPDATE PDF
    // =================================================

    if (
      req.files?.bookPdf?.[0]
    ) {

      const newPdf =
        req.files.bookPdf[0];


      // ---------------------------------------------
      // Upload new PDF first
      // ---------------------------------------------

      const uploadedPdf =
        await uploadPdfToSupabase(

          newPdf.buffer,

          newPdf.originalname

        );


      // ---------------------------------------------
      // Store old PDF path
      // ---------------------------------------------

      const oldPdfPath =
        book.bookPdfPath;


      // ---------------------------------------------
      // Update MongoDB
      // ---------------------------------------------

      book.bookPdfUrl =
        uploadedPdf.publicUrl;

      book.bookPdfPath =
        uploadedPdf.filePath;


      await book.save();


      // ---------------------------------------------
      // Delete old PDF
      // ---------------------------------------------

      if (oldPdfPath) {

        await deletePdfFromSupabase(
          oldPdfPath
        );
      }


    } else {

      // No new PDF

      await book.save();
    }



    // =================================================
    // FETCH UPDATED BOOK
    // =================================================

    const updatedBook =
      await Book.findById(id)

        .populate(
          "bookCategory",
          "categoryName"
        );



    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({

      success: true,

      message:
        "Book updated successfully",

      book: updatedBook,
    });


  } catch (error) {

    console.error(
      "Update Book Error:",
      error
    );


    if (
      error.name === "CastError"
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Invalid book ID or category ID",
      });
    }


    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while updating book",
      error: error.message,
    });
  }
};



// =====================================================
// DELETE BOOK
// =====================================================

export const deleteBook = async (
  req,
  res
) => {

  try {

    const { id } = req.params;


    // =================================================
    // FIND BOOK
    // =================================================

    const book =
      await Book.findById(id);


    if (!book) {

      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }


    // =================================================
    // DELETE PDF FROM SUPABASE
    // =================================================

    if (book.bookPdfPath) {

      await deletePdfFromSupabase(
        book.bookPdfPath
      );
    }


    // =================================================
    // DELETE BOOK FROM MONGODB
    // =================================================

    await Book.findByIdAndDelete(id);


    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({

      success: true,

      message:
        "Book deleted successfully",
    });


  } catch (error) {

    console.error(
      "Delete Book Error:",
      error
    );


    if (
      error.name === "CastError"
    ) {

      return res.status(400).json({
        success: false,
        message: "Invalid book ID",
      });
    }


    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while deleting book",
      error: error.message,
    });
  }
};