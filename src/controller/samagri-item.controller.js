import mongoose from "mongoose";
import SamagriItems from "../models/samagri-item.model.js";

// ======================================================
// CREATE SINGLE SAMAGRI ITEM
// ======================================================
export const createSamagriItem = async (req, res) => {
  try {
    const { itemName } = req.body;

    if (!itemName || !itemName.trim()) {
      return res.status(400).json({
        message: "Item name is required",
      });
    }

    const trimmedItemName = itemName.trim();

    const existingItem = await SamagriItems.findOne({
      itemName: { $regex: new RegExp(`^${trimmedItemName}$`, "i") },
    });

    if (existingItem) {
      return res.status(200).json({
        message: "Item already exists",
        samagriItem: existingItem,
      });
    }

    const samagriItem = await SamagriItems.create({
      itemName: trimmedItemName,
    });

    return res.status(201).json({
      message: "Samagri Item Created Successfully",
      samagriItem,
    });
  } catch (err) {
    console.error("createSamagriItem error:", err);
    if (err.code === 11000) {
      const existing = await SamagriItems.findOne({
        itemName: req.body.itemName.trim(),
      });
      return res.status(200).json({
        message: "Item already exists",
        samagriItem: existing,
      });
    }

    return res.status(500).json({
      message: err.message || "Something went wrong while creating samagri item",
    });
  }
};

// ======================================================
// FETCH ALL SAMAGRI ITEMS
// ======================================================
export const fetchAllSamagriItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2000;
    const search = req.query.search?.trim() || "";

    if (page < 1) {
      return res.status(400).json({ message: "Page must be greater than 0" });
    }
    if (limit < 1) {
      return res.status(400).json({ message: "Limit must be greater than 0" });
    }

    const skip = (page - 1) * limit;
    const query = {};

    if (search) {
      query.itemName = {
        $regex: search,
        $options: "i",
      };
    }

    const totalSamagriItems = await SamagriItems.countDocuments(query);
    const totalPages = Math.ceil(totalSamagriItems / limit);

    const samagriItems = await SamagriItems.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Samagri Items Fetched Successfully",
      samagriItems,
      pagination: {
        currentPage: page,
        limit,
        totalSamagriItems,
        totalPages,
      },
      search,
    });
  } catch (err) {
    console.error("fetchAllSamagriItems error:", err);
    return res.status(500).json({
      message: "Something went wrong while fetching samagri items",
    });
  }
};

// ======================================================
// FETCH SINGLE SAMAGRI ITEM
// ======================================================
export const fetchSingleSamagriItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Samagri Item ID" });
    }

    const samagriItem = await SamagriItems.findById(id);

    if (!samagriItem) {
      return res.status(404).json({ message: "Samagri Item Not Found" });
    }

    return res.status(200).json({
      message: "Samagri Item Fetched Successfully",
      samagriItem,
    });
  } catch (err) {
    console.error("fetchSingleSamagriItem error:", err);
    return res.status(500).json({
      message: "Something went wrong while fetching samagri item",
    });
  }
};

// ======================================================
// UPDATE SAMAGRI ITEM
// ======================================================
export const updateSamagriItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { itemName } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Samagri Item ID" });
    }

    const samagriItem = await SamagriItems.findById(id);

    if (!samagriItem) {
      return res.status(404).json({ message: "Samagri Item Not Found" });
    }

    if (itemName !== undefined) {
      if (!itemName || !itemName.trim()) {
        return res.status(400).json({ message: "Item name cannot be empty" });
      }

      const trimmedItemName = itemName.trim();
      const existingItem = await SamagriItems.findOne({
        itemName: trimmedItemName,
        _id: { $ne: id },
      });

      if (existingItem) {
        return res.status(400).json({ message: "Samagri item already exists" });
      }

      samagriItem.itemName = trimmedItemName;
    }

    await samagriItem.save();

    return res.status(200).json({
      message: "Samagri Item Updated Successfully",
      samagriItem,
    });
  } catch (err) {
    console.error("updateSamagriItem error:", err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "Samagri item already exists" });
    }

    return res.status(500).json({
      message: "Something went wrong while updating samagri item",
    });
  }
};

// ======================================================
// DELETE SAMAGRI ITEM
// ======================================================
export const deleteSamagriItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Samagri Item ID" });
    }

    const samagriItem = await SamagriItems.findById(id);

    if (!samagriItem) {
      return res.status(404).json({ message: "Samagri Item Not Found" });
    }

    await SamagriItems.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Samagri Item Deleted Successfully",
    });
  } catch (err) {
    console.error("deleteSamagriItem error:", err);
    return res.status(500).json({
      message: "Something went wrong while deleting samagri item",
    });
  }
};

// ======================================================
// BULK CREATE SAMAGRI ITEMS
// ======================================================
export const createMultipleSamagriItems = async (req, res) => {
  try {
    const { itemNames } = req.body;

    if (!Array.isArray(itemNames) || itemNames.length === 0) {
      return res.status(400).json({
        message: "itemNames must be a non-empty array",
      });
    }

    const cleanedNames = [
      ...new Set(
        itemNames
          .filter((item) => typeof item === "string" && item.trim() !== "")
          .map((item) => item.trim())
      ),
    ];

    if (cleanedNames.length === 0) {
      return res.status(400).json({ message: "No valid item names found" });
    }

    const existingItems = await SamagriItems.find({
      itemName: { $in: cleanedNames },
    }).select("itemName");

    const existingNames = new Set(existingItems.map((item) => item.itemName));
    const newItemNames = cleanedNames.filter((name) => !existingNames.has(name));

    if (newItemNames.length === 0) {
      return res.status(200).json({
        message: "All items already exist",
        createdItems: [],
        alreadyExistingItems: [...existingNames],
      });
    }

    const itemsToCreate = newItemNames.map((itemName) => ({ itemName }));
    const createdItems = await SamagriItems.insertMany(itemsToCreate);

    return res.status(201).json({
      message: "Samagri Items Created Successfully",
      createdItems,
      alreadyExistingItems: [...existingNames],
      totalCreated: createdItems.length,
      totalAlreadyExisting: existingNames.size,
    });
  } catch (err) {
    console.error("createMultipleSamagriItems error:", err);
    return res.status(500).json({
      message: "Something went wrong while creating samagri items",
    });
  }
};