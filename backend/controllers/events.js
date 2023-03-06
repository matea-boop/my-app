const Event = require("../models/Event");

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ event });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getSingleEvent = async (req, res) => {
  try {
    const { id: eventID } = req.params;
    const event = await Event.findOne({ _id: eventID });
    if (!event) {
      return res.status(404).json({ msg: `No event width id of ${eventID}` });
    }
    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id: eventID } = req.params;
    const event = await Event.findByIdAndUpdate({ _id: eventID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!event) {
      return res.status(404).json({ msg: `No event width id of ${eventID}` });
    }
    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id: eventID } = req.params;
    const event = await Event.findOneAndDelete({ _id: eventID });
    if (!event) {
      return res.status(404).json({ msg: `No event width id of ${eventID}` });
    }
    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
