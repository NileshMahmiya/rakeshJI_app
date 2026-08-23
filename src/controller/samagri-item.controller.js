
import SamagriItems from "../models/samagri-item.model.js";
import QuantityType from "../models/quantity-type.model.js";



export const createSamagriItem = async (req, res) => {
  try {
    const {
      itemName,
      itemQtType,
      itemQuantity,
    } = req.body;

  
    if (!itemName || !itemQtType || !itemQuantity) {
      return res.status(400).json({
        message:
          "Item name, quantity type and quantity are required",
      });
    }

   
    const existingItem = await SamagriItems.findOne({
      itemName: itemName.trim(),
    });

    if (existingItem) {
      return res.status(400).json({
        message: "Samagri item already exists",
      });
    }

   
    const quantityType = await QuantityType.findById(
      itemQtType
    );

    if (!quantityType) {
      return res.status(404).json({
        message: "Quantity type not found",
      });
    }

  
    const samagriItem = await SamagriItems.create({
      itemName: itemName.trim(),
      itemQtType,
      itemQuantity: itemQuantity.trim(),
    });

    return res.status(201).json({
      message: "Samagri Item Created Successfully",
      samagriItem,
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message:
        "Something went wrong while creating samagri item",
    });
  }
};







export const fetchAllSamagriItems = async (req, res) => {
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
      query.itemName = {
        $regex: search,
        $options: "i",
      };
    }

  

    const totalSamagriItems =
      await SamagriItems.countDocuments(query);

    const totalPages =
      Math.ceil(totalSamagriItems / limit);

 
    const samagriItems =
      await SamagriItems.find(query)
        .populate(
          "itemQtType",
          "typeName quantityShortForm"
        )
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

 

    if (samagriItems.length === 0) {
      return res.status(404).json({
        message: search
          ? "No Samagri Items Found For This Search"
          : "No Samagri Items Found",

        samagriItems: [],

        pagination: {
          currentPage: page,
          limit: limit,
          totalSamagriItems: totalSamagriItems,
          totalPages: totalPages,
        },
      });
    }


    return res.status(200).json({
      message:
        "Samagri Items Fetched Successfully",

      samagriItems,

      pagination: {
        currentPage: page,
        limit: limit,
        totalSamagriItems: totalSamagriItems,
        totalPages: totalPages,
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




export const fetchSingleSamagriItem = async (req, res) => {
  try {
    const { id } = req.params;

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
      message:
        "Samagri Item Fetched Successfully",
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




export const updateSamagriItem = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      itemName,
      itemQtType,
      itemQuantity,
    } = req.body;

    // Find item
    const samagriItem =
      await SamagriItems.findById(id);

    if (!samagriItem) {
      return res.status(404).json({
        message: "Samagri Item Not Found",
      });
    }


    if (itemName !== undefined) {
      const existingItem =
        await SamagriItems.findOne({
          itemName: itemName.trim(),
          _id: { $ne: id },
        });

      if (existingItem) {
        return res.status(400).json({
          message: "Samagri item already exists",
        });
      }

      samagriItem.itemName =
        itemName.trim();
    }

    if (itemQtType !== undefined) {
      const quantityType =
        await QuantityType.findById(
          itemQtType
        );

      if (!quantityType) {
        return res.status(404).json({
          message: "Quantity type not found",
        });
      }

      samagriItem.itemQtType =
        itemQtType;
    }


    if (itemQuantity !== undefined) {
      samagriItem.itemQuantity =
        itemQuantity.trim();
    }

    await samagriItem.save();

    return res.status(200).json({
      message:
        "Samagri Item Updated Successfully",
      samagriItem,
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message:
        "Something went wrong while updating samagri item",
    });
  }
};


export const deleteSamagriItem = async (req, res) => {
  try {
    const { id } = req.params;

    const samagriItem =
      await SamagriItems.findById(id);

    if (!samagriItem) {
      return res.status(404).json({
        message: "Samagri Item Not Found",
      });
    }

    await SamagriItems.findByIdAndDelete(id);

    return res.status(200).json({
      message:
        "Samagri Item Deleted Successfully",
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message:
        "Something went wrong while deleting samagri item",
    });
  }
};

