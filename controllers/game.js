const Game = require('../models').Game;
const genericController = require("./genericControllerGameAttributes");
const fs = require('fs').promises;
const path = require('path');
const ReleaseDate = require('../models').ReleaseDate;
const Developer = require('../models').Developer;
const Editor = require('../models').Editor;
const Type = require('../models').Type;
const GameMode = require('../models').GameMode;
const Trigger = require('../models').Trigger;
const Pegi = require('../models').Pegi;

const createGame = async (req, res) => {
    try {
        // check if all required fields are provided
        const editorIds = req.body.editors;
        const developerIds = req.body.developers;
        const typeIds = req.body.types;
        const gameModeIds = req.body.gameModes;
        const triggerIds = req.body.triggers;
        const pegiId = req.body.pegi;

        // Check if all required fields id exist
        const isValidPegi = await Pegi.exists({ _id: pegiId });
        const validEditors = await Editor.find({ _id: { $in: editorIds } });
        const validDevelopers = await Developer.find({ _id: { $in: developerIds } });
        const validTypes = await Type.find({ _id: { $in: typeIds } });
        const validGameModes = await GameMode.find({ _id: { $in: gameModeIds } });
        const validTriggers = await Trigger.find({ _id: { $in: triggerIds } });

        // Check if the id provided are valid
        if (!isValidPegi || validEditors.length !== editorIds.length || validDevelopers.length !== developerIds.length ||
            validTypes.length !== typeIds.length || validGameModes.length !== gameModeIds.length ||
            validTriggers.length !== triggerIds.length) {
            return res.status(400).json({ message: 'Invalid IDs provided for editors, developers, types, game modes or triggers' });
        }

        // Create the game
        const game = new Game({
            gameName: req.body.gameName,
            overview: req.body.overview,
            posterPath: '/' + req.file.filename, // image uploadée
            pegi: pegiId,
            developers: developerIds,
            types: typeIds,
            editors: editorIds,
            triggers: triggerIds,
            gameModes: gameModeIds,
        });

        // Save the game
        const savedGame = await game.save();

        // Return the response
        res.status(201).json({
            message: 'Game saved successfully!',
            game: savedGame,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateGame = async (req, res) => {
    try {
        const updates = req.body;
        const allowedFields = ['gameName', 'overview', 'pegi', 'developers', 'types', 'editors', 'triggers', 'gameModes'];
        const isValidUpdate = Object.keys(updates).every(key => allowedFields.includes(key));

        if (!isValidUpdate) {
            return res.status(400).send({ message: 'Invalid update fields' });
        }

        // Check if the id provided are valid
        if (updates.pegi) {
            const isValidPegi = await Pegi.exists({ _id: updates.pegi });
            if (!isValidPegi) return res.status(400).json({ message: 'Invalid Pegi ID' });
        }
        if (updates.editors && updates.editors.length > 0) {
            const validEditors = await Editor.find({ _id: { $in: updates.editors } });
            if (validEditors.length !== updates.editors.length) return res.status(400).json({ message: 'Invalid Editor IDs' });
        }
        if (updates.developers && updates.developers.length > 0) {
            const validDevelopers = await Developer.find({ _id: { $in: updates.developers } });
            if (validDevelopers.length !== updates.developers.length) return res.status(400).json({ message: 'Invalid Developer IDs' });
        }
        if (updates.types && updates.types.length > 0) {
            const validTypes = await Type.find({ _id: { $in: updates.types } });
            if (validTypes.length !== updates.types.length) return res.status(400).json({ message: 'Invalid Type IDs' });
        }
        if (updates.gameModes && updates.gameModes.length > 0) {
            const validGameModes = await GameMode.find({ _id: { $in: updates.gameModes } });
            if (validGameModes.length !== updates.gameModes.length) return res.status(400).json({ message: 'Invalid GameMode IDs' });
        }
        if (updates.triggers && updates.triggers.length > 0) {
            const validTriggers = await Trigger.find({ _id: { $in: updates.triggers } });
            if (validTriggers.length !== updates.triggers.length) return res.status(400).json({ message: 'Invalid Trigger IDs' });
        }

        // Check if the game exists and update it if it does
        const game = await Game.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        if (!game) return res.status(404).send({ message: 'Game not found' });

        res.status(200).send(game);

    } catch (error) {
        res.status(500).send({ message: `Server error: ${error.message}` });
    }
};

const deleteGame = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).send({ message: 'Game not found' });
        }

        const imagePath = path.join('./public/images', game.posterPath);

        // Delete the image associated with the game
        try {
            await fs.unlink(imagePath);
            console.log('Image deleted successfully');
        } catch (err) {
            return res.status(500).send({ message: 'Failed to delete image file' });
        }

        // Delete the release dates associated with the game
        try {
            await ReleaseDate.deleteMany({ game: game._id });
            console.log('Associated release dates deleted successfully');
        } catch (err) {
            return res.status(500).send({ message: 'Failed to delete associated release dates' });
        }

        // Delete the game
        await game.deleteOne();

        res.status(200).send({ message: 'Game and associated image and release dates deleted successfully' });

    } catch (error) {
        res.status(500).send({ message: `Server error: ${error.message}` });
    }
};


exports.create = createGame;
exports.update = updateGame;
// TODO the get all function should return the game with the associated data
exports.getAll = genericController.getAll(Game);
exports.getById = genericController.getById(Game);
exports.getByName = genericController.getByName(Game, 'gameName');
// TODO search by multiple attributes
exports.delete = deleteGame;