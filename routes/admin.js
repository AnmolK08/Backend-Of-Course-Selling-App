const { Router } = require("express");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { adminModel } = require("../db");

// Define JWT secret key
const JWT_ADMIN_PASS = process.env.JWT_ADMIN_PASS;

adminRouter.post("/signup", async(req, res) => {
  const { username, email, password } = req.body;

  // Corrected the hashing process to use async/await
  const hashedPassword = await bcrypt.hash(password, 10);

  await adminModel.create({
    username,
    email,
    password: hashedPassword // Corrected the property name
  });

  res.json({
    message: "User created successfully",
    user: {
      username,
      email
    },
  });
});

adminRouter.post("/signin", async(req, res) => {
  const { email, password } = req.body;

  const newUser = await adminModel.findOne({ email });
  if (!newUser) {
    return res.status(401).json({ message: "Invalid email" });
  }

  const isMatch = await bcrypt.compare(password, newUser.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: newUser._id },
    JWT_ADMIN_PASS, 
    { expiresIn: "1h" }
  );

  res.json({
    message: "Logged in successfully",
    token
  });
});

// Removed the redundant routes that only send "Sign in page"

module.exports = {
  adminRouter: adminRouter
};
