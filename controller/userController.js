const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");

// Date format change function
const dateFormatChange = (inputDate) => {
  let newDateString = inputDate.split("-").reverse().join("-");
  return newDateString;
};

const dbDateFormatChange = (inputDate) => {
  return new Date(inputDate).toLocaleDateString("en-GB");
};

// View user
const viewUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json(createResponse(404, "Invalid Id", "Invalid id found", null));
  }

  try {
    const data = await User.findById(id);
    data.birthday = dbDateFormatChange(data.birthday);
    if (!data) {
      res
        .status(404)
        .json(createResponse(404, "Bad Id", "Id not found", false));
    } else {
      data.birthday = dbDateFormatChange(data.birthday);
      res.status(200).json(createResponse(200, "User found", false, data));
    }
  } catch (error) {
    res
      .status(400)
      .json(createResponse(400, "Bad Request", error.message, null));
  }
};

// View all users
const viewAllUsers = async (req, res) => {
  try {
    const data = await User.find({}).sort({ createdAt: -1 });
    data.map((user) => {
      user.birthday = dbDateFormatChange(user.birthday);
    });
    res.status(200).json(createResponse(200, "Users found", false, data));
  } catch (error) {
    res
      .status(400)
      .json(createResponse(400, "Bad Request", error.message, null));
  }
};

// Create new users
const createUser = async (req, res) => {
  try {
    req.body.birthday = dateFormatChange(req.body.birthday);
    const user = await User.create({ ...req.body });
    res
      .status(200)
      .json(createResponse(200, "User created successfully", false, user));
  } catch (error) {
    res
      .status(400)
      .json(createResponse(400, "Bad Request", error.message, null));
  }
};

// Update user
const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json(createResponse(404, "Invalid Id", "Invalid id found", null));
  }

  try {
    if (req.body.hasOwnProperty("birthday"))
      req.body.birthday = dateFormatChange(req.body.birthday);
    const data = await User.findByIdAndUpdate({ _id: id }, { ...req.body });
    if (!data) {
      res
        .status(404)
        .json(createResponse(404, "Bad Id", "Id not found", false));
    } else {
      res
        .status(200)
        .json(createResponse(200, "User updated successfully", false, data));
    }
  } catch (error) {
    res
      .status(400)
      .json(createResponse(400, "Bad Request", error.message, null));
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json(createResponse(404, "Invalid Id", "Invalid id found", null));
  }

  try {
    const data = await User.findByIdAndDelete({ _id: id }, { ...req.body });
    if (!data) {
      res
        .status(404)
        .json(createResponse(405, "Bad Id", "Id not found", false));
    } else {
      data.birthday = dbDateFormatChange(data.birthday);
      res
        .status(200)
        .json(createResponse(200, "User deleted successfully", false, data));
    }
  } catch (error) {
    res
      .status(400)
      .json(createResponse(400, "Bad Request", error.message, null));
  }
};

// Create Response
const createResponse = (code, message, error, data) => {
  return {
    code: code,
    message: message,
    error: error,
    data: data,
  };
};

module.exports = {
  viewUser,
  viewAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
