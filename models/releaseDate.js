const mongoose = require('mongoose');

const releaseDateSchema = mongoose.Schema({
    jap: { type: Date, required: true },
    An: { type: Date, required: true },
    Aus: { type: Date, required: true },
    Eur: { type: Date, required: true },
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    hardware: { type: mongoose.Schema.Types.ObjectId, ref: 'Hardware', required: true },
});

module.exports = mongoose.model('ReleaseDate', releaseDateSchema);