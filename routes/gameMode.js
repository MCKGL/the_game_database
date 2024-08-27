const express = require('express');
const router = express.Router();
const gameModeController = require("../controllers/gameMode");
const { auth } = require("../middlewares");

router.post("/add_game_mode",[auth.verifyToken, auth.isAdmin],  gameModeController.create);
router.get("/game_modes", gameModeController.getAll);
router.get("/game_mode/:id", gameModeController.getById);
router.get('/game_mode/name/:gameMode', gameModeController.getByName);
router.patch("/game_mode/:id",[auth.verifyToken, auth.isAdmin], gameModeController.update);
router.delete("/game_mode/:id",[auth.verifyToken, auth.isAdmin], gameModeController.delete);

module.exports = router;