const express = require('express');
const router = express.Router();
const controller = require('../Controllers/paymentController');

router.get('/all', controller.getAll);
router.get('/all/id/:id', controller.getAllById);
router.get('/all/date/:date', controller.getAllByDate);

router.post('/add', controller.add);

router.post('/paymentpage',controller.getPaymentPage)

module.exports = router;