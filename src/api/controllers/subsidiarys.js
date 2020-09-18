// models
const Subsidiary = require('../models/subsidiary');

// helpers
const helpers = require('../utils/helpers');

// validators
const {validationResult} = require('express-validator');

// pagination
const paginate = require('express-paginate');

exports.createSubsidiary = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        helpers.checkValidationErros(errors);
        const data = {
            name: req.body.name,
            code: req.body.code,
            address: req.body.address
        };
        const subsidiary = new Subsidiary(data);
        await subsidiary.save();
        res.status(201).json({
            _id: subsidiary._id,
            name: subsidiary.name,
            code: subsidiary.code,
            address: subsidiary.address
        });
    } catch (err) {
        next(helpers.handleError(err));
    }
};

exports.listSubsidiaries = async (req, res, next) => {
    try {
        const subsidiariesCount = await Subsidiary.find({}).countDocuments({});
        const results = await Subsidiary.find({}, {__v: 0}).limit(req.query.limit).skip(req.skip).lean().exec();
        const pageCount = Math.ceil(subsidiariesCount / req.query.limit);
        res.status(200).json({
            next: paginate.hasNextPages(req)(pageCount),
            results
        });
    } catch (err) {
        next(helpers.handleError(err));
    }
};

exports.subsidiaryDetail = async (req, res, next) => {
    const _id = req.params.id;
    try {
        const subsidiary = await Subsidiary.findOne({_id});
        console.log("SUBSIDIARY: ", subsidiary);
        if (!subsidiary) {
            throw helpers.handleNotFound('subsidiary');
        }
        res.status(200).json({
            _id: subsidiary._id,
            name: subsidiary.name,
            code: subsidiary.code,
            address: subsidiary.address
        });
    } catch (err) {
        next(helpers.handleError(err));
    }
};

exports.updateSubsidiary = async (req, res, next) => {
    const errors = validationResult(req);
    const _id = req.params.id;
    try {
        helpers.checkValidationErros(errors);
        const subsidiary = await Subsidiary.findOne({_id});
        if (!subsidiary) {
            throw helpers.handleNotFound('subsidiary');
        }
        subsidiary.name = req.body.name;
        subsidiary.code = req.body.code;
        subsidiary.address = req.body.address;
        await subsidiary.save();
        res.status(200).json({
            _id: subsidiary._id,
            name: subsidiary.name,
            code: subsidiary.code,
            address: subsidiary.address
        });
    } catch (err) {
        next(helpers.handleError(err));
    }

};

exports.deleteSubsidiary = async (req, res, next) => {
    const _id = req.params.id;
    try {
        const subsidiary = await Subsidiary.findOne({_id});
        if (!subsidiary) {
            throw helpers.handleNotFound('subsidiary');
        }
        await subsidiary.delete();
        res.status(204).json({});
    } catch (err) {
        next(helpers.handleError(err));
    }
};
