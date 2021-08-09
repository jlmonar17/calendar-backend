const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");
require("dotenv").config();

// Creating express server
const app = express();

// Database connection
dbConnection();

// CORS
app.use(cors());

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
