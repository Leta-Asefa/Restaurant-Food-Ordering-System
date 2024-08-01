const express = require('express');
const router = express.Router();
const controller = require('../Controllers/orderController');

router.get('/all', controller.getAll);
router.get('/all/id/:id', controller.getAllById);
router.get('/all/status/:status', controller.getAllByStatus);
router.get('/all/phone/:phone', controller.getAllByPhone);
router.get('/all/date/:date', controller.getAllByDate);

router.post('/add', controller.add);

router.patch('/update/:id', controller.updateById)

module.exports = router;