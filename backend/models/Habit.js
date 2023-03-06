const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema(
  {
    target: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Habit", HabitSchema);
