const jwt = require('jsonwebtoken');
exports.isAuthenticated = (req, res, next) => {
    let token = req.get('Authorization');
    if (!token || !token.split(' ')[1]) {
        const error = new Error('No authentication credentials found.')
        error.statusCode = 403;
        throw error;
    }
    let tokenInfo;
    token = token.split(' ')[1];
    try {
        tokenInfo = jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
        console.log("TOKEN ERROR: ", err);
        err.statusCode = 403;
        err.message = "token expired"
        throw err;
    }
    if (!tokenInfo) {
        const error = new Error('Not Authenticated');
        error.statusCode = 401;
        throw error;
    }
    req.user = tokenInfo;
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.user.role.name.toString() === 'Administrator') {
        next();
    } else {
        const error = new Error('Not Authorized');
        error.statusCode = 401;
        throw error;
    }
};

exports.isOwnerOrAdmin = (req, res, next) => {
    if(req.params.id === req.user._id || req.user.role.name.toString() === 'Administrator') {
        next();
    } else {
        const error = new Error('Not Authorized');
        error.statusCode = 401;
        throw error;
    }
};
