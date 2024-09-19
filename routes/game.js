const express = require('express');
const router = express.Router();
const {upload, auth} = require("../middlewares");
const gameController = require('../controllers/game');

router.post("/add_game",[auth.verifyToken, auth.isAdmin, upload.single('posterPath')], gameController.create);
router.get("/games", gameController.getAll);
router.get("/game/:id", gameController.getById);
router.get('/game/name/:gameName', gameController.getByName);
router.patch("/game/:id",[auth.verifyToken, auth.isAdmin, upload.single('posterPath')], gameController.update);
router.delete("/game/:id",[auth.verifyToken, auth.isAdmin], gameController.delete);

module.exports = router;