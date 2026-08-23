
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
    const limit = parseInt(req.query.limit) || 10;
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

