const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    gameName: { type: String, required: true },
    overview: { type: String, required: true },
    posterPath: { type: String, required: true },
    pegi: { type: mongoose.Schema.Types.ObjectId, ref: 'Pegi', required: true },
    developers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Developer', required: true }],
    types: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true }],
    editors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Editor', required: true }],
    triggers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trigger'}],
    gameModes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GameMode', required: true }],
    releaseDates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ReleaseDate' }]
});

module.exports = mongoose.model('Game', gameSchema);