const express = require('express');
const router = express.Router();
const {upload, auth} = require("../middlewares");
const gameController = require('../controllers/game');

/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         posterPath:
 *           type: string
 */

/**
 * @swagger
 * /api/add_game:
 *   post:
 *     summary: Add a new game
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               posterPath:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Game created successfully
 */
router.post("/add_game",[auth.verifyToken, auth.isAdmin, upload.single('posterPath')], gameController.create);

/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Retrieve a list of games
 *     responses:
 *       200:
 *         description: A list of games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 */
router.get("/games", gameController.getAll);

/**
 * @swagger
 * /api/game/{id}:
 *   get:
 *     summary: Retrieve a game by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A game object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 */
router.get("/game/:id", gameController.getById);

/**
 * @swagger
 * /api/game/name/{gameName}:
 *   get:
 *     summary: Retrieve a game by name
 *     parameters:
 *       - in: path
 *         name: gameName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A game object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 */
router.get('/game/name/:gameName', gameController.getByName);

/**
 * @swagger
 * /api/game/{id}:
 *   patch:
 *     summary: Update a game by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               posterPath:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Game updated successfully
 */
router.patch("/game/:id",[auth.verifyToken, auth.isAdmin, upload.single('posterPath')], gameController.update);

/**
 * @swagger
 * /api/game/{id}:
 *   delete:
 *     summary: Delete a game by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Game deleted successfully
 */
router.delete("/game/:id",[auth.verifyToken, auth.isAdmin], gameController.delete);

module.exports = router;