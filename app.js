require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();
const path = require('path');
const routes = require('./routes');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

require('./database/connexion');

const corsOptions = {
    origin: "*",
};

// app settings and middlewares are defined here
app
    // .use(limiter)
    .use(helmet())
    .use(cors(corsOptions))
    .use(express.json())
    .use(express.static(path.join(__dirname, "public")))
    // cookieParser is used to parse cookies from the HTTP request headers
    .use(cookieParser())
    .use('/', routes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the API" });
});

module.exports = app;