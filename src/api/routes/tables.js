// express
const express = require('express');
const router = express.Router();

// validators
const {baseValidators} = require('../validators/tables')

// controllers
const {
    listTables,
    updateTable, 
    tableDetail,
    deleteTable,
    authenticateClient,
    createTable
} = require('../controllers/tables')

// permissions
const {isAuthenticated, isAdmin} = require('../utils/permissions');
const basePermissions = [isAuthenticated, isAdmin];

router.post('/:idSubsidiary/tables', basePermissions, createTable);
router.get('/:idSubsidiary/tables', basePermissions, listTables);
router.put('/:idSubsidiary/tables/:idTable', basePermissions, updateTable);
router.get('/:idSubsidiary/tables/:idTable', basePermissions, tableDetail);
router.delete('/:idSubsidiary/tables/:idTable', basePermissions, deleteTable);
router.post('/:idSubsidiary/tables/:authCode/authenticate-client', authenticateClient);

module.exports = router;
