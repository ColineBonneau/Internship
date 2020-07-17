/*const Task_set = require('../models/tast_set')

// CREATE a task_set
// POST Task_set
createTask_set = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a task_set',
        })
    }

    const task_set = new Task_set(body)
    
    if(!task_set) {
        return res.status(400).json({ sucess: false, error: err })
    }

    task_set
        .save()
        .then(() => {
            return res.status(201).json({
                sucess: true,
                id: task_set._id,
                message: 'Task_set created',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Task_set not created',
            })
        })
}


//UPDATE a task_set
//PUT
updateTask_set = async (req, res) => {
    const body = req.body

    if(!body) {
        return res.status(400).json({
            sucess: false,
            error: 'You must provide a task_set to update',
        })
    }

    Task_set.findOne({ _id: req.params.id }, (err, task_set) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Task_set not found',
            })
        }
        task_set.name = body.name
        task_set.NumberOfTasks_M = body.NumberOfTasks_M
        task_set.NbOfAlternativesTasks_my = body.NbOfAlternativesTasks_my
        
        task_set
            .save()
            .then(() => {
                return res.status(200).json({
                    succes: true,
                    id: task_set._id,
                    message: 'Task_set updated',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error, 
                    message: 'Task_set not updated',
                })
            })
    })    
}

    
deleteTask_set = async (req, res) => {
    await Task_set.findOneAndDelete({ _id: req.params.id }, (err, task_set) => {
        if (err) {
            return res.status(400).json({ sucess: false, error, err })
        }

        if (!task_set) {
            return res
                .status(404)
                .json({ sucess: false, error: 'Task_set not found' })
        }
        return res.status(200).json({ sucess: true, data: task_set })
    }).catch(err => console.log(err))
}

getTaskById_set = async (req, res) => {
    await Task_set.findOne({ _id: req.params.id }, (err, task_set) => {
        if (err) {
            return res.status(400).json({ sucess: false, error: err })
        }

        if(!task_set) {
            return res
                .status(404)
                .json({ sucess: false, error: 'Task_set not found'})
        }
        return res.status(200).json({ sucess: true, data: task_set })
    }).catch(err => console.log(err))
}

getTasks_set = async (req, res) => {
    await Task_set.find({}, (err, tasks_set) => {
        if (err) {
            return res.status(400).json({ sucess: false, error: err })
        }
        if (!tasks_set.length) {
            return res  
                .status(404)
                .json({ sucess: false, error: 'Task_set not found' })
        }
        return res.status(200).json( {sucess: true, data: tasks_set })
    }).catch(err => console.log(err))
}

module.exports ={
    createTask_set,
    updateTask_set,
    deleteTask_set,
    getTasks_set,
    getTaskById_set,
}*/