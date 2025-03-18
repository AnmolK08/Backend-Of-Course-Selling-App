const { Router } = require("express");
const adminRouter = Router();

adminRouter.post("/signin", (req, res) => {
  res.send("Sign in page");
});

adminRouter.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  res.json({
    message: "User created successfully",
    user: {
      username,
      email,
      password,
    },
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
