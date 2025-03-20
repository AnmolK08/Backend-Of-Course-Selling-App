const { Router } = require("express");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { adminModel, courseModel } = require("../db");
const { adminMiddleware } = require("../Middlewares/admin");

// Define JWT secret key
const JWT_ADMIN_PASS = process.env.JWT_ADMIN_PASS;

adminRouter.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // Corrected the hashing process to use async/await
  const hashedPassword = await bcrypt.hash(password, 10);

  await adminModel.create({
    username,
    email,
    password: hashedPassword, // Corrected the property name
  });

  res.json({
    message: "User created successfully",
    user: {
      username,
      email,
    },
  });
});

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const newUser = await adminModel.findOne({ email });
  if (!newUser) {
    return res.status(401).json({ message: "Invalid email" });
  }

  const isMatch = await bcrypt.compare(password, newUser.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: newUser._id }, JWT_ADMIN_PASS, {
    expiresIn: "1h",
  });

  res.json({
    message: "Logged in successfully",
    token,
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
  });
});

adminRouter.post("/course", async (req, res) => {
  const adminId = req.userId;

  const { name, description, imageUrl, price } = req.body;

  const course = await courseModel.create({
    name: name,
    description: description,
    price: price,
    imageUrl: imageUrl,
    creatorId: adminId,
  });

  res.json({
    message: "Course created",
    courseId: course._id,
  });
});

adminRouter.put("/course", adminMiddleware, async function (req, res) {
  const adminId = req.userId;

  const { title, description, imageUrl, price, courseId } = req.body;

  const course = await courseModel.updateOne(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title: title,
      description: description,
      imageUrl: imageUrl,
      price: price,
    }
  );

  res.json({
    message: "Course updated",
    courseId: course._id,
  });
});

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
  const adminId = req.userId;

  const courses = await courseModel.find({
    creatorId: adminId,
  });

  res.json({
    message: "Course updated",
    courses,
  });
});

module.exports = {
  adminRouter: adminRouter,
};
