const express = require('express')

const SimuCtrl = require('../../controllers/simu-crtl')

const router = express.Router()

router.post('/simulation', SimuCtrl.createSimu)
router.put('/simulation/:id', SimuCtrl.updateSimu)
router.delete('/simulation/:id', SimuCtrl.deleteSimu)
router.get('/simulation/:id', SimuCtrl.getSimuById)
router.get('/simulations', SimuCtrl.getSimus)

module.exports = router