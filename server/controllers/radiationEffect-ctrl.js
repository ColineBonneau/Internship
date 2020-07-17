const express = require('express')
var router = express.Router()
const mongoose = require('mongoose');
const { update } = require('../models/Radiation_Effect');
const Radiation_Effect = mongoose.model('radiation')

require('../models/Radiation_Effect');

router.get('/', (req,res) => {
    res.render("radiation/addOrEdit", {
        viewTitle : "Insert Radiation"
    });
});

router.post('/', (req,res) =>{
    if (req.body._id == '')
        insertRecord(req,res)
    else 
        updateRecord(req,res)
})


function insertRecord(req,res) {
    var radiation = new Radiation_Effect()
    radiation.name = req.body.name
    radiation.RadiationType_V = req.body.RadiationType_V
    radiation.save((err, doc) => {
        if (!err){
            res.redirect('radiation/list')
        }
        else {
            if (err.name == 'ValidationError') 
            {
                handleValidationError(err, req.body)
                res.render("radiation/addOrEdit", {
                    viewTitle: "Insert Radiation",
                    radiation: req.body
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
    Radiation_Effect.findOneAndUpdate({ _id: req.body._id }, req.body, {new: true }, (err, doc) => {
        if (!err) {
            res.redirect('radiation/list')
        }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body)
                res.render("radiation/addOrEdit", {
                    viewTotle: 'Update Radiation',
                    radiation: req.body
                })
            }
            else {
                console.log('Error during record update : ' +err)
            }
        }
    })
}

router.get('/list', (req, res) => {
    Radiation_Effect.find((err, doc) => {
        if (!err) {
            res.render("radiation/list", {
                list: doc.map(doc => doc.toJSON())
            })
        }
        else {
            console.log('Error in retrieving radiation list: ' + err)
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
    Radiation_Effect.findById(req.params.id, (err,doc) => {
        if (!err) {
            res.render("radiation/addOrEdit", {
                viewTitle: "Update Radiation",
                radiation: doc.toJSON()
            })
        }
    })
})

router.get('/delete/:id', (req,res) => {
    Radiation_Effect.findByIdAndRemove( req.params.id, (err,doc) => {
        if (!err){
            res.redirect('/radiation/list')
        }
        else {
            console.log('Error in radiation delete :' + err)
        }
    })
})

module.exports = router;


