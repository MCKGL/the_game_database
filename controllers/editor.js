const genericController = require('./genericControllerGameAttributes');
const Editor = require("../models").Editor;

exports.create = genericController.createOne(Editor, ['editorName']);
exports.getAll = genericController.getAll(Editor);
exports.getById = genericController.getById(Editor);
exports.getByName = genericController.getByName(Editor);
exports.update = genericController.updateOne(Editor, ['editorName']);
exports.delete = genericController.deleteOne(Editor);