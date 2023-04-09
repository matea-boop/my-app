const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    date: {
      type: String,
    },
    content: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", FileSchema);
