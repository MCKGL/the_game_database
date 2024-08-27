const mongoose = require('mongoose');

const developerSchema = mongoose.Schema({
    developerName: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Developer', developerSchema);