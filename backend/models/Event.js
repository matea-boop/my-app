const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true],
    trim: true,
    maxlength: [13],
  },
  actType: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  date: {
    type: String,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  description: {
    type: String,
  },
  // {timestamps: true}
});

module.exports = mongoose.model("Event", EventSchema);
