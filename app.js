require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();
const path = require('path');
const routes = require('./routes');
const helmet = require('helmet');

require('./database/connexion');

const corsOptions = {
    origin: "*",
};

app
    // Utilisation des middlewares, la fonction use() permet d'ajouter des middlewares
    // .use(limiter)
    .use(helmet())
    .use(cors(corsOptions))
    .use(express.json())
    .use(express.static(path.join(__dirname, "public")))
    .use('/', routes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the API" });
});

module.exports = app;