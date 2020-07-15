const express = require('express')

const RadiationCtrl = require('../../controllers/radiationEffect-ctrl')

const router = express.Router()

router.post('/radiation', RadiationCtrl.createRadiation)
router.put('/radiation/:id', RadiationCtrl.updateRadiation)
router.delete('/radiation/:id',RadiationCtrl.deleteRadiation)
router.get('/radiation/:id',RadiationCtrl.getRadiationById)
router.get('/radiations', RadiationCtrl.getRadiations)

module.exports = router