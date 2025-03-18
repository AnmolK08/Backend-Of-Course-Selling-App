const { Router } = require("express");
const userRouter = Router();

userRouter.post("/signin", (req, res) => {
  res.send("Sign in page");
});

userRouter.post("/signup", (req, res) => {
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

module.exports = {
  userRouter: userRouter
};
