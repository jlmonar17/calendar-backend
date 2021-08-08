const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createUser = async (req, res = response) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "User already exists",
            });
        }

        user = new User(req.body);

        // Encrypting password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
        });
    } catch (error) {
        console.log(error);

        return res.json({
            ok: false,
            msg: "An error ocurred, contact to support",
        });
    }
};

const loginUser = async (req, res = response) => {
    const { email, password } = req.body;

    // Checking if user exists
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            ok: false,
            msg: "User doesn't exist with provided email",
        });
    }

    // Checking if password is correct
    const validPassword = await bcrypt.compareSync(password, user.password);

    if (!validPassword) {
        return res.status(400).json({
            ok: false,
            msg: "Password is invalid",
        });
    }

    res.json({
        ok: true,
        uid: user.id,
        name: user.name,
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
