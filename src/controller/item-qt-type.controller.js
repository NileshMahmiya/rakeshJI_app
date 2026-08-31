
import QuantityType from "../models/quantity-type.model.js";


export const createQuantityType = async (req, res) => {
  try {
    const {
      typeName,
      quantityShortForm,
    } = req.body;

   
    if (!typeName || !quantityShortForm) {
      return res.status(400).json({
        message:
          "Type name and quantity short form are required",
      });
    }

    
    const existingTypeName = await QuantityType.findOne({
      typeName: typeName.trim(),
    });

    if (existingTypeName) {
      return res.status(400).json({
        message: "Type name already exists",
      });
    }

   
    const existingShortForm =
      await QuantityType.findOne({
        quantityShortForm: quantityShortForm.trim(),
      });

    if (existingShortForm) {
      return res.status(400).json({
        message: "Quantity short form already exists",
      });
    }

   
    const quantityType = await QuantityType.create({
      typeName: typeName.trim(),
      quantityShortForm: quantityShortForm.trim(),
    });

    return res.status(201).json({
      message: "Quantity Type Created Successfully",
      quantityType,
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message:
        "Something went wrong while creating quantity type",
    });
  }
};




export const fetchAllQuantityTypes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const search = req.query.search?.trim() || "";

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

    const query = {};

    if (search) {
      query.$or = [
        {
          typeName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          quantityShortForm: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const totalQuantityType =
      await QuantityType.countDocuments(query);

    const totalPages = Math.ceil(
      totalQuantityType / limit
    );

    const quantityTypes =
      await QuantityType.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    if (quantityTypes.length === 0) {
      return res.status(404).json({
        message: search
          ? "No Quantity Types Found For This Search"
          : "No Quantity Types Found",
        quantityTypes: [],
        pagination: {
          currentPage: page,
          limit: limit,
          totalQuantityType: totalQuantityType,
          totalPages: totalPages,
        },
        search,
      });
    }

    return res.status(200).json({
      message:
        "All Quantity Types Fetched Successfully",
      quantityTypes,
      pagination: {
        currentPage: page,
        limit: limit,
        totalQuantityType: totalQuantityType,
        totalPages: totalPages,
      },
      search,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message:
        "Something went wrong while fetching quantity types",
    });
  }
};





export const fetchSingleQuantityType = async (req, res) => {
  try {
    const { id } = req.params;

    const quantityType = await QuantityType.findById(id);

    if (!quantityType) {
      return res.status(404).json({
        message: "Quantity Type Not Found",
      });
    }

    return res.status(200).json({
      message: "Quantity Type Fetched Successfully",
      quantityType,
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message:
        "Something went wrong while fetching quantity type",
    });
  }
};



export const updateQuantityType = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      typeName,
      quantityShortForm,
    } = req.body;

  
    const quantityType = await QuantityType.findById(id);

    if (!quantityType) {
      return res.status(404).json({
        message: "Quantity Type Not Found",
      });
    }

   
    if (typeName !== undefined) {
      const existingTypeName =
        await QuantityType.findOne({
          typeName: typeName.trim(),
          _id: { $ne: id },
        });

      if (existingTypeName) {
        return res.status(400).json({
          message: "Type name already exists",
        });
      }

      quantityType.typeName = typeName.trim();
    }

    if (quantityShortForm !== undefined) {
      const existingShortForm =
        await QuantityType.findOne({
          quantityShortForm:
            quantityShortForm.trim(),
          _id: { $ne: id },
        });

      if (existingShortForm) {
        return res.status(400).json({
          message:
            "Quantity short form already exists",
        });
      }

      quantityType.quantityShortForm =
        quantityShortForm.trim();
    }

    await quantityType.save();

    return res.status(200).json({
      message: "Quantity Type Updated Successfully",
      quantityType,
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message:
        "Something went wrong while updating quantity type",
    });
  }
};




export const deleteQuantityType = async (req, res) => {
  try {
    const { id } = req.params;

    const quantityType =
      await QuantityType.findById(id);

    if (!quantityType) {
      return res.status(404).json({
        message: "Quantity Type Not Found",
      });
    }

    await QuantityType.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Quantity Type Deleted Successfully",
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message:
        "Something went wrong while deleting quantity type",
    });
  }
};



export const createBulkQuantityTypes = async (req, res) => {
  try {
    const { quantityTypes } = req.body;

    // Check array
    if (!Array.isArray(quantityTypes)) {
      return res.status(400).json({
        message: "quantityTypes must be an array",
      });
    }

    if (quantityTypes.length === 0) {
      return res.status(400).json({
        message: "quantityTypes array cannot be empty",
      });
    }

    const validQuantityTypes = [];
    const skippedItems = [];

    // Remove duplicate entries from request itself
    const seenTypeNames = new Set();
    const seenShortForms = new Set();

    for (const item of quantityTypes) {
      const typeName = item?.typeName?.trim();
      const quantityShortForm =
        item?.quantityShortForm?.trim();

      // Validate fields
      if (!typeName || !quantityShortForm) {
        skippedItems.push({
          item,
          reason:
            "Type name and quantity short form are required",
        });

        continue;
      }

      // Duplicate inside same request
      if (
        seenTypeNames.has(typeName) ||
        seenShortForms.has(quantityShortForm)
      ) {
        skippedItems.push({
          typeName,
          quantityShortForm,
          reason: "Duplicate entry in request",
        });

        continue;
      }

      seenTypeNames.add(typeName);
      seenShortForms.add(quantityShortForm);

      validQuantityTypes.push({
        typeName,
        quantityShortForm,
      });
    }

    if (validQuantityTypes.length === 0) {
      return res.status(400).json({
        message: "No valid quantity types to create",
        createdQuantityTypes: [],
        skippedItems,
      });
    }

    // Check existing records in database
    const typeNames = validQuantityTypes.map(
      (item) => item.typeName
    );

    const shortForms = validQuantityTypes.map(
      (item) => item.quantityShortForm
    );

    const existingQuantityTypes =
      await QuantityType.find({
        $or: [
          {
            typeName: {
              $in: typeNames,
            },
          },
          {
            quantityShortForm: {
              $in: shortForms,
            },
          },
        ],
      });

    const existingTypeNames = new Set(
      existingQuantityTypes.map(
        (item) => item.typeName
      )
    );

    const existingShortForms = new Set(
      existingQuantityTypes.map(
        (item) => item.quantityShortForm
      )
    );

    // Only keep new records
    const newQuantityTypes = [];

    for (const item of validQuantityTypes) {
      if (existingTypeNames.has(item.typeName)) {
        skippedItems.push({
          typeName: item.typeName,
          quantityShortForm:
            item.quantityShortForm,
          reason: "Type name already exists",
        });

        continue;
      }

      if (
        existingShortForms.has(
          item.quantityShortForm
        )
      ) {
        skippedItems.push({
          typeName: item.typeName,
          quantityShortForm:
            item.quantityShortForm,
          reason:
            "Quantity short form already exists",
        });

        continue;
      }

      newQuantityTypes.push(item);
    }

    // Nothing new
    if (newQuantityTypes.length === 0) {
      return res.status(200).json({
        message:
          "No new quantity types were created",
        createdCount: 0,
        createdQuantityTypes: [],
        skippedCount: skippedItems.length,
        skippedItems,
      });
    }

    // Insert all new records
    const createdQuantityTypes =
      await QuantityType.insertMany(
        newQuantityTypes
      );

    return res.status(201).json({
      message:
        "Quantity Types Bulk Upload Completed Successfully",

      createdCount:
        createdQuantityTypes.length,

      createdQuantityTypes,

      skippedCount: skippedItems.length,

      skippedItems,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message:
        "Something went wrong while bulk uploading quantity types",
    });
  }
};

