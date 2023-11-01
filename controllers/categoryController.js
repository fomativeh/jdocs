const Category = require("../schemas/categorySchema"); // Import the Category model

module.exports = {
  newCategory: async (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, error: "Please provide a category name." });
    }

    try {
      const newCategory = new Category({ name });
      await newCategory.save();

      res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  allCategories: async (req, res) => {
    try {
      const allCategories = await Category.find();
      res.status(200).json({ success: true, data: allCategories[0].tags });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  editCategory: async (req, res) => {
    const categoryId = req.params.id;
    const { name } = req.body;

    try {
      const categoryExists = await Category.findById(categoryId);
      if (!categoryExists) {
        return res
          .status(404)
          .json({ success: false, error: "No category with that id." });
      }

      if (!name) {
        return res
          .status(400)
          .json({ success: false, error: "Category name is required for updates." });
      }

      categoryExists.name = name;
      await categoryExists.save();

      res.status(200).json({ success: true, data: categoryExists });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    const categoryId = req.params.id;

    try {
      const categoryExists = await Category.findById(categoryId);
      if (!categoryExists) {
        return res
          .status(404)
          .json({ success: false, error: "No category with that id." });
      }

      await categoryExists.deleteOne();

      res.status(200).json({ success: true, message: "Category deleted." });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};
