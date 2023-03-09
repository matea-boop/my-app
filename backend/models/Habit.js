const mongoose = require("mongoose");

const CheckboxSchema = new mongoose.Schema({});

const HabitSchema = new mongoose.Schema(
  {
    target: {
      type: String,
    },
    title: {
      type: String,
    },
    checkboxes: {
      type: Array,
    },
    weekStart: {
      type: String,
    },
    weekEnd: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Habit", HabitSchema);
