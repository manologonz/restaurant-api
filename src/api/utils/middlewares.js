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

module.exports = {
  notFound,
  errorHandler,
};
