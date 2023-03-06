const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  content: {
    type: String,
  },
  title: {
    type: String,
  },
});

module.exports = mongoose.model("File", FileSchema);
