const mongoose = require("mongoose");

const DeadlineSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
    },
    deadlineTime: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deadline", DeadlineSchema);
