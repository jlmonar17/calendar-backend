const { response } = require("express");
const jwt = require("jsonwebtoken");

const jwtValidator = (req, res = response, next) => {
    // Getting data from header params of request
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "Token was not provided in request",
        });
    }

    try {
        // Verify if it is a valid token, using our secret jwt seed
        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);

        // If token is valid, we extract data from payload and we provide it to the request, so, it
        // can be reused in next middlewares
        req.uid = payload.uid;
        req.name = payload.name;
    } catch (error) {
        console.log(error);

        return res.status(401).json({
            ok: false,
            msg: "Token in invalid",
        });
    }

    next();
};

module.exports = {
    jwtValidator,
};
