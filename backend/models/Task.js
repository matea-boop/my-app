const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Must provide title"],
    trim: true,
    maxlength: [15, "Title cannot be more than 15 characters"],
  },
  subtasks: {
    type: Array,
  },
  status: {
    type: Boolean,
    default: false,
  },
  date: {
    type: String,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
