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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Habit", HabitSchema);
