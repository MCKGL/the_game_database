const mongoose = require('mongoose');

const developerSchema = mongoose.Schema({
    developerName: { type: String, required: true },
    games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
});

module.exports = mongoose.model('Developer', developerSchema);