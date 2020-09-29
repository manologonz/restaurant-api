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
    authenticateClient
} = require('../controllers/tables')

// permissions
const {isAuthenticated, isAdmin} = require('../utils/permissions');
const basePermissions = [isAuthenticated, isAdmin];

router.post('/:idSubsidiary', basePermissions, listTables);
router.put('/:idSubsidiary/:idTable', basePermissions, updateTable);
router.get('/:idSubsidiary/:idTable', basePermissions, tableDetail);
router.delete('/:idSubsidiary/:idTable', basePermissions, deleteTable);
router.post('/:idSubsidiary/:authCode/authenticate-client', authenticateClient);

module.exports = router;