exports.handleError = (err) => {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    if (!err.message) {
        err.message = "Something went wrong :(";
    }
    return err;
}

exports.checkValidationErros = (errors) => {
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 400;
        error.message = errors.array().map(err =>  ({msg: err.msg}));
        throw error;
    }
}
