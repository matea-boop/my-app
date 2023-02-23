const express = require("express");
const router = express.Router();
const {
  getAllNotes,
  createNote,
  getSingleNote,
  updateNote,
} = require("../controllers/notebook");

router
  .route("/")
  .get(getAllNotes)
  .post(createNote);

router
  .route("/:id")
  .get(getSingleNote)
  .patch(updateNote);

module.exports = router;
