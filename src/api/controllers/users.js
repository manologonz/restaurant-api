// Auth
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const User = require('../models/user');
const Role = require('../models/role');
const Subsidiary = require('../models/subsidiary');
const paginate = require('express-paginate');

// validators
const {validationResult} = require('express-validator');

// Helpers
const helpers = require('../utils/helpers');

exports.listUsers = async (req, res, next) => {
    try {
        const usersCount = await User.find({}).countDocuments({});
        const results = await User.find({}, {password: 0, __v: 0}).limit(req.query.limit).skip(req.skip).lean().exec();
        const pageCount = Math.ceil(usersCount/req.query.limit);
        res.status(200).json({
            next: paginate.hasNextPages(req)(pageCount),
            results
        });
    } catch(err) {
        next(helpers.handleError(err));
    }
}

exports.createUser = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        helpers.checkValidationErros(errors);
        const role = await Role.findOne({_id: req.body.role});
        const subsidiary = await Subsidiary({_id: req.body.subsidiary});
        const data = {
            username: req.body.username,
            email: req.body.email,
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            role: {
                role_id: role._id,
                name: role.name
            },
            subsidiary: {
                subsidiary_id: subsidiary._id,
                name: subsidiary.name
            }
        }
        data.password = await bcrypt.hash(req.body.password, 12);
        const user = new User(data);
        await user.save();
        res.status(201).json({
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isActive: user.isActive,
                role: user.role,
                subsidiary: user.subsidiary
            }
        });
    } catch(err) {
        next(helpers.handleError(err));
    }
}

exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        helpers.checkValidationErros(errors);
        const data = {
            email: req.body.email,
            password: req.body.password
        }
        const user = await User.findOne({email: data.email});
        if (!user) {
            const error = new Error('A user with this email does not exists');
            error.statusCode = 404;
            throw error;
        }
        const isValidPassword = await bcrypt.compare(data.password, user.password);
        if (!isValidPassword) {
            const error = new Error('Incorrect email or password');
            error.statusCode = 400;
            throw error;
        }
        const userTokenInfo = {
            _id: user._id.toString(),
            username: user.username,
            role: user.role,
        }
        if (user.subsidiary) {
            userTokenInfo.subsidiary = user.subsidiary;
        }
        const token = jwt.sign(userTokenInfo, process.env.JWT_SECRET);
        res.status(201).json({
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isActive: user.isActive
            },
            token
        });
    } catch(err) {
        next(helpers.handleError(err));
    }
}
