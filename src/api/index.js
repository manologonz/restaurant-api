const express = require('express');

// routes imports
const userRoutes = require('./routes/users');
const mesasRoutes = require('./routes/tables')
const router = express.Router();

// routes
router.use('/user', userRoutes);
router.use('/mesa', mesasRoutes);

module.exports = router;
