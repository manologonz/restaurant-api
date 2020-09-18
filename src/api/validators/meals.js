const {body} = require('express-validator');
const Meal = require('../models/meal');

exports.baseValidators = () => {
    const name = body('name')
        .exists()
        .withMessage('[name] is a required field');
    const price = body('price')
        .exists()
        .withMessage('[price] field is a required field')
        .isNumeric()
        .withMessage('Wrong value, [price] most be a number');
    const description = body('description')
        .exists()
        .withMessage('[description] is a required field')
        .isString()
        .withMessage('Wrong value, [description] most be a string');
    return [name, price, description];
};
