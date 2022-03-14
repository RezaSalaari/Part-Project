const BaseError = require("./baseError");
const httpStatusCodes = require("./httpStatusCodes");

class Error_404 extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = "Not found.",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

class Error_403 extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.FORBIDDEN,
    description = "Forbidden",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

module.exports = {
  Error_403,
  Error_404,
};
