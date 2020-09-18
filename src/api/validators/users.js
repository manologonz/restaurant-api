const {body} = require('express-validator');
const User = require('../models/user');
const Subsidiary = require('../models/subsidiary');
const Role = require('../models/role');

exports.baseValidators = () => {
    const email = body('email')
        .exists()
        .withMessage('[email] is a required field')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((email, {req}) => {
            return User.findOne({email}).then(user => {
                if (user) return Promise.reject('Email already exists');
            });
        })
        .normalizeEmail();
    const username = body('username')
        .exists()
        .withMessage('[username] is a required field')
        .custom((username, {req}) => {
            return User.findOne({username}).then(user => {
                if (user) return Promise.reject('username already exists');
            });
        });
    const first_name = body('first_name').exists().withMessage('[first_name] is a required field');
    const confirm_password = body('confirm_password')
        .exists().withMessage('[confirm_password] is a required field');
    const password = body('password')
        .exists()
        .withMessage('[password] is a required field')
        .custom((password, {req}) => {
            if (password !== req.body.confirm_password) {
                return Promise.reject("password and confirm_password don't match")
            }
            return true
        });
    const subsidiary = body('subsidiary')
        .exists()
        .withMessage('[subsidiary] is a required field')
        .custom((subsidiary, {req}) => {
            return Subsidiary.findOne({_id: subsidiary}).then(subs => {
                if (!subs) return Promise.reject('subsidiary does not exists');
            });
        });
    const role = body('subsidiary')
        .exists()
        .withMessage('[role] is a required field')
        .custom((role, {req}) => {
            return Role.findOne({_id: role}).then(user_role => {
                if (!user_role) return Promise.reject('role does not exists');
            });
        });

    return [email, username, first_name, confirm_password, password, subsidiary, role];
};

exports.loginValidator = () => {
    const email = body('email').exists().withMessage('[email] is a required field').isEmail().normalizeEmail();
    const password = body('password').exists().withMessage('[password] is a required field');
    return [email, password];
}
