/*
 * Routes for User/Auth
 * host + api/auth
 */

const { Router } = require("express");
const { check } = require("express-validator");
const {
    createUser,
    loginUser,
    revalidateToken,
} = require("../controllers/auth");
const fieldsValidator = require("../middlewares/fields-validator");
const { jwtValidator } = require("../middlewares/jwt-validator");

const router = Router();

// Routes
router.post(
    "/new",
    [
        // Middlewares (validators that wraps validators and sanitizer functions)
        check("name", "name is mandatory").not().isEmpty(),
        check("email", "email is mandatory").isEmail(),
        check("password", "password should have minimun 6 characters").isLength(
            { min: 6 }
        ),
        fieldsValidator,
    ],
    createUser
);

router.post(
    "/",
    [
        // Midddlewares
        check("email", "email is mandatory").isEmail(),
        check("password", "password should have minimun 6 characters").isLength(
            { min: 6 }
        ),
        fieldsValidator,
    ],
    loginUser
);

router.get("/renew", jwtValidator, revalidateToken);

module.exports = router;
