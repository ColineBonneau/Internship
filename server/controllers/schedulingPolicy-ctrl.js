const Scheduling_Policy = require('../models/Scheduling_policy')

// CREATE A schedulingPolicy
//POST 

createSchedul = (req,res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            sucess: false,
            error: 'You must provide a scheduling policy',
        })
    }

    const schedul = new Scheduling_Policy(body)

    if(!schedul) {
        return res.status(400).json({ sucess: false, error, err})
    }

    schedul
        .save()
        .then(() => {
            return res.status(201).json({
                sucess: true, 
                id: schedul._id,
                message: 'scheduling policy created',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error: err,
                message: 'scheduling policy not created',
            })
        })
}

//UPDATE A SCHEDUL
// PUT

updateSchedul = async (req,res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            sucess: false,
            error: 'You must provide a scheduling policy to update'
        })
    }

    Scheduling_Policy.findOne({ _id: req.params.id }, (err, schedul) => {
        if (err) {
            return res.status(404).json({
                error: err,
                message: 'scheduling policy not found',
            })
        }
        schedul.name = body.name

        schedul
            .save()
            .then(() => {
                return res.status(200).json({
                    sucess: true,
                    id: schedul._id,
                    message: 'scheduling policy updated'
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'scheduling policy not updated',
                })
            })
    })
}

//DELETE
deleteSchedul = async (req, res) => {
    await Scheduling_Policy.findOneAndDelete({ _id: req.params.id}, (err, schedul) => {
        if (err) {
            return res.status(400).json({ sucess: false, error: err})
        }

        if (!schedul) {
            return res  
                .status(404)
                .json({sucess: false, error: 'Scheduling policy not found'})
        }
        return res.status(200).json({ sucess: true, data: schedul })
    }).catch(err => console.log(err))
}

//GET BY ID
getSchedulById = async (req,res) => {
    await Scheduling_Policy.findOne({ _id: req.params.id }, (err, schedul) => {
        if (err) {
            return res.status(400).json({ sucess: false, error: err})
        }

        if (!schedul) {
            return res 
                .status(404)
                .json({ sucess: false, error: 'Scheduling policy not found'})
        }
        return res.status(200).json({ sucess: true, data: schedul})
    }).catch(err => console.log(err))
}

// GET ALL
getScheduls =  async (req, res) => {
    await Scheduling_Policy.find({}, (err, schedul) => {
        if (err) {
            return res.status(400).json({ sucess: false, error: err })
        }

        if (!schedul.length) {
            return res
                .status(404)
                .json({ sucess: false, error: 'Scheduling policy not found'})
        }
        return res.status(200).json({ sucess: true, data: schedul})
    }).catch(err => console.log(err))
}

module.exports ={
    createSchedul,
    updateSchedul,
    deleteSchedul,
    getSchedulById,
    getScheduls,
}