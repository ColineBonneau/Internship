const express = require('express')

const SchedulingCtrl = require('../../controllers/schedulingPolicy-ctrl')

const router = express.Router()

router.post('/scheduling', SchedulingCtrl.createSchedul)
router.put('/scheduling/:id', SchedulingCtrl.updateSchedul)
router.delete('/scheduling/:id',SchedulingCtrl.deleteSchedul)
router.get('/scheduling/:id',SchedulingCtrl.getSchedulById)
router.get('/schedulings', SchedulingCtrl.getScheduls)

module.exports = router