const express = require("express");
const router = express.Router();
const {
  getAllHabits,
  createHabit,
  getSingleHabits,
  updateHabits,
  deleteHabit,
} = require("../controllers/habits");

router
  .route("/")
  .get(getAllHabits)
  .post(createHabit);

router
  .route("/:id")
  .get(getSingleHabits)
  .patch(updateHabits)
  .delete(deleteHabit);

module.exports = router;
