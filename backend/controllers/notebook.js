const Notebook = require("../models/Notebook");

const getAllNotes = async (req, res) => {
  try {
    const notebook = await Notebook.find({});
    res.status(200).json({ notes: notebook });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createNote = async (req, res) => {
  try {
    const notebook = await Notebook.create(req.body);
    res.status(201).json({ note: notebook });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getSingleNote = async (req, res) => {
  try {
    const { id: notebookID } = req.params;
    const notebook = await Notebook.findOne({ _id: notebookID });
    if (!notebook) {
      return res.status(404).json({ msg: `No task width id of ${notebookID}` });
    }
    res.status(200).json({ note: notebook });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id: notebookID } = req.params;
    const notebook = await Notebook.findByIdAndUpdate(
      { _id: notebookID },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!notebook) {
      return res.status(404).json({ msg: `No task width id of ${notebookID}` });
    }
    res.status(200).json({ task: notebook });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllNotes,
  createNote,
  getSingleNote,
  updateNote,
};
