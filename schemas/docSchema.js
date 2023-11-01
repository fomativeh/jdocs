const { Schema, model } = require("mongoose");

const docSchema = new Schema(
  {
    title: String,
    category: String,
  },
  { timestamps: true }
);

const JDoc = model("JDoc", docSchema);
module.exports = JDoc