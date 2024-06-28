const mongoose = require('mongoose');

const gameModeSchema = mongoose.Schema({
    gameMode: { type: String, required: true },
    games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
});

module.exports = mongoose.model('GameMode', gameModeSchema);