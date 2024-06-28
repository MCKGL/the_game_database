const mongoose = require('mongoose');

const hardwareSchema = mongoose.Schema({
    hardwareName: { type: String, required: true },
    releaseDate: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ReleaseDate'}],
});

module.exports = mongoose.model('Hardware', hardwareSchema);