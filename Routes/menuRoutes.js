const express = require('express');
const router = express.Router();
const controller = require('../Controllers/menuController');

router.get('/all', controller.getAll);
router.get('/all/:id', controller.getAllById);
router.get('/all/substring/:substring', controller.getAllBySubstring);
router.post('/add', controller.add);
router.patch('/update/:id',controller.updateById)
module.exports = router;