const { Router } = require("express");
const userRouter = Router();
const { userModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Define JWT secret key
const JWT_USER_PASS = process.env.JWT_USER_PASS;

userRouter.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  // Hash the password
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    username,
    email,
    password: hashPassword,
  });

  res.status(201).json({
    message: "User created successfully",
    user: {
      username,
      email,
    },
  });
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }
  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, JWT_USER_PASS, {
    expiresIn: "1h",
  });

  res.json({
    message: "User signed in successfully",
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

module.exports = {
  userRouter: userRouter,
};
