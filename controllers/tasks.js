const Task = require("../models/task");
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(201).json({ tasks });
    // res.status(201).json({ tasks, amount: tasks.length });
    // res
    //   .status(200)
    //   .json({ status: "success", data: { tasks, amount: tasks.length } });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({ message: `No Task with ID: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ message: `No task with ID: ${taskID}` });
    }
    res.status(200).json({ task });
    // res.status(200).send();
    // res.status(200).json({ task: null, status: "success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      res.status(404).json({ message: `No task with ID: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
