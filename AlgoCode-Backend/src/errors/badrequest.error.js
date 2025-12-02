const BaseError = require("./base.error");
import { StatusCodes } from "http-status-codes";

class BadRequestError extends BaseError {
  constructor(propertyName, details) {
    super(
      "BadRequest",
      StatusCodes.BAD_REQUEST,
      `Invalid structure for ${propertyName} provided`,
      details
    );
  }
}

module.exports = BadRequestError;
