import Book from "../models/book.model.js";

import User from "../models/user.model.js";

import SamagriList from "../models/samagri.list.model.js";

export const adminHomeData = async (req, res) => {
  try {
    const [
      totalBook,
      totalUser,
      totalSamagriList
    ] = await Promise.all([
      Book.countDocuments(),
    
      User.countDocuments(),
      SamagriList.countDocuments()
    ]);

    return res.status(200).json({
      status: true,
      message: "Admin dashboard data fetched successfully",
      totalBook,
      
      totalUser,
     totalSamagriList
    });
  } catch (err) {
    console.error("Admin Dashboard Error:", err);

    return res.status(500).json({
      status: false,
      message: "Something went wrong in admin dashboard data API",
    });
  }
};
