const mongoose = require('mongoose');

const pegiSchema = mongoose.Schema({
    pegiLabel: { type: String, required: true },
    imgUrl: { type: String, required: true },
    games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
});

module.exports = mongoose.model('Pegi', pegiSchema);