// main imports
const express = require('express');
const router = express.Router();

// controllers
const userController = require('../controllers/users');

// validators
const userValidators = require('../validators/users');

// middlewares
const isAuthenticated = require('../utils/middlewares').isAuthenticated;

// routes
router.get('/', isAuthenticated, userController.list);
router.post('/', userValidators.createValidator(), userController.create);
router.post('/login', userValidators.loginValidator(), userController.login);
module.exports = router;
