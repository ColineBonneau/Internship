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


/*const Radiation_Effect = require('../models/Radiation_Effect')

// CREATE A RadiationEffect
//POST 

createRadiation = (req,res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            sucess: false,
            error: 'You must provide a radiation effect',
        })
    }

    const radiation = new Radiation_Effect(body)

    if(!radiation) {
        return res.status(400).json({ sucess: false, error, err})
    }

    radiation
        .save()
        .then(() => {
            return res.status(201).json({
                sucess: true, 
                id: radiation._id,
                message: 'radiation effect created',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error: err,
                message: 'radiation effect not created',
            })
        })
}

//UPDATE A radiation
// PUT

updateRadiation = async (req,res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            sucess: false,
            error: 'You must provide a radiation effect to update'
        })
    }

    Radiation_Effect.findOne({ _id: req.params.id }, (err, radiation) => {
        if (err) {
            return res.status(404).json({
                error: err,
                message: 'radiation effect not found',
            })
        }
        radiation.name = body.name
        radiation.RadiationType_V = body.RadiationType_V

        radiation
            .save()
            .then(() => {
                return res.status(200).json({
                    sucess: true,
                    id: radiation._id,
                    message: 'radiation effect updated'
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'radiation effect not updated',
                })
            })
    })
}

//DELETE
deleteRadiation = async (req, res) => {
    await Radiation_Effect.findOneAndDelete({ _id: req.params.id}, (err, radiation) => {
        if (err) {
            return res.status(400).json({ sucess: false, error: err})
        }

        if (!radiation) {
            return res  
                .status(404)
                .json({sucess: false, error: 'radiation effect not found'})
        }
        return res.status(200).json({ sucess: true, data: radiation })
    }).catch(err => console.log(err))
}

//GET BY ID
getRadiationById = async (req,res) => {
    await Radiation_Effect.findOne({ _id: req.params.id }, (err, radiation) => {
        if (err) {
            return res.status(400).json({ sucess: false, error: err})
        }

        if (!radiation) {
            return res 
                .status(404)
                .json({ sucess: false, error: 'radiation effect not found'})
        }
        return res.status(200).json({ sucess: true, data: radiation})
    }).catch(err => console.log(err))
}

// GET ALL
getRadiations =  async (req, res) => {
    await Radiation_Effect.find({}, (err, radiation) => {
        if (err) {
            return res.status(400).json({ sucess: false, error: err })
        }

        if (!radiation.length) {
            return res
                .status(404)
                .json({ sucess: false, error: 'radiation effet not found'})
        }
        return res.status(200).json({ sucess: true, data: radiation})
    }).catch(err => console.log(err))
}

module.exports ={
    createRadiation,
    updateRadiation,
    deleteRadiation,
    getRadiationById,
    getRadiations,
}*/