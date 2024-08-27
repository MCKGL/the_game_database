const genericController = require('./genericControllerGameAttributes');
const Developer = require("../models").Developer;

exports.create = genericController.createOne(Developer, ['developerName']);
exports.getAll = genericController.getAll(Developer);
exports.getById = genericController.getById(Developer);
exports.getByName = genericController.getByName(Developer);
exports.update = genericController.updateOne(Developer, ['developerName']);
exports.delete = genericController.deleteOne(Developer);