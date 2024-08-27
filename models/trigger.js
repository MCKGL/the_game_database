const mongoose = require('mongoose');

const triggerSchema = mongoose.Schema({
    triggerLabel: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Trigger', triggerSchema);