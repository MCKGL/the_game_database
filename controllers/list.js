const genericController = require('./genericController');
const {List, Game, User} = require('../models');

const createList = async (req, res) => {
    try {
        const create = req.body;
        const allowedFields = ['listName', 'description', 'user', 'games'];
        const isValidCreate = Object.keys(create).every(key => allowedFields.includes(key));

        if (!isValidCreate) {
            return res.status(400).send({message: 'Invalid fields in request body'});
        }

        const { games, user } = req.body;

        if (games && games.length > 0) {
            const validGames = await Game.find({ _id: { $in: games } });
            if (validGames.length !== games.length) {
                return res.status(400).json({ message: 'Invalid IDs provided for some games' });
            }
        }

        const isValidUser = await User.exists({ _id: user });
        if (!isValidUser) {
            return res.status(400).json({ message: 'Invalid ID provided for user' });
        }

        const list = new List({
            listName: req.body.listName,
            description: req.body.description,
            user: req.body.user,
            games: req.body.games,
        });

        const saveList = await list.save();
        res.status(201).json({
            message: 'List saved successfully!',
            list: saveList,
        });

    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const updateList = async (req, res) => {
    try {
        const updates = req.body;
        const allowedFields = ['listName', 'description'];
        const isValidUpdate = Object.keys(updates).every(key => allowedFields.includes(key));

        if (!isValidUpdate) {
            return res.status(400).send({message: 'Invalid update fields'});
        }

        const updatedList = await List.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true,
        }).select('-__v');

        if (!updatedList) {
            return res.status(404).json({message: 'List not found'});
        }

        res.status(200).send(updatedList);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getListsUser = async (req, res) => {
    try {
        const lists = await List.find({ user: req.body.user }).populate('games').select('-__v');
        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const addGameToList = async (req, res) => {
    try {
        const list = await List.findById(req.params.id);
        if (!list) {
            return res.status(404).json({message: 'List not found'});
        }

        const game = await Game.findById(req.body.game);
        if (!game) {
            return res.status(404).json({message: 'Game not found'});
        }

        list.games.push(game);
        const updatedList = await list.save();
        res.status(200).json(updatedList);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const removeGameFromList = async (req, res) => {
    try {
        const list = await List.findById(req.params.id);
        if (!list) {
            return res.status(404).json({message: 'List not found'});
        }

        const game = await Game.findById(req.body.game);
        if (!game) {
            return res.status(404).json({message: 'Game not found'});
        }

        list.games = list.games.filter(g => g.toString() !== game._id.toString());
        const updatedList = await list.save();
        res.status(200).json(updatedList);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.create = createList;
exports.getAll = genericController.getAll(List);
exports.getById = genericController.getById(List);
exports.getListsUser = getListsUser;
exports.update = updateList;
exports.add = addGameToList;
exports.remove = removeGameFromList;
exports.delete = genericController.deleteOne(List);
