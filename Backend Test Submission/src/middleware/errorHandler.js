// errorHandler.js
module.exports = errorHandler;

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
}

module.exports = errorHandler;
