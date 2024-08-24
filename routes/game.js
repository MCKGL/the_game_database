const express = require('express');
const router = express.Router();
const {upload} = require("../middlewares");
const game = require('../controllers/game');

router.post('/add_game',[upload.fields([{ name: 'posterPath', maxCount: 1 }])], game.createGame);

module.exports = router;