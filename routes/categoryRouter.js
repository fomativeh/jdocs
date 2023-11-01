const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controllers/categoryController"); // Import the Category controller

categoryRouter
  .post("/", categoryController.newCategory)
  .get("/", categoryController.allCategories)
  .put("/:id", categoryController.editCategory)
  .delete("/:id", categoryController.deleteCategory);

module.exports = categoryRouter;
