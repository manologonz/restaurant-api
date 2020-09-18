const express = require('express');

// routes imports
const userRoutes = require('./routes/users');
const tablesRoutes = require('./routes/tables');
const mealsRoutes = require('../api/routes/meals');
const subsidiaryRoutes = require('./routes/subsidiarys');
const router = express.Router();

// routes
router.use('/user', userRoutes);
router.use('/table', tablesRoutes);
router.use('/meal', mealsRoutes);
router.use('/subsidiary', subsidiaryRoutes);

module.exports = router;
