const express = require('express')

const TaskSetCtrl = require('../../controllers/task_set-crtl')
const { route } = require('./task-router')

const router = express.Router()

router.post('/task_set', TaskSetCtrl.createTask_set)
router.put('/task_set/:id', TaskSetCtrl.updateTask_set)
router.delete('/task_set/:id', TaskSetCtrl.deleteTask_set)
router.get('/task_set/:id', TaskSetCtrl.getTaskById_set)
router.get('/tasks_set', TaskSetCtrl.getTasks_set)

module.exports = router 

