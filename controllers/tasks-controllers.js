const Task = require('../models/task-model');
const { NotFoundError } = require('../errors');

const getAllUserTasks = async (req, res) => {
    const tasks = await Task.find({ createdBy: req.user._id }).sort('createdAt');
    res.status(200).json({ tasks });
}

const createTask = async (req, res) => {
    req.body.createdBy = req.user._id;
    const Task = await Task.create(req.body);
    res.status(201).json({ task: task });
}

const deleteTask = async (req, res) => {
    const {
        user: { _id: userId },
        params: { id: taskId }
    } = req;

    const task = await Task.findByIdAndDelete({
        _id: taskId,
        createdBy: userId
    });

    if (!task) {
        throw new NotFoundError(`No task with id ${taskId}`);
    }

    res.status(200).send();
}

module.exports = {
    getAllUserTasks,
    createTask,
    deleteTask
}