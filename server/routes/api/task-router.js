const express = require('express')

const TaskCtrl = require('../../controllers/task-crtl')

const router = express.Router()

router.post('/task', TaskCtrl.createTask)
router.put('/task/:id', TaskCtrl.updateTask)
router.delete('/task/:id', TaskCtrl.deleteTask)
router.get('/task/:id', TaskCtrl.getTaskById)
router.get('/tasks', TaskCtrl.getTasks, (req,res) =>{
    res.render("task/addOrEdit",{
        viewTitle: "Insert Task"
    })
})

module.exports = router 