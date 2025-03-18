const { Router } = require("express");
const courseRouter = Router();

courseRouter.post("/purchase", (req, res) => {
  res.send("Course purchase page");
});
courseRouter.get("/preview", (req, res) => {
  res.send("Course preview page");
});

module.exports = {
  courseRouter: courseRouter
};
