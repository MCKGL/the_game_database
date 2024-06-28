const mongoose = require('mongoose');

const typeSchema = mongoose.Schema({
    typeLabel: { type: String, required: true },
    games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
});

module.exports = mongoose.model('Type', typeSchema);