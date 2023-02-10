const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

const { getProgressStatistics } = require("../controllers/progressAggr");

router.route("/ProgressStatistics").get(getProgressStatistics);

router
  .route("/")
  .get(getAllTasks)
  .post(createTask);

router
  .route("/:id")
  .get(getSingleTask)
  .patch(updateTask)
  .delete(deleteTask);

module.exports = router;
