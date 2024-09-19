const genericController = require('./genericController');
const Hardware = require("../models").Hardware;

exports.create = genericController.createOne(Hardware, ['hardwareName'], ['hardwareName']);
exports.getAll = genericController.getAll(Hardware);
exports.getById = genericController.getById(Hardware);
exports.getByName = genericController.getByName(Hardware, 'hardwareName');
exports.update = genericController.updateOne(Hardware, ['hardwareName']);
exports.delete = genericController.deleteOne(Hardware);