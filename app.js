const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');


const corsOptions = {
    origin: "*",
};

app
    .use(express.static(path.join(__dirname, "public")))
    .use('/', routes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the API" });
});

module.exports = app;