const mongoose = require('mongoose');

const releaseDateSchema = mongoose.Schema({
    jap: { type: Date, required: true },
    an: { type: Date, required: true },
    aus: { type: Date, required: true },
    eur: { type: Date, required: true },
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    hardware: { type: mongoose.Schema.Types.ObjectId, ref: 'Hardware', required: true },
});

module.exports = mongoose.model('ReleaseDate', releaseDateSchema);