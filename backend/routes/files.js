const express = require("express");
const router = express.Router();
const {
  getAllFiles,
  createFile,
  getSingleFiles,
  updateFiles,
  deleteFile,
} = require("../controllers/files");

router
  .route("/")
  .get(getAllFiles)
  .post(createFile);

router
  .route("/:id")
  .get(getSingleFiles)
  .patch(updateFiles)
  .delete(deleteFile);

module.exports = router;
