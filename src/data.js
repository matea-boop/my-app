// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const DataSchema = new Schema(
  {
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    subtasks: {
      type: Array,
    },
    status: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", DataSchema);
