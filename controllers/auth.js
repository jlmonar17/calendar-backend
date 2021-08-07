const { response } = require("express");

const createUser = (req, res = response) => {
    const { name, email, password } = req.body;

    if (name.length < 6) {
        return res.status(400).json({
            ok: false,
            msg: "Name should have minimun 5 characters",
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
