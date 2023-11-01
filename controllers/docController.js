const Category = require("../schemas/categorySchema");
const JDoc = require("../schemas/docSchema");

module.exports = {
  newDoc: async (req, res) => {
    const { title, category } = req.body;
    if (!title || !category) {
      return res
        .status(404)
        .json({ success: false, error: "Please provide all document data." });
    }

    try {
      const categoryDocument = await Category.findOne({});
      if (categoryDocument) {
        const { tags } = categoryDocument;
        if (!tags.includes(category)) {
          tags.push(category); // Add the new category tag
          await categoryDocument.save();
        }
      } else {
        const newCategory = new Category({ tags: [category] });
        await newCategory.save();
      }

      const newDoc = new JDoc({ title, category });
      await newDoc.save();

      res.status(201).json({ success: true, data: newDoc });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  },

  allDoc: async (req, res) => {
    try {
      const allDocs = await JDoc.find();
      const allCategories = await Category.find();
      res
        .status(200)
        .json({
          success: true,
          data: { documents: allDocs, categories: allCategories[0].tags },
        });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  },

  editDoc: async (req, res) => {
    const docId = req.params.id;
    const { title } = req.body;
    try {
      const docExists = await JDoc.findById(docId);
      if (!docExists) {
        return res
          .status(404)
          .json({ success: false, error: "No doc with that id." });
      }

      if (!title) {
        return res
          .status(400)
          .json({ success: false, error: "Title is required for updates." });
      }

      docExists.title = title;
      await docExists.save();

      res.status(200).json({ success: true, data: docExists });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  },

  deleteDoc: async (req, res) => {
    const docId = req.params.id;
    if (!docId) {
      return res
        .status(404)
        .json({ success: false, error: "Doc id is required." });
    }

    try {
      const docExists = await JDoc.findById(docId);
      if (!docExists) {
        return res
          .status(404)
          .json({ success: false, error: "No doc with that id." });
      }

      await docExists.deleteOne();

      res.status(200).json({ success: true, message: "Doc deleted." });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};
