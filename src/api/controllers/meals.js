// models
const Meal = require('../models/meal');

// helpers
const helpers = require('../utils/helpers');

// pagination
const paginate = require('express-paginate');

// validators
const {validationResult} = require('express-validator');

exports.listMeals = async (req, res, next) => {
    try {
        const mealsCount = await Meal.find().countDocuments();
        const results = await Meal.find({}, {__v:0}).limit(req.query.limit).skip(req.skip).lean().exec();
        const pageCount = Math.ceil(mealsCount/req.query.limit);
        res.status(200).json({
            next: paginate.hasNextPages(req)(pageCount),
            results
        });
    } catch(err) {
        next(helpers.handleError(err));
    }
};

exports.mealDetail = async (req, res, next) => {
    const _id = req.params.id;
    try {
        const meal = await Meal.findOne({_id});
        if (!meal) {
            const error = new Error("The meal with that id can't be found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            _id: meal._id,
            name: meal.name,
            price: meal.price,
            description: meal.description
        });
    } catch(err) {
        next(helpers.handleError(err));
    }
}

exports.createMeal = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        helpers.checkValidationErros(errors);
        const data = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        };
        const meal = new Meal(data);
        await meal.save();
        res.status(200).json({
            _id: meal._id,
            name: meal.name,
            price: meal.price,
            description: meal.description
        });
    } catch(err) {
        next(helpers.handleError(err));
    }
};

exports.updateMeal = async (req, res, next) => {
    const errors = validationResult(req);
    const _id = req.params.id;
    try {
        helpers.checkValidationErros(errors);
        const meal = await Meal.findOne({_id});
        if (!meal) {
            const error = new Error('A meal with that [id] could not be found.');
            error.statusCode = 404;
            throw error;
        }
        meal.name = req.body.name;
        meal.price = req.body.price;
        meal.description = req.body.description;
        await meal.save();
        res.status(200).json({
            _id: meal._id,
            name: meal.name,
            price: meal.price,
            description: meal.description
        });
    }catch(err){
        next(helpers.handleError(err));
    }
};

exports.deleteMeal = async (req, res, next) => {
    const _id = req.params.id;
    try {
        const meal = await Meal.findOne({_id});
        if (!meal) {
            throw helpers.handleNotFound('meal');
        }
        await meal.delete();
        res.status(204).json({});
    } catch(err) {
        next(helpers.handleError(err))
    }
};
