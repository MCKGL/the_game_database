const mongoose = require('mongoose');

const typeSchema = mongoose.Schema({
    typeLabel: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Type', typeSchema);