// models
const Table = require('../models/table');

// helpers
const helpers = require('../utils/helpers')

// validators
const {validationResult} = require('express-validator');

// pagination
const paginate = require('express-validator')

exports.listTables = (req, res, next) => {
    try {
        const tablesCount = await Table.find({}).countDocuments({});
        const results = await Table.find({}, {__v: 0}).limit(req.query.limit).skip(req.skip).lean().exec();
        const pageCount = Math.ceil(tablesCount/ req.query.limit);
        res.status(200).json({
            next: paginate.hasNextPages(req)(pageCount),
            results
        });
    } catch (err) {
        next(helpers.handleError(err));
    }
}

exports.createTable= (req, res, next) => {
    res.json({'detal': 'Not suported yet'})
}

exports.updateTable = (req, res, next) => {
    res.json({detail: 'Not supported yet'});
}

exports.tableDetail = (req, res, next) => {
    res.json({detail: 'Not supported yet'});
}

exports.deleteTable = (req, res, next) => {
    res.json({detail: 'Not supported yet'});
}

exports.authenticateClient = (req, res, next) => {
    res.json({detail: 'Not supported yet'});
}
