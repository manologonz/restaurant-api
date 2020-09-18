const {body} = require('express-validator');
const Subsidiary = require('../models/subsidiary');

exports.baseValidators = () => {
    const name = body('name')
        .exists()
        .withMessage('[name] is a required field.')
        .isString();
    const code = body('name')
        .exists()
        .withMessage('[code] is a required field.')
        .isString();
    const address = body('address')
        .exists()
        .withMessage('[address] is a required field')
        .isString();

    return [name, code, address];
}
