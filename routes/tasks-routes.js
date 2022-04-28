const express = require('express')
const router = express.Router();

const { getAllUserTasks, createTask, updateTask, deleteTask } = require('../controllers/tasks-controllers');

router.get('/', getAllUserTasks);
router.post('/', createTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;