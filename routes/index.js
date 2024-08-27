const express = require('express');
const router = express.Router();
const GameRoutes = require('./game');
const UserRoutes = require('./user');
const DeveloperRoutes = require('./developer');
const EditorRoutes = require('./editor');
const GameModeRoutes = require('./gameMode');
const HardwareRoutes = require('./hardware');
const TriggerRoutes = require('./trigger');
const TypeRoutes = require('./type');

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// All routes must be prefixed with /api
router.use('/api', UserRoutes, GameRoutes, DeveloperRoutes, EditorRoutes, GameModeRoutes, HardwareRoutes, TriggerRoutes, TypeRoutes);

module.exports = router;