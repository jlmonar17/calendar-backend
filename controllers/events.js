const { response } = require("express");
const Event = require("../models/Event");

const getEvents = (req, res = response) => {
    try {
        return res.json({
            ok: true,
            msg: "getEvents",
        });
    } catch (error) {
        console.log(error);

        return res.status(401).json({
            ok: false,
            msg: "Error getting events",
        });
    }
};

const createEvent = async (req, res = response) => {
    console.log(req.body);
    console.log(req.uid);

    try {
        const event = new Event(req.body);
        // We have uid and name of user because we save it in the request when we check token
        // in jwtValidator middleware
        event.user = req.uid;

        const eventSaved = await event.save();

        return res.json({
            ok: true,
            event: eventSaved,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: "Unexpeted error, contact to support.",
        });
    }
};

const updateEvent = (req, res = response) => {
    return res.json({
        ok: true,
        msg: "Update Event",
    });
};

const deleteEvent = (req, res = response) => {
    return res.json({
        ok: true,
        msg: "Delete Event",
    });
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
};
