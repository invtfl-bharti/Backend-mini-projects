const BaseError = require("./base.error");

class NotFoundError extends BaseError {
  constructor(details) {
    super("Not Found Error", 404, "Resources found", details);
  }
}

module.exports = NotFoundError;
