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


/*const Simulation = require('../models/simulation')

// CREATE A SIMU
//POST 

createSimu = (req,res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            sucess: false,
            error: 'You must provide a simulation',
        })
    }

    const simu = new Simulation(body)

    if(!simu) {
        return res.status(400).json({ sucess: false, error, err})
    }

    simu
        .save()
        .then(() => {
            return res.status(201).json({
                sucess: true, 
                id: simu._id,
                message: 'Simulation created',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error: err,
                message: 'Simulation not created',
            })
        })
}

//UPDATE A SIMU
// PUT

updateSimu = async (req,res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            sucess: false,
            error: 'You must provide a simulation to update'
        })
    }

    Simulation.findOne({ _id: req.params.id }, (err, simu) => {
        if (err) {
            return res.status(404).json({
                error: err,
                message: 'Simulation not found',
            })
        }
        simu.name = body.name

        simu
            .save()
            .then(() => {
                return res.status(200).json({
                    sucess: true,
                    id: simu._id,
                    message: 'Simulation updated'
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Simulation not updated',
                })
            })
    })
}

//DELETE
deleteSimu = async (req, res) => {
    await Simulation.findOneAndDelete({ _id: req.params.id}, (err, simu) => {
        if (err) {
            return res.status(400).json({ sucess: false, error: err})
        }

        if (!simu) {
            return res  
                .status(404)
                .json({sucess: false, error: 'Simulation not found'})
        }
        return res.status(200).json({ sucess: true, data: simu })
    }).catch(err => console.log(err))
}

//GET BY ID
getSimuById = async (req,res) => {
    await Simulation.findOne({ _id: req.params.id }, (err, simu) => {
        if (err) {
            return res.status(400).json({ sucess: false, error: err})
        }

        if (!simu) {
            return res 
                .status(404)
                .json({ sucess: false, error: 'Simulation not found'})
        }
        return res.status(200).json({ sucess: true, data: simu})
    }).catch(err => console.log(err))
}

// GET ALL
getSimus =  async (req, res) => {
    await Simulation.find({}, (err, simus) => {
        if (err) {
            return res.status(400).json({ sucess: false, error: err })
        }

        if (!simus.length) {
            return res
                .status(404)
                .json({ sucess: false, error: 'Simulation not found'})
        }
        return res.status(200).json({ sucess: true, data: simus})
    }).catch(err => console.log(err))
}

module.exports ={
    createSimu,
    updateSimu,
    deleteSimu,
    getSimus,
    getSimuById,
// */