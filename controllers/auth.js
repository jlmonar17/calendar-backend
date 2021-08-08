const { response } = require("express");
const { validationResult } = require("express-validator");

const createUser = (req, res = response) => {
    const { name, email, password } = req.body;

    // Handling errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }

    res.json({
        ok: true,
        msg: "Create user",
        name,
        email,
        password,
    });
};

const loginUser = (req, res = response) => {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }

    res.json({
        ok: true,
        msg: "Login user",
        email,
        password,
    });
};

const revalidateToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: "Revalidate token",
    });
};

module.exports = {
    createUser,
    loginUser,
    revalidateToken,
};
