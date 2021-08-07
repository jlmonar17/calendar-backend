const express = require("express");
require("dotenv").config();

// Creating express server
const app = express();

// Public sources
app.use(express.static("public"));

// Reading and parsing of body requests
// It process requests where body comes in json format
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));

// Listen requests
app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
});
