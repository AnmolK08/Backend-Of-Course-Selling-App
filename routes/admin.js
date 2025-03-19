const { Router } = require("express");
const adminRouter = Router();
const jwt = require("jwt");;
const bcrypt = require("bcrypt");

adminRouter.post("/signup", async(req, res) => {
  const { username, email, password } = req.body;

const hashedPassword = bcrypt.hash(password);

await adminModel.create({
  username,
  email,
  password : hashedPassword
})

  res.json({
    message: "User created successfully",
    user: {
      username,
      email
    },
  });
});

adminRouter.post("/signin", async(req, res) => {

  const { email, password } = req.body;;

  const newUser = await adminModel.findOne({ email: email});
  if (!newUser) {
    return res.status(401).json({ message: "Invalid email" });
  }

  const isMatch = await bcrypt.compare(password, newUser.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  
  const token = jwt.sign(
    { id: newUser._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Logged in successfully",
    token
  });
});



adminRouter.post("/course", (req, res) => {
    res.send("Sign in page");
  });

  adminRouter.put("/course", (req, res) => {
    res.send("Sign in page");
  });
  adminRouter.get("/course/bulk", (req, res) => {
    res.send("Sign in page");
  });

module.exports = {
  adminRouter: adminRouter
};
