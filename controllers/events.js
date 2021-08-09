const { response } = require("express");

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

const createEvent = (req, res = response) => {
    return res.json({
        ok: true,
        msg: "Create Event",
    });
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
