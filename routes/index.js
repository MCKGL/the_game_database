const express = require('express');
const router = express.Router();
const GameRoutes = require('./game');
const UserRoutes = require('./user');


router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// Définition des routes principales de l'API. Toutes les routes commencent par /api
router.use('/api', UserRoutes, GameRoutes);

module.exports = router;