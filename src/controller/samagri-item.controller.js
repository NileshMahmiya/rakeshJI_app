import mongoose from "mongoose";
import SamagriItems from "../models/samagri-item.model.js";
import QuantityType from "../models/quantity-type.model.js";

// ======================================================
// CREATE SAMAGRI ITEM
// Only itemName is required
// ======================================================

export const createSamagriItem = async (req, res) => {
  try {
    const { itemName, itemQtType, itemQuantity } = req.body;

    if (!itemName || !itemName.trim()) {
      return res.status(400).json({
        message: "Item name is required",
      });
    }

    const trimmedItemName = itemName.trim();

    const existingItem = await SamagriItems.findOne({
      itemName: { $regex: new RegExp(`^${trimmedItemName}$`, 'i') },
    });

    if (existingItem) {
      return res.status(200).json({
        message: "Item already exists",
        samagriItem: existingItem,
      });
    }

    const newItemData = {
      itemName: trimmedItemName,
    };

    if (itemQtType && mongoose.Types.ObjectId.isValid(itemQtType)) {
      newItemData.itemQtType = itemQtType;
    }

    if (itemQuantity !== undefined && itemQuantity !== null && String(itemQuantity).trim() !== "") {
      newItemData.itemQuantity = String(itemQuantity).trim();
    }

    const samagriItem = await SamagriItems.create(newItemData);

    return res.status(201).json({
      message: "Samagri Item Created Successfully",
      samagriItem,
    });
  } catch (err) {
    console.error("createSamagriItem error:", err);
    if (err.code === 11000) {
      const existing = await SamagriItems.findOne({ itemName: req.body.itemName.trim() });
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
// Supports:
// ?page=1
// ?limit=10
// ?search=rice
// ======================================================

export const fetchAllSamagriItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2000;

    const search = req.query.search?.trim() || "";

    // ------------------------------------------
    // Validate pagination
    // ------------------------------------------

    if (page < 1) {
      return res.status(400).json({
        message: "Page must be greater than 0",
      });
    }

    if (limit < 1) {
      return res.status(400).json({
        message: "Limit must be greater than 0",
      });
    }

    const skip = (page - 1) * limit;

    // ------------------------------------------
    // Search query
    // ------------------------------------------

    const query = {};

    if (search) {
      query.itemName = {
        $regex: search,
        $options: "i",
      };
    }

    // ------------------------------------------
    // Count total
    // ------------------------------------------

    const totalSamagriItems =
      await SamagriItems.countDocuments(query);

    const totalPages =
      Math.ceil(totalSamagriItems / limit);

    // ------------------------------------------
    // Fetch items
    // ------------------------------------------

    const samagriItems =
      await SamagriItems.find(query)
        .populate(
          "itemQtType",
          "typeName quantityShortForm"
        )
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    // ------------------------------------------
    // No data
    // ------------------------------------------

    if (samagriItems.length === 0) {
      return res.status(200).json({
        message: search
          ? "No Samagri Items Found For This Search"
          : "No Samagri Items Found",

        samagriItems: [],

        pagination: {
          currentPage: page,
          limit,
          totalSamagriItems,
          totalPages,
        },

        search,
      });
    }

    // ------------------------------------------
    // Success
    // ------------------------------------------

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
    console.log(err);

    return res.status(500).json({
      message:
        "Something went wrong while fetching samagri items",
    });
  }
};


// ======================================================
// FETCH SINGLE SAMAGRI ITEM
// ======================================================

export const fetchSingleSamagriItem = async (req, res) => {
  try {
    const { id } = req.params;

    // ------------------------------------------
    // Validate ID
    // ------------------------------------------

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Samagri Item ID",
      });
    }

    // ------------------------------------------
    // Find item
    // ------------------------------------------

    const samagriItem =
      await SamagriItems.findById(id).populate(
        "itemQtType",
        "typeName quantityShortForm"
      );

    if (!samagriItem) {
      return res.status(404).json({
        message: "Samagri Item Not Found",
      });
    }

    return res.status(200).json({
      message: "Samagri Item Fetched Successfully",
      samagriItem,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message:
        "Something went wrong while fetching samagri item",
    });
  }
};


// ======================================================
// UPDATE SAMAGRI ITEM
//
// All fields are OPTIONAL.
//
// You can update:
// itemName
// itemQtType
// itemQuantity
//
// You can also remove quantity/type by sending null.
// ======================================================

export const updateSamagriItem = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      itemName,
      itemQtType,
      itemQuantity,
    } = req.body;

    // ------------------------------------------
    // Validate ID
    // ------------------------------------------

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Samagri Item ID",
      });
    }

    // ------------------------------------------
    // Find item
    // ------------------------------------------

    const samagriItem =
      await SamagriItems.findById(id);

    if (!samagriItem) {
      return res.status(404).json({
        message: "Samagri Item Not Found",
      });
    }

    // ------------------------------------------
    // Update item name
    // ------------------------------------------

    if (itemName !== undefined) {
      if (!itemName || !itemName.trim()) {
        return res.status(400).json({
          message: "Item name cannot be empty",
        });
      }

      const trimmedItemName = itemName.trim();

      const existingItem =
        await SamagriItems.findOne({
          itemName: trimmedItemName,
          _id: { $ne: id },
        });

      if (existingItem) {
        return res.status(400).json({
          message: "Samagri item already exists",
        });
      }

      samagriItem.itemName = trimmedItemName;
    }

    // ------------------------------------------
    // Update quantity type
    //
    // null = remove quantity type
    // ------------------------------------------

    if (itemQtType !== undefined) {
      if (itemQtType === null || itemQtType === "") {
        samagriItem.itemQtType = undefined;
      } else {
        if (!mongoose.Types.ObjectId.isValid(itemQtType)) {
          return res.status(400).json({
            message: "Invalid quantity type ID",
          });
        }

        const quantityType =
          await QuantityType.findById(itemQtType);

        if (!quantityType) {
          return res.status(404).json({
            message: "Quantity type not found",
          });
        }

        samagriItem.itemQtType = itemQtType;
      }
    }

    // ------------------------------------------
    // Update quantity
    //
    // null / empty string = remove quantity
    // ------------------------------------------

    if (itemQuantity !== undefined) {
      if (
        itemQuantity === null ||
        itemQuantity === ""
      ) {
        samagriItem.itemQuantity = undefined;
      } else {
        samagriItem.itemQuantity =
          String(itemQuantity).trim();
      }
    }

    // ------------------------------------------
    // Save
    // ------------------------------------------

    await samagriItem.save();

    // ------------------------------------------
    // Return populated data
    // ------------------------------------------

    await samagriItem.populate(
      "itemQtType",
      "typeName quantityShortForm"
    );

    return res.status(200).json({
      message: "Samagri Item Updated Successfully",
      samagriItem,
    });
  } catch (err) {
    console.log(err);

    if (err.code === 11000) {
      return res.status(400).json({
        message: "Samagri item already exists",
      });
    }

    return res.status(500).json({
      message:
        "Something went wrong while updating samagri item",
    });
  }
};


// ======================================================
// DELETE SAMAGRI ITEM
// ======================================================

export const deleteSamagriItem = async (req, res) => {
  try {
    const { id } = req.params;

    // ------------------------------------------
    // Validate ID
    // ------------------------------------------

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Samagri Item ID",
      });
    }

    // ------------------------------------------
    // Find item
    // ------------------------------------------

    const samagriItem =
      await SamagriItems.findById(id);

    if (!samagriItem) {
      return res.status(404).json({
        message: "Samagri Item Not Found",
      });
    }

    // ------------------------------------------
    // Delete
    // ------------------------------------------

    await SamagriItems.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Samagri Item Deleted Successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message:
        "Something went wrong while deleting samagri item",
    });
  }
};



export const createMultipleSamagriItems = async (req, res) => {
  try {
    const { itemNames } = req.body;

    // ------------------------------------------
    // Validate array
    // ------------------------------------------

    if (!Array.isArray(itemNames)) {
      return res.status(400).json({
        message: "itemNames must be an array",
      });
    }

    if (itemNames.length === 0) {
      return res.status(400).json({
        message: "itemNames array cannot be empty",
      });
    }

    // ------------------------------------------
    // Clean item names
    // Remove empty values
    // Remove duplicates from request
    // ------------------------------------------

    const cleanedNames = [
      ...new Set(
        itemNames
          .filter(
            (item) =>
              typeof item === "string" &&
              item.trim() !== ""
          )
          .map((item) => item.trim())
      ),
    ];

    if (cleanedNames.length === 0) {
      return res.status(400).json({
        message: "No valid item names found",
      });
    }

    // ------------------------------------------
    // Check which items already exist
    // ------------------------------------------

    const existingItems = await SamagriItems.find({
      itemName: { $in: cleanedNames },
    }).select("itemName");

    const existingNames = new Set(
      existingItems.map((item) => item.itemName)
    );

    // ------------------------------------------
    // Only create new items
    // ------------------------------------------

    const newItemNames = cleanedNames.filter(
      (name) => !existingNames.has(name)
    );

    // ------------------------------------------
    // If all items already exist
    // ------------------------------------------

    if (newItemNames.length === 0) {
      return res.status(400).json({
        message: "All Samagri items already exist",

        createdItems: [],

        alreadyExistingItems: [
          ...existingNames,
        ],
      });
    }

    // ------------------------------------------
    // Create multiple items
    // ------------------------------------------

    const itemsToCreate = newItemNames.map(
      (itemName) => ({
        itemName,
      })
    );

    const createdItems =
      await SamagriItems.insertMany(
        itemsToCreate
      );

    // ------------------------------------------
    // Response
    // ------------------------------------------

    return res.status(201).json({
      message:
        "Samagri Items Created Successfully",

      createdItems,

      alreadyExistingItems: [
        ...existingNames,
      ],

      totalCreated: createdItems.length,

      totalAlreadyExisting:
        existingNames.size,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message:
        "Something went wrong while creating samagri items",
    });
  }
};