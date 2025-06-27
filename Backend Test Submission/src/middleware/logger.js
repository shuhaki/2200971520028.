const { log } = require('../../Logging Middleware');

function logger(stack, level, pkg, msg) {
  return function (req, res, next) {
    log(stack, level, pkg, msg);
    next();
  };
}

module.exports = logger;
