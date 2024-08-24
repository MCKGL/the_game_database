const mongoose = require('mongoose');

const hardwareSchema = mongoose.Schema({
    hardwareName: { type: String, required: true },
});

module.exports = mongoose.model('Hardware', hardwareSchema);