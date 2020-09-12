// Auth
const jwt = require('jsonwebtoken');

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  console.log(err);
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(err.statusCode ? err.statusCode : statusCode);
  const jsonRes = {
    detail: err.message,
  }
  res.json(jsonRes);
}

const isAuthenticated = (req, res, next) => {
  let token = req.get('Authorization');
  if (!token) {
    const error = new Error('No authentication credentials found.')
    error.statusCode = 403;
    throw error;
  }
  token = token.split(' ')[1];
  if(!token) {
    const error = new Error('No authentication credenticals found.');
    error.statusCode = 403;
    throw error;
  }
  let tokenInfo;
  try {
    tokenInfo = jwt.verify(token, process.env.JWT_SECRET);
  } catch(err) {
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

module.exports = {
  notFound,
  errorHandler,
  isAuthenticated
};
