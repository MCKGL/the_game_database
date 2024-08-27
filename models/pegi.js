const mongoose = require('mongoose');

const pegiSchema = mongoose.Schema({
    pegiLabel: { type: String, required: true, unique: true },
    imgUrl: { type: String, required: true },
});

module.exports = mongoose.model('Pegi', pegiSchema);