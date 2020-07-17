const express = require('express')
var router = express.Router()
const mongoose = require('mongoose');
const { update } = require('../models/simulation');
const Simulation = mongoose.model('simu')

require('../models/simulation');

router.get('/', (req,res) => {
    res.render("simu/addOrEdit", {
        viewTitle : "Insert Simulation"
    });
});

router.post('/', (req,res) =>{
    if (req.body._id == '')
        insertRecord(req,res)
    else 
        updateRecord(req,res)
})


function insertRecord(req,res) {
    var simu = new Simulation()
    simu.name = req.body.name
    simu.save((err, doc) => {
        if (!err){
            res.redirect('simu/list')
        }
        else {
            if (err.name == 'ValidationError') 
            {
                handleValidationError(err, req.body)
                res.render("simu/addOrEdit", {
                    viewTitle: "Insert Simulation",
                    simu: req.body
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
    Simulation.findOneAndUpdate({ _id: req.body._id }, req.body, {new: true }, (err, doc) => {
        if (!err) {
            res.redirect('simu/list')
        }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body)
                res.render("simu/addOrEdit", {
                    viewTotle: 'Update Simulation',
                    simu: req.body
                })
            }
            else {
                console.log('Error during record update : ' +err)
            }
        }
    })
}

router.get('/list', (req, res) => {
    Simulation.find((err, doc) => {
        if (!err) {
            res.render("simu/list", {
                list: doc.map(doc => doc.toJSON())
            })
        }
        else {
            console.log('Error in retrieving simulation list: ' + err)
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
                break;
        }
    }
}

router.get('/:id', (req,res) => {
    Simulation.findById(req.params.id, (err,doc) => {
        if (!err) {
            res.render("simu/addOrEdit", {
                viewTitle: "Update Simulation",
                simu: doc.toJSON()
            })
        }
    })
})

router.get('/delete/:id', (req,res) => {
    Simulation.findByIdAndRemove( req.params.id, (err,doc) => {
        if (!err){
            res.redirect('/simu/list')
        }
        else {
            console.log('Error in simulation delete :' + err)
        }
    })
})

module.exports = router;


