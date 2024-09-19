const genericController = require('./genericController');
const ReleaseDate = require("../models").ReleaseDate;
const Game = require('../models').Game;
const Hardware = require('../models').Hardware;

const createReleaseDate = async (req, res) => {
    try {
        const create = req.body;
        const allowedFields = ['jap', 'an', 'aus', 'eur', 'game', 'hardware'];
        const isValidCreate = Object.keys(create).every(key => allowedFields.includes(key));

        if (!isValidCreate) {
            return res.status(400).send({message: 'Invalid fields in request body'});
        }

        const gameId = req.body.game;
        const hardwareId = req.body.hardware;

        const isValidGame = await Game.exists({_id: gameId});
        const isValidHardware = await Hardware.exists({_id: hardwareId});

        if (!isValidGame || !isValidHardware) {
            return res.status(400).json({message: 'Invalid IDs provided for game or hardware'});
        }

        // Check if a ReleaseDate with the same game and hardware already exists
        const existingReleaseDate = await ReleaseDate.findOne({ game: gameId, hardware: hardwareId });

        if (existingReleaseDate) {
            return res.status(400).json({ message: 'ReleaseDate with the same game and hardware already exists' });
        }

        const releaseDate = new ReleaseDate({
            jap: req.body.jap,
            an: req.body.an,
            aus: req.body.aus,
            eur: req.body.eur,
            game: req.body.game,
            hardware: req.body.hardware,
        });

        const saveReleaseDate = await releaseDate.save();
        res.status(201).json({
            message: 'ReleaseDate saved successfully!',
            releaseDate: saveReleaseDate,
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const updateReleaseDate = async (req, res) => {
    try {
        const updates = req.body;
        const allowedFields = ['jap', 'an', 'aus', 'eur', 'game', 'hardware'];
        const isValidUpdate = Object.keys(updates).every(key => allowedFields.includes(key));

        if (!isValidUpdate) {
            return res.status(400).send({message: 'Invalid update fields'});
        }

        // Check if the id provided are valid
        if (updates.game) {
            const isValidGame = await Game.exists({_id: updates.game});
            if (!isValidGame) return res.status(400).json({message: 'Invalid Game ID'});
        }
        if (updates.hardware) {
            const isValidHardware = await Hardware.exists({_id: updates.hardware});
            if (!isValidHardware) return res.status(400).json({message: 'Invalid Hardware ID'});
        }

        // Check if the ReleaseDate exists
        const releaseDate = await ReleaseDate.findById(req.params.id);
        if (!releaseDate) {
            return res.status(404).send({ message: 'ReleaseDate not found' });
        }

        // Check if the new combination of game and hardware already exists
        if (updates.game && updates.hardware) {
            const existingReleaseDate = await ReleaseDate.findOne({
                _id: { $ne: req.params.id }, // Exclude the current releaseDate being updated
                game: updates.game,
                hardware: updates.hardware
            });

            if (existingReleaseDate) {
                return res.status(400).json({ message: 'ReleaseDate with the same game and hardware already exists' });
            }
        }

        const updateReleaseDate = await ReleaseDate.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }).select("-__v");

        if (!updateReleaseDate) {
            return res.status(404).send({message: 'ReleaseDate not found'});
        }

        res.status(200).send(updateReleaseDate);

    } catch (error) {
        res.status(500).send({message: `Server error: ${error.message}`});
    }
};

exports.create = createReleaseDate;
exports.getAll = genericController.getAll(ReleaseDate);
exports.getById = genericController.getById(ReleaseDate);
exports.update = updateReleaseDate;
exports.delete = genericController.deleteOne(ReleaseDate);