const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    gameName: { type: String, required: true },
    overview: { type: String, required: true },
    posterPath: { type: String, required: true },
    pegi: { type: mongoose.Schema.Types.ObjectId, ref: 'Pegi', required: true },
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
    developers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Developer', required: true }],
    types: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true }],
    editors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Editor', required: true }],
    trigger: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trigger'}],
    gameMode: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GameMode', required: true }],
    releaseDate: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ReleaseDate', required: true }],
});

module.exports = mongoose.model('Game', gameSchema);