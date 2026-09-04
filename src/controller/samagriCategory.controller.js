import mongoose from "mongoose";
import SamagriCategory from "../models/samagriCategory.model.js";

/**
 * Create Samagri Category
 */
export const createSamagriCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName || !categoryName.trim()) {
      return res.status(400).json({
        message: "Category name is required",
      });
    }

    const trimmedName = categoryName.trim();

    // Check duplicate category
    const existingCategory = await SamagriCategory.findOne({
      categoryName: trimmedName,
    });

    if (existingCategory) {
      return res.status(409).json({
        message: "Samagri category already exists",
      });
    }

    const category = await SamagriCategory.create({
      categoryName: trimmedName,
    });

    return res.status(201).json({
      message: "Samagri category created successfully",
      category,
    });
  } catch (error) {
    console.error("Create Samagri Category Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Samagri category already exists",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


/**
 * Get All Samagri Categories
 * Pagination + Search
 *
 * Example:
 * GET /api/v1/samagri-category?page=1&limit=10
 *
 * Search:
 * GET /api/v1/samagri-category?page=1&limit=10&search=पूजा
 */
export const getAllSamagriCategories = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    // Default values if invalid
    if (isNaN(page) || page < 1) {
      page = 1;
    }

    if (isNaN(limit) || limit < 1) {
      limit = 10;
    }

    // Optional maximum limit
    if (limit > 100) {
      limit = 100;
    }

    const skip = (page - 1) * limit;

    const filter = {};

    // Search category name
    if (search && search.trim()) {
      filter.categoryName = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    const [categories, totalCategories] = await Promise.all([
      SamagriCategory.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      SamagriCategory.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalCategories / limit);

    return res.status(200).json({
      message: "Samagri categories fetched successfully",

      categories,

      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalCategories,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Get All Samagri Categories Error:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


/**
 * Get One Samagri Category
 */
export const getSamagriCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid category ID",
      });
    }

    const category = await SamagriCategory.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Samagri category not found",
      });
    }

    return res.status(200).json({
      message: "Samagri category fetched successfully",
      category,
    });
  } catch (error) {
    console.error("Get Samagri Category Error:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


/**
 * Update Samagri Category
 */
export const updateSamagriCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid category ID",
      });
    }

    if (!categoryName || !categoryName.trim()) {
      return res.status(400).json({
        message: "Category name is required",
      });
    }

    const trimmedName = categoryName.trim();

    // Check category exists
    const category = await SamagriCategory.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Samagri category not found",
      });
    }

    // Check duplicate name
    const existingCategory = await SamagriCategory.findOne({
      categoryName: trimmedName,
      _id: { $ne: id },
    });

    if (existingCategory) {
      return res.status(409).json({
        message: "Samagri category already exists",
      });
    }

    category.categoryName = trimmedName;

    await category.save();

    return res.status(200).json({
      message: "Samagri category updated successfully",
      category,
    });
  } catch (error) {
    console.error("Update Samagri Category Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Samagri category already exists",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


/**
 * Delete Samagri Category
 */
export const deleteSamagriCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid category ID",
      });
    }

    const category = await SamagriCategory.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Samagri category not found",
      });
    }

    await SamagriCategory.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Samagri category deleted successfully",
    });
  } catch (error) {
    console.error("Delete Samagri Category Error:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};