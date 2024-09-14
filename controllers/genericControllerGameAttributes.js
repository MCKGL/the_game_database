const createOne = (Model, allowedFields, uniqueField) => async (req, res) => {
    try {
        const creation = req.body;
        const isValidCreate = Object.keys(creation).every(key => allowedFields.includes(key));

        if (!isValidCreate) {
            return res.status(400).send({ message: 'Invalid fields in request body' });
        }

        const existingItem = await Model.findOne({ [uniqueField]: creation[uniqueField] });

        if (existingItem) {
            return res.status(400).send({ message: `${Model.modelName} name already exists` });
        }

        const item = await Model.create(creation);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getAll = (Model) => async (req, res) => {
    try {
        const items = await Model.find().select("-__v");
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getById = (Model) => async (req, res) => {
    try {
        const item = await Model.findById(req.params.id).select("-__v");
        if (item) {
            res.status(200).send(item);
        } else {
            res.status(404).send({ message: `${Model.modelName} not found` });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getByName = (Model, uniqueField) => async (req, res) => {
    try {
        const item = await Model.findOne({ [uniqueField]: req.params[uniqueField] }).select("-__v");
        if (item) {
            res.status(200).send(item);
        } else {
            res.status(404).send({ message: `${Model.modelName} not found` });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const updateOne = (Model, allowedFields) => async (req, res) => {
    try {
        const updates = req.body;
        const isValidUpdate = Object.keys(updates).every(key => allowedFields.includes(key));

        if (!isValidUpdate) {
            return res.status(400).send({ message: 'Invalid update fields' });
        }

        const item = await Model.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }).select("-__v");

        if (!item) {
            return res.status(404).send({ message: `${Model.modelName} not found` });
        }

        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: `Server error: ${error.message}` });
    }
};

const deleteOne = (Model) => async (req, res) => {
    try {
        const item = await Model.findById(req.params.id);
        if (item) {
            await item.deleteOne();
            res.status(200).send({ message: `${Model.modelName} deleted successfully` });
        } else {
            res.status(404).send({ message: `${Model.modelName} not found` });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    createOne,
    getAll,
    getById,
    getByName,
    updateOne,
    deleteOne
};
