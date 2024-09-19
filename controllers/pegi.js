const genericController = require('./genericController');
const Pegi = require("../models").Pegi;
const fs = require('fs').promises;
const path = require('path');

const createPegi = async (req, res) => {
    let uploadedImagePath;
    try {
        const create = req.body;
        const allowedFields = ['pegiLabel', 'imgUrl'];
        const isValidCreate = Object.keys(create).every(key => allowedFields.includes(key));

        // If the request does not contain valid fields, delete the uploaded image and return an error
        if (!isValidCreate) {
            if (req.file && req.file.filename) {
                uploadedImagePath = path.join('./public/images', req.file.filename);
                await fs.unlink(uploadedImagePath);
                console.log('Uploaded image deleted due to invalid fields');
            }
            return res.status(400).send({ message: 'Invalid update fields' });
        }
        const pegi = new Pegi({
            pegiLabel: req.body.pegiLabel,
            imgUrl: '/' + req.file.filename
        });
        pegi.save().then(
            () => {
                res.status(201).json({
                    message: 'Pegi saved successfully!'
                });
            }
        ).catch(
            (error) => {
                if (error.name === 'ValidationError') {
                    res.status(400).json({
                        error: error
                    });
                } else {
                    res.status(500).json({
                        error: error
                    });
                }
            }
        );
    } catch (error) {
        // If an error occurs, delete the uploaded image and return an error message
        if (req.file && req.file.filename) {
            uploadedImagePath = path.join('./public/images', req.file.filename);
            await fs.unlink(uploadedImagePath);
            console.log('Uploaded image deleted due to server error');
        }
        res.status(500).send({ message: `Server error: ${error.message}` });
    }
}

const updatePegi = async (req, res) => {
    let uploadedImagePath;
    try {
        const updates = req.body;
        const allowedFields = ['pegiLabel', 'imgUrl'];
        const isValidUpdate = Object.keys(updates).every(key => allowedFields.includes(key));

        // If the request does not contain valid fields, delete the uploaded image and return an error
        if (!isValidUpdate) {
            if (req.file && req.file.filename) {
                uploadedImagePath = path.join('./public/images', req.file.filename);
                await fs.unlink(uploadedImagePath);
                console.log('Uploaded image deleted due to invalid fields');
            }
            return res.status(400).send({ message: 'Invalid update fields' });
        }

        const pegi = await Pegi.findById(req.params.id);
        if (!pegi) {
            if (req.file && req.file.filename) {
                uploadedImagePath = path.join('./public/images', req.file.filename);
                await fs.unlink(uploadedImagePath);
                console.log('Uploaded image deleted because Pegi was not found');
            }
            return res.status(404).send({ message: 'Pegi not found' });
        }

        // If a new image is uploaded, update the imgUrl field and delete the old image
        if (req.file && req.file.filename) {
            // Update the imgUrl field
            updates.imgUrl = '/' + req.file.filename;

            // delete the old image
            const oldImagePath = path.join('./public/images', pegi.imgUrl);
            try {
                await fs.unlink(oldImagePath);
                console.log('Old image deleted successfully');
            } catch (err) {
                console.error('Failed to delete old image:', err);
            }
        }

        // Update the item in the database with the new information
        const updatedItem = await Pegi.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }).select("-__v");

        // If the item is not found, return an error and delete the uploaded image
        if (!updatedItem) {
            if (req.file && req.file.filename) {
                uploadedImagePath = path.join('./public/images', req.file.filename);
                await fs.unlink(uploadedImagePath);
                console.log('Uploaded image deleted because update failed');
            }
            return res.status(404).send({ message: 'Pegi not found' });
        }

        res.status(200).send(updatedItem);

    } catch (error) {
        // If an error occurs, delete the uploaded image and return an error message
        if (req.file && req.file.filename) {
            uploadedImagePath = path.join('./public/images', req.file.filename);
            await fs.unlink(uploadedImagePath);
            console.log('Uploaded image deleted due to server error');
        }
        res.status(500).send({ message: `Server error: ${error.message}` });
    }
};

const deletePegi = async (req, res) => {
    try {
        const item = await Pegi.findById(req.params.id);
        if (!item) {
            return res.status(404).send({ message: 'Pegi not found' });
        }

        const imagePath = path.join('./public/images', item.imgUrl);

        try {
            await fs.unlink(imagePath);
        } catch (err) {
            return res.status(500).send({ message: 'Failed to delete image file' });
        }

        await item.deleteOne();

        res.status(200).send({ message: 'Pegi and associated image deleted successfully' });

    } catch (error) {
        res.status(500).send({ message: `Server error: ${error.message}` });
    }
};

exports.create = createPegi;
exports.update = updatePegi;
exports.getAll = genericController.getAll(Pegi);
exports.getById = genericController.getById(Pegi);
exports.getByName = genericController.getByName(Pegi, 'pegiLabel');
exports.delete = deletePegi;