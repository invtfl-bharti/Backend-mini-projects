class BaseError extends Error {
    constructor(name, statusCode, description, details) {
        super(description);
        this.name = name;
        this.statusCode = statusCode;
        // Error.captureStackTrace();
        this.details = this.details;
    }
}

module.exports = BaseError;