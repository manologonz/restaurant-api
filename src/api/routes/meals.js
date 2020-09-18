const express = require('express');
const router = express.Router();

// controllers
const {listMeals, mealDetail, createMeal, updateMeal, deleteMeal} = require('../controllers/meals');

// validators
const {baseValidators} = require('../validators/meals');

// permissions
const {isAuthenticated, isAdmin} = require('../utils/permissions');
const adminPermissions = [isAuthenticated, isAdmin];

// /api/meal/*
router.get('/', adminPermissions, listMeals);
router.get('/:id', adminPermissions, mealDetail);
router.post('/', adminPermissions, baseValidators(), createMeal);
router.put('/:id', adminPermissions, baseValidators(), updateMeal);
router.delete('/:id', adminPermissions, deleteMeal);

module.exports = router;
