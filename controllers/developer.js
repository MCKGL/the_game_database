const models = require("../models");

exports.createDeveloper = async (req, res) => {
    try {
        const creation = req.body;
        const allowedCreations = ["developerName"];
        const isValidCreate = Object.keys(creation).every(key => allowedCreations.includes(key));

        if (!isValidCreate) {
            return res.status(400).send({ message: 'Invalid fields in request body' });
        }

        const existingDeveloper = await models.Developer.findOne({ developerName: creation.developerName });

        if (existingDeveloper) {
            return res.status(400).send({ message: 'Developer name already exists' });
        }

        const developer = await models.Developer.create(creation);
        res.status(201).send(developer);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getAllDevelopers = async (req, res) => {
    try {
        const developers = await models.Developer.find().select("-__v");
        res.status(200).send(developers);
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
}

exports.getDeveloperById = async (req, res) => {
    try {
        const developer = await models.Developer.findById(req.params.id).select("-__v");
        if (developer) {
            res.status(200).send(developer);
        } else {
            res.status(404).send({
                message: 'Developer not found',
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};

exports.getDeveloperByName = async (req, res) => {
    try {
        const developer = await models.Developer.findOne({ developerName: req.params.developerName }).select("-__v");

        if (developer) {
            res.status(200).send(developer);
        } else {
            res.status(404).send({
                message: 'Developer not found',
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};


exports.updateDeveloper = async (req, res) => {
    try {
        const updates = req.body;
        const allowedUpdates = ["developerName"];
        const isValidUpdate = Object.keys(updates).every(update => allowedUpdates.includes(update));

        if (!isValidUpdate) {
            return res.status(400).send({ message: 'Invalid update fields' });
        }

        const developer = await models.Developer.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }).select("-__v");

        if (!developer) {
            return res.status(404).send({ message: 'Developer not found' });
        }

        res.status(200).send(developer);
    } catch (error) {
        res.status(500).send({ message: `Server error: ${error.message}` });
    }
};

exports.deleteDeveloper = async (req, res) => {
    try {
        const developer = await models.Developer.findById(req.params.id);
        if (developer) {
            await developer.deleteOne();
            res.status(200).send({ message: 'Developer deleted successfully' });
        } else {
            res.status(404).send({
                message: 'Developer not found',
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
}