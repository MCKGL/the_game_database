const mongoose = require('mongoose');

const editorSchema = mongoose.Schema({
    editorName: { type: String, required: true },
    games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
});

module.exports = mongoose.model('Editor', editorSchema);