// Auth
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const User = require('../models/user');
const paginate = require('express-paginate');

// validators
const {validationResult} = require('express-validator');

// Helpers
const helpers = require('../utils/helpers');

exports.list = async (req, res, next) => {
    try {
        const usersCount = await User.find().countDocuments({});
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

exports.create = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        helpers.checkValidationErros(errors);
        const data = {
            username: req.body.username,
            email: req.body.email,
            firstName: req.body.first_name,
            lastName: req.body.last_name,
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
                isActive: user.isActive
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
            email: user.email,
            username: user.username
        }
        const token = jwt.sign(userTokenInfo, process.env.JWT_SECRET, {expiresIn: '1d'});
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
