/*
 * Eventroutes
 * host + api/events
 */

const { Router } = require("express");
const { jwtValidator } = require("../middlewares/jwt-validator");
const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} = require("../controllers/events");

const router = Router();

// All routes should pass the middleware to validate token.
// If we want some route to be public, without need of token, then we set
// the route before app.use(jwtValidator)
router.use(jwtValidator);

router.get("/", getEvents);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
