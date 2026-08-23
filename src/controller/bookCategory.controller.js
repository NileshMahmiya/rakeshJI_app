import BookCategory from "../models/bookCategory.model.js";

// CREATE CATEGORY
export const createBookCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    // Validation
    if (!categoryName || categoryName.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    // Check duplicate category
    const existingCategory = await BookCategory.findOne({
      categoryName: categoryName.trim(),
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await BookCategory.create({
      categoryName: categoryName.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Book category created successfully",
      data: category,
    });
  } catch (error) {
    console.error("Create Book Category Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// FETCH ALL CATEGORIES
export const getAllBookCategories = async (req, res) => {
  try {
    const { search } = req.query;

    // Create filter object
    const filter = {};

    // Search by category name
    if (search && search.trim()) {
      filter.categoryName = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    const categories = await BookCategory.find(filter).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Book categories fetched successfully",
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.error("Get All Book Categories Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// FETCH SINGLE CATEGORY
export const getBookCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await BookCategory.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Book category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book category fetched successfully",
      data: category,
    });
  } catch (error) {
    console.error("Get Book Category Error:", error);

    // Invalid MongoDB ObjectId
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// UPDATE CATEGORY
export const updateBookCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;

    // Validation
    if (!categoryName || categoryName.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    // Check duplicate category
    const existingCategory = await BookCategory.findOne({
      categoryName: categoryName.trim(),
      _id: { $ne: id },
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await BookCategory.findByIdAndUpdate(
      id,
      {
        categoryName: categoryName.trim(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Book category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book category updated successfully",
      data: category,
    });
  } catch (error) {
    console.error("Update Book Category Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// DELETE CATEGORY
export const deleteBookCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await BookCategory.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Book category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book category deleted successfully",
      data: category,
    });
  } catch (error) {
    console.error("Delete Book Category Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};