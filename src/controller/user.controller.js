import User from "../models/user.model.js";
import hashPassword from "../services/hash.password.js";
import sendMail from "../utils/send.main.js";
import accountCreatedEmail from "../services/createAccount.email.js";


export const createUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      userType,
    } = req.body;

    if (!fullName || !email || !password || !userType) {
      return res.status(400).json({
        message:
          "Full name, email, password and user type are required",
      });
    }

    if (!["guest", "user", "admin"].includes(userType)) {
      return res.status(400).json({
        message: "Invalid user type",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingEmail = await User.findOne({
      email: normalizedEmail,
    });

    if (existingEmail) {
      return res.status(400).json({
        message: "User with the same email already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      userType,
    });

    try {
      await sendMail({
        to: user.email,
        subject: `User Created by Admin as ${user.userType}`,
        html: accountCreatedEmail(
          user.fullName,
          user.email,
          password,
          user.userType
        ),
      });

      console.log("Account creation email sent successfully");

    } catch (mailError) {
      console.log("Email sending failed:", mailError.message);
    }

    return res.status(201).json({
      message: "User Created Successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        userType: user.userType,
      },
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Something went wrong in create User API",
    });
  }
};


export const fetchAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search?.trim() || "";
    const userType = req.query.userType?.trim() || "";

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

    if (
      userType &&
      !["guest", "user", "admin"].includes(userType)
    ) {
      return res.status(400).json({
        message: "Invalid user type",
      });
    }

    const skip = (page - 1) * limit;

    const query = {};

    if (search) {
      query.$or = [
        {
          fullName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (userType) {
      query.userType = userType;
    }

    const totalUsers = await User.countDocuments(query);

    const totalPages = Math.ceil(totalUsers / limit);

    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (users.length === 0) {
      return res.status(404).json({
        message: search
          ? "No Users Found For This Search"
          : "No Users Found",
        users: [],
        pagination: {
          currentPage: page,
          limit,
          totalUsers,
          totalPages,
        },
        search,
        userType,
      });
    }

    return res.status(200).json({
      message: "All Users Fetched Successfully",
      users,
      pagination: {
        currentPage: page,
        limit,
        totalUsers,
        totalPages,
      },
      search,
      userType,
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Something went wrong while fetching users",
    });
  }
};


export const fetchSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      message: "User Fetched Successfully",
      user,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Something went wrong while fetching user",
    });
  }
};


// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, userType } = req.body;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "User ID is required",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User Not Found",
      });
    }

    // Update full name
    if (fullName !== undefined) {
      if (typeof fullName !== "string" || !fullName.trim()) {
        return res.status(400).json({
          status: false,
          message: "Full name cannot be empty",
        });
      }

      user.fullName = fullName.trim();
    }

    // Update email
    if (email !== undefined) {
      if (typeof email !== "string" || !email.trim()) {
        return res.status(400).json({
          status: false,
          message: "Email cannot be empty",
        });
      }

      const normalizedEmail = email.trim().toLowerCase();

      // Check whether ANOTHER user already has this email
      const existingEmail = await User.findOne({
        email: normalizedEmail,
        _id: { $ne: id },
      });

      if (existingEmail) {
        return res.status(400).json({
          status: false,
          message: "Another user with this email already exists",
        });
      }

      user.email = normalizedEmail;
    }

    // Update user type only if provided
    if (userType !== undefined) {
      user.userType = userType;
    }

    await user.save();

    return res.status(200).json({
      status: true,
      message: "Profile Updated Successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        userType: user.userType,
      },
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      status: false,
      message: "Something went wrong while updating profile",
      error: err.message,
    });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      message: "User Deleted Successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Something went wrong while deleting user",
    });
  }
};