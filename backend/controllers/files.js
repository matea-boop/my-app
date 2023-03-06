const File = require("../models/File");

const getAllFiles = async (req, res) => {
  try {
    const files = await File.find({});
    res.status(200).json({ files: files });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createFile = async (req, res) => {
  try {
    const file = await File.create(req.body);
    res.status(201).json({ file: file });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getSingleFiles = async (req, res) => {
  try {
    const { id: fileID } = req.params;
    const file = await File.findOne({ _id: fileID });
    if (!file) {
      return res.status(404).json({ msg: `No file width id of ${fileID}` });
    }
    res.status(200).json({ file });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateFiles = async (req, res) => {
  try {
    const { id: fileID } = req.params;
    const file = await File.findByIdAndUpdate({ _id: fileID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!file) {
      return res.status(404).json({ msg: `No file width id of ${fileID}` });
    }
    res.status(200).json({ file: file });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteFile = async (req, res) => {
  try {
    const { id: fileID } = req.params;
    const file = await File.findOneAndDelete({ _id: fileID });
    if (!file) {
      return res.status(404).json({ msg: `No file width id of ${fileID}` });
    }
    res.status(200).json({ file: file });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllFiles,
  createFile,
  getSingleFiles,
  updateFiles,
  deleteFile,
};
