const Habit = require("../models/Habit");

const getAllHabits = async (req, res) => {
  try {
    const habits = await Habit.find({});
    res.status(200).json({ habits: habits });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createHabit = async (req, res) => {
  try {
    const habit = await Habit.create(req.body);
    res.status(201).json({ habit: habit });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getSingleHabits = async (req, res) => {
  try {
    const { id: habitID } = req.params;
    const habit = await Habit.findOne({ _id: habitID });
    if (!habit) {
      return res.status(404).json({ msg: `No habit width id of ${habitID}` });
    }
    res.status(200).json({ habit: habit });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateHabits = async (req, res) => {
  try {
    const { id: habitID } = req.params;
    const habit = await Habit.findByIdAndUpdate({ _id: habitID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!habit) {
      return res.status(404).json({
        msg: `No habit width id of ${habitID}`,
      });
    }
    res.status(200).json({ habit: habit });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteHabit = async (req, res) => {
  try {
    const { id: habitID } = req.params;
    const habit = await Habit.findOneAndDelete({ _id: habitID });
    if (!habit) {
      return res.status(404).json({ msg: `No habit width id of ${habitID}` });
    }
    res.status(200).json({ habit: habit });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllHabits,
  createHabit,
  getSingleHabits,
  updateHabits,
  deleteHabit,
};
