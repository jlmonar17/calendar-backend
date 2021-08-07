const express = require("express");
require("dotenv").config();

// Creating express server
const app = express();

// Public sources
app.use(express.static("public"));

// Routes
// app.get("/", (req, res) => {
//     res.json({
//         ok: true,
//     });
// });

// Listen requests
app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
});
