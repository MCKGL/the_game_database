const genericController = require('./genericControllerGameAttributes');
const Hardware = require("../models").Hardware;

exports.create = genericController.createOne(Hardware, ['hardwareName']);
exports.getAll = genericController.getAll(Hardware);
exports.getById = genericController.getById(Hardware);
exports.getByName = genericController.getByName(Hardware);
exports.update = genericController.updateOne(Hardware, ['hardwareName']);
exports.delete = genericController.deleteOne(Hardware);