const Task = require('../models/task-model');
const { NotFoundError } = require('../errors');

const getAllUserTasks = async (req, res) => {
    const tasks = await Task.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(200).json({ tasks });
}

const createTask = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const task = await Task.create(req.body);
    res.status(201).json({ task: task });
}

const deleteTask = async (req, res) => {
    const {
        user: { userId },
        params: { id: taskId }
    } = req;

    console.log(`${userId}, ${taskId}`);

    const task = await Task.findOneAndDelete({
        _id: taskId,
        createdBy: userId,
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