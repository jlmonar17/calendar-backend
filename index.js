const express = require("express");

// Creating express server
const app = express();

// Routes
app.get("/", (req, res) => {
    res.json({
        ok: true,
    });
});

// Listen requests
app.listen(4000, () => {
    console.log("server running....");
});
