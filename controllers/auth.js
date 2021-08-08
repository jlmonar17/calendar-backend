const { response } = require("express");

const createUser = (req, res = response) => {
    const { name, email, password } = req.body;

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
