import SamagriList from "../models/samagri.list.model.js";

export const addList = async (req, res) => {
  try {
    const {
      samagriListTitle,
      samagriListDescription,
      headers,
    } = req.body;

   
    if (
      !samagriListTitle ||
      !samagriListDescription ||
      !headers ||
      !Array.isArray(headers)
    ) {
      return res.status(400).json({
        status: false,
        message:
          "samagriListTitle, samagriListDescription and headers are required",
      });
    }

   
    const createList = await SamagriList.create({
      samagriListTitle: samagriListTitle.trim(),
      samagriListDescription: samagriListDescription.trim(),
      headers,
    });

    return res.status(201).json({
      status: true,
      message: "List Created Successfully",
      data: createList,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      status: false,
      message: "Something went wrong in Samagri List API",
    });
  }
};



export const fetchAllLists = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
    } = req.query;

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
      .populate("headers.samagriItems.item")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber)
      .populate({
    path: "headers.samagriItems.customQtType",
  })



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
    console.error("Fetch all samagri lists error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch samagri lists",
      error: error.message,
    });
  }
};

export const fetchSingleList = async (req, res) => {
  try {
    const { id } = req.params;

    const list = await SamagriList.findById(id).populate("headers.samagriItems.item").populate({
      path: "headers.samagriItems",
      populate: {
        path: "itemQtType",
        model: "QuantityType",
      },
    });

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
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch samagri list",
      error: error.message,
    });
  }
};
export const updateList = async (req, res) => {
  try {
    const id = req.params.id || req.query.id || req.body.id

    const {
      samagriListTitle,
      samagriListDescription,
      headers,
    } = req.body;

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
      list.headers = headers;
    }

    await list.save();

    return res.status(200).json({
      success: true,
      message: "Samagri list updated successfully",
      data: list,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update samagri list",
      error: error.message,
    });
  }
};

export const deleteList = async (req, res) => {
  try {
    const id = req.params.id || req.query.id || req.body.id

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
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete samagri list",
      error: error.message,
    });
  }
};