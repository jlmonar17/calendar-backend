const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
    try {
        // With populate() we get can get extra data about user, and not only the id
        const events = await Event.find().populate("user", "name email");

        return res.json({
            ok: true,
            events,
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
            msg: "Unexpected error, contact to support.",
        });
    }
};

const updateEvent = async (req, res = response) => {
    try {
        // Get value from ":/id" passed as parameter in route
        const eventId = req.params.id;
        const uid = req.uid;

        // Check if event exist with provided id
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "Event doesn't exist",
            });
        }

        // Check if user have privilegies to update event
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "User doesn't have privilegies to update event",
            });
        }

        // Now we update the event
        const newEvent = {
            ...req.body,
            user: uid,
        };

        // {new: true} is used to return in eventUpdated, the last update data
        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
            new: true,
        });

        return res.status(201).json({
            ok: true,
            event: eventUpdated,
        });
    } catch (error) {
        console.log(error);

        return res.json({
            ok: false,
            msg: "Unexpected error, contact to support",
        });
    }
};

const deleteEvent = async (req, res = response) => {
    try {
        // Get value from ":/id" passed as parameter in route
        const eventId = req.params.id;
        const uid = req.uid;

        // Check if event exist with provided id
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "Event doesn't exist",
            });
        }

        // Check if user have privilegies to delete event
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "User doesn't have privilegies to delete event",
            });
        }

        await Event.findByIdAndDelete(eventId);

        return res.json({
            ok: true,
            msg: "Event deleted correctly",
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: "Unexpected error, contact to support",
        });
    }
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
};
