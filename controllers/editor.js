const genericController = require('./genericController');
const Editor = require("../models").Editor;

exports.create = genericController.createOne(Editor, ['editorName'], ['editorName']);
exports.getAll = genericController.getAll(Editor);
exports.getById = genericController.getById(Editor);
exports.getByName = genericController.getByName(Editor, 'editorName');
exports.update = genericController.updateOne(Editor, ['editorName']);
exports.delete = genericController.deleteOne(Editor);