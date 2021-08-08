const { response } = require("express");
const User = require("../models/User");

const createUser = async (req, res = response) => {
    try {
        const user = new User(req.body);
        await user.save();

        res.status(201).json({
            ok: true,
            msg: "User created correctly",
        });
    } catch (error) {
        console.log(error);

        return res.json({
            ok: false,
            msg: "An error ocurred, contact to support",
        });
    }
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
