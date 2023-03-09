const express = require("express");
const router = express.Router();
const {
  getAllDeadlines,
  createDeadline,
  getSingleDeadline,
  updateDeadline,
  deleteDeadline,
} = require("../controllers/deadlines");

router
  .route("/")
  .get(getAllDeadlines)
  .post(createDeadline);

router
  .route("/:id")
  .get(getSingleDeadline)
  .patch(updateDeadline)
  .delete(deleteDeadline);

module.exports = router;
