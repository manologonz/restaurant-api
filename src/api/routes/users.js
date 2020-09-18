// main imports
const express = require('express');
const router = express.Router();

// controllers
const {listUsers, createUser, login} = require('../controllers/users');

// validators
const {baseValidators, loginValidator} = require('../validators/users');

// middlewares
const {isAuthenticated, isAdmin, isOwnerOrAdmin} = require('../utils/permissions');
const basePermissions = [isAuthenticated, isAdmin];
const updatePermissions = [isAuthenticated, isOwnerOrAdmin];

// /api/user/*
router.get('/', basePermissions, listUsers);
router.post('/', basePermissions, baseValidators(), createUser);
router.post('/login', loginValidator(), login);
module.exports = router;
