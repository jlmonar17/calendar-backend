const { response } = require("express");
const { validationResult } = require("express-validator");

const fieldsValidator = (req, res = response, next) => {
    // Handling errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }

    // This function executes if none error occurs during validation, and it will execute
    // next middleware configured in the route
    next();
};

module.exports = fieldsValidator;
