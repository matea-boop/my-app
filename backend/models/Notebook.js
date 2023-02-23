const mongoose = require("mongoose");

const NotebookSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  content: {
    type: String,
  },
  numberOfWords: {
    type: Number,
  },
});

module.exports = mongoose.model("Notebook", NotebookSchema);
