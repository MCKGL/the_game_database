const mongoose = require('mongoose');

const gameModeSchema = mongoose.Schema({
    gameMode: { type: String, required: true },
});

module.exports = mongoose.model('GameMode', gameModeSchema);