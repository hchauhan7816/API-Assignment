const express = require("express");

const router = express.Router();
const User = require("../models/userModel");
const {
    viewUser,
    viewAllUsers,
    createUser,
    updateUser,
    deleteUser
} = require("../controller/userController");

// View user
router.get("/:id", viewUser);

// View all users
router.get("/", viewAllUsers);

// Create new users
router.post("/", createUser);

// Update user
router.patch("/:id", updateUser);

// Delete user
router.delete("/:id", deleteUser);

module.exports = router;
