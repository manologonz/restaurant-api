exports.handleError = (err) => {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    if (!err.message) {
        err.message = "Something went wrong :(";
    }
    return err;
}

exports.handleNotFound = (model) => {
    const error = new Error(`A ${model} with that id could not be found.`);
    error.statusCode = 404;
    return error;
}

exports.checkValidationErros = (errors) => {
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 400;
        error.message = errors.array().map(err =>  ({msg: err.msg}));
        throw error;
    }
}
