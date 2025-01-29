const express = require("express");
const { body } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name Required"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should content at least 6 characters"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").notEmpty().withMessage("Password Required"),
  ],
  loginUser
);

module.exports = router;
