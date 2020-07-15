const express = require('express')
var router = express.Router()
const mongoose = require('mongoose');
const { update } = require('../models/tast_set');
const Task = mongoose.model('task')

require('../models/task');

router.get('/', (req,res) => {
    res.render("task/addOrEdit", {
        viewTitle : "Insert Task"
    });
});

router.post('/', (req,res) =>{
    if (req.body._id == '')
        insertRecord(req,res)
    else 
        updateRecord(req,res)
})


function insertRecord(req,res) {
    var task = new Task()
    task.name = req.body.name
    task.Deadline_D = req.body.Deadline_D
    task.Period_T = req.body.Period_T
    task.Segment_number_N = req.body.Segment_number_N
    task.Execution_time = req.body.Execution_time
    task.Execution_time_parallel_sgts = req.body.Execution_time_parallel_sgts
    task.save((err, doc) => {
        if (!err){
            res.redirect('task/list')
        }
        else {
            if (err.name == 'ValidationError') 
            {
                handleValidationError(err, req.body)
                res.render("task/addOrEdit", {
                    viewTitle: "Insert Task",
                    task: req.body
                })
            }
            else 
            {
                console.log('Error during record insertion : ' + err)
            }
        }
    })
}

function updateRecord(req,res) {
    Task.findOneAndUpdate({ _id: req.body._id }, req.body, {new: true }, (err, doc) => {
        if (!err) {
            res.redirect('task/list')
        }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body)
                res.render("task/addOrEdit", {
                    viewTotle: 'Update Task',
                    task: req.body
                })
            }
            else {
                console.log('Error during record update : ' +err)
            }
        }
    })
}

router.get('/list', (req, res) => {
    Task.find((err, doc) => {
        if (!err) {
            res.render("task/list", {
                list: doc.map(doc => doc.toJSON())
            })
        }
        else {
            console.log('Error in retrieving task list: ' + err)
        }
    })
})


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['NameError'] = err.errors[field].message;
                break;
            default:
                console.log(err);
                break;
        }
    }
}

router.get('/:id', (req,res) => {
    Task.findById(req.params.id, (err,doc) => {
        if (!err) {
            res.render("task/addOrEdit", {
                viewTitle: "Update Task",
                task: doc.toJSON()
            })
        }
    })
})

router.get('/delete/:id', (req,res) => {
    Task.findByIdAndRemove( req.params.id, (err,doc) => {
        if (!err){
            res.redirect('/task/list')
        }
        else {
            console.log('Error in task delete :' + err)
        }
    })
})

module.exports = router;