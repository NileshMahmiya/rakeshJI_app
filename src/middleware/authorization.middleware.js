const authorization = async (req, res, next) => {
  try {
    if (req.user.userType !== "admin") {
      return res.status(401).json({
        message: "Unauthorized",
        status: false,
      });
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Something Went Wrong in authorization ",
      status: false,
    });
  }
};

export default authorization