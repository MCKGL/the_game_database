require('dotenv').config();
const express = require('express');
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const app = express();
const path = require('path');
const routes = require('./routes');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { swaggerDocs, swaggerUi } = require("./swagger");

require('./database/connexion');

// corsOptions is used to define the origin of the requests. In this case, it is set to "*", but is not recommended for production !!
const corsOptions = {
    origin: "*",
};

// limiter is used to limit the number of requests from a single IP address
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes",
});

// app settings and middlewares are defined here
app
    .use(limiter)
    .use(helmet())
    .use(cors(corsOptions))
    .use(express.json())
    .use(express.static(path.join(__dirname, "public")))
    // cookieParser is used to parse cookies from the HTTP request headers
    .use(cookieParser())
    .use('/', routes)
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the API" });
});

module.exports = app;