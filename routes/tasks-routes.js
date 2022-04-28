const express = require('express')
const router = express.Router();

const { getAllUserTasks, createTask, deleteTask } = require('../controllers/tasks-controllers');

router.get('/', getAllUserTasks);
router.post('/', createTask);
router.delete('/:id', deleteTask);

module.exports = router;