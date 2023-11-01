const express = require("express");
const docController = require("../controllers/docController");
const docRouter = express.Router();

docRouter
  .get("/", docController.allDoc)
  .post("/", docController.newDoc)
  .put("/:id", docController.editDoc)
  .delete("/:id", docController.deleteDoc);

module.exports = docRouter;
