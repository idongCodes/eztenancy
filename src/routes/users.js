const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.post('/', UserController.register);

router.post('/login', UserController.login);

router.get('/:id', UserController.getProfile);

module.exports = router;
