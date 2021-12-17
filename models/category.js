const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  url: {
    type: String,
  },
});

module.exports = mongoose.model("category", categorySchema);
