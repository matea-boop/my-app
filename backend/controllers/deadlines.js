const Deadline = require("../models/Deadline");

const getAllDeadlines = async (req, res) => {
  try {
    const deadlines = await Deadline.find({});
    res.status(200).json({ deadlines: deadlines });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createDeadline = async (req, res) => {
  try {
    const deadline = await Deadline.create(req.body);
    res.status(201).json({ deadline: deadline });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getSingleDeadline = async (req, res) => {
  try {
    const { id: deadlineID } = req.params;
    const deadline = await Deadline.findOne({ _id: deadlineID });
    if (!deadline) {
      return res
        .status(404)
        .json({ msg: `No deadline width id of ${deadlineID}` });
    }
    res.status(200).json({ event: deadline });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateDeadline = async (req, res) => {
  try {
    const { id: deadlineID } = req.params;
    const deadline = await Deadline.findByIdAndUpdate(
      { _id: deadlineID },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!deadline) {
      return res
        .status(404)
        .json({ msg: `No deadline width id of ${deadlineID}` });
    }
    res.status(200).json({ deadline: deadline });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteDeadline = async (req, res) => {
  try {
    const { id: deadlineID } = req.params;
    const deadline = await Deadline.findOneAndDelete({ _id: deadlineID });
    if (!deadline) {
      return res
        .status(404)
        .json({ msg: `No deadline width id of ${deadlineID}` });
    }
    res.status(200).json({ deadline: deadline });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllDeadlines,
  createDeadline,
  getSingleDeadline,
  updateDeadline,
  deleteDeadline,
};
