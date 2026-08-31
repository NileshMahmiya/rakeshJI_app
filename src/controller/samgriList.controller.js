import mongoose from "mongoose";
import SamagriList from "../models/samagri.list.model.js";

// Helper to sanitize incoming headers
const sanitizeHeaders = (headers) => {
  if (!Array.isArray(headers)) return [];

  return headers.map((h) => ({
    headerTitle: h.headerTitle ? String(h.headerTitle).trim() : "सामग्री",
    samagriItems: (h.samagriItems || [])
      .filter((itm) => itm && itm.item && mongoose.Types.ObjectId.isValid(itm.item))
      .map((itm) => {
        const rawQtType = itm.customQtType?.toString().trim();
        return {
          item: itm.item,
          customQuantity: itm.customQuantity ? String(itm.customQuantity).trim() : "",
          customQtType:
            rawQtType && mongoose.Types.ObjectId.isValid(rawQtType)
              ? rawQtType
              : null,
        };
      }),
  }));
};

// ======================================================
// ADD LIST
// ======================================================
export const addList = async (req, res) => {
  try {
    const { samagriListTitle, samagriListDescription, headers } = req.body;

    if (!samagriListTitle || !samagriListDescription || !Array.isArray(headers)) {
      return res.status(400).json({
        status: false,
        message: "samagriListTitle, samagriListDescription and headers are required",
      });
    }

    const sanitizedHeaders = sanitizeHeaders(headers);

    const createList = await SamagriList.create({
      samagriListTitle: samagriListTitle.trim(),
      samagriListDescription: samagriListDescription.trim(),
      headers: sanitizedHeaders,
    });

    return res.status(201).json({
      status: true,
      message: "List Created Successfully",
      data: createList,
    });
  } catch (err) {
    console.error("addList error:", err);
    return res.status(500).json({
      status: false,
      message: err.message || "Something went wrong in Samagri List API",
    });
  }
};

// ======================================================
// FETCH ALL LISTS
// ======================================================
export const fetchAllLists = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const pageNumber = Math.max(parseInt(page), 1);
    const limitNumber = Math.max(parseInt(limit), 1);
    const skip = (pageNumber - 1) * limitNumber;

    const filter = {};

    if (search.trim()) {
      filter.$or = [
        {
          samagriListTitle: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          samagriListDescription: {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];
    }

    const totalLists = await SamagriList.countDocuments(filter);

    const lists = await SamagriList.find(filter)
      .populate("headers.samagriItems.item", "itemName")
      .populate("headers.samagriItems.customQtType", "typeName quantityShortForm")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    const totalPages = Math.ceil(totalLists / limitNumber);

    return res.status(200).json({
      success: true,
      message: "Samagri lists fetched successfully",
      data: {
        lists,
        pagination: {
          totalLists,
          totalPages,
          currentPage: pageNumber,
          limit: limitNumber,
          hasNextPage: pageNumber < totalPages,
          hasPreviousPage: pageNumber > 1,
        },
      },
    });
  } catch (error) {
    console.error("fetchAllLists error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch samagri lists",
      error: error.message,
    });
  }
};

// ======================================================
// FETCH SINGLE LIST
// ======================================================
export const fetchSingleList = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Samagri List ID",
      });
    }

    const list = await SamagriList.findById(id)
      .populate("headers.samagriItems.item", "itemName")
      .populate("headers.samagriItems.customQtType", "typeName quantityShortForm");

    if (!list) {
      return res.status(404).json({
        success: false,
        message: "Samagri list not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Samagri list fetched successfully",
      data: list,
    });
  } catch (error) {
    console.error("fetchSingleList error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch samagri list",
      error: error.message,
    });
  }
};

// ======================================================
// UPDATE LIST
// ======================================================
export const updateList = async (req, res) => {
  try {
    const id = req.params.id || req.query.id || req.body.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Samagri List ID",
      });
    }

    const { samagriListTitle, samagriListDescription, headers } = req.body;
    const list = await SamagriList.findById(id);

    if (!list) {
      return res.status(404).json({
        success: false,
        message: "Samagri list not found",
      });
    }

    if (samagriListTitle !== undefined) {
      list.samagriListTitle = samagriListTitle.trim();
    }

    if (samagriListDescription !== undefined) {
      list.samagriListDescription = samagriListDescription.trim();
    }

    if (headers !== undefined) {
      list.headers = sanitizeHeaders(headers);
    }

    await list.save();

    return res.status(200).json({
      success: true,
      message: "Samagri list updated successfully",
      data: list,
    });
  } catch (error) {
    console.error("updateList error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update samagri list",
      error: error.message,
    });
  }
};

// ======================================================
// DELETE LIST
// ======================================================
export const deleteList = async (req, res) => {
  try {
    const id = req.params.id || req.query.id || req.body.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Samagri List ID",
      });
    }

    const list = await SamagriList.findByIdAndDelete(id);

    if (!list) {
      return res.status(404).json({
        success: false,
        message: "Samagri list not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Samagri list deleted successfully",
    });
  } catch (error) {
    console.error("deleteList error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete samagri list",
      error: error.message,
    });
  }
};