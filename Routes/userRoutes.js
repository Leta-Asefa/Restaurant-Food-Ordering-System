const express = require('express');
const router = express.Router();
const controller = require('../Controllers/userController');

router.get('/getall/:substring', controller.getAllUsers);
router.get('/get/:id', controller.getAUser);
router.post('/add', controller.createUser);

module.exports = router;
