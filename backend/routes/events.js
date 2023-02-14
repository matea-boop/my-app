const express = require("express");
const router = express.Router();
const {
  getAllEvents,
  createEvent,
  getSingleEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

router
  .route("/")
  .get(getAllEvents)
  .post(createEvent);

router
  .route("/:id")
  .get(getSingleEvent)
  .patch(updateEvent)
  .delete(deleteEvent);

module.exports = router;
