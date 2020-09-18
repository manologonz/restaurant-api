const express = require('express');
const router = express.Router();

// controllers
const {
    createSubsidiary,
    updateSubsidiary,
    listSubsidiaries,
    subsidiaryDetail,
    deleteSubsidiary
} = require('../controllers/subsidiarys');

const subsidiaryController = require('../controllers/subsidiarys');

// permissions
const {isAuthenticated, isAdmin} = require('../utils/permissions');

// validators
const {baseValidators} = require('../validators/subsidiary');
const adminPermissions = [isAuthenticated, isAdmin];

// /api/subsidiary/*
router.post('/', adminPermissions, baseValidators(), createSubsidiary);
router.get('/', adminPermissions, listSubsidiaries);
router.put('/:id', adminPermissions, baseValidators(), updateSubsidiary);
router.get('/:id', adminPermissions, subsidiaryDetail);
router.delete('/:id', adminPermissions, deleteSubsidiary);

module.exports = router
