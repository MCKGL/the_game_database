const mongoose = require('mongoose');

const triggerSchema = mongoose.Schema({
    triggerLabel: { type: String, required: true },
    games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
});

module.exports = mongoose.model('Trigger', triggerSchema);