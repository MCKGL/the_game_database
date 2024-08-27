const mongoose = require('mongoose');

const editorSchema = mongoose.Schema({
    editorName: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Editor', editorSchema);