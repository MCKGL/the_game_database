const genericController = require('./genericController');
const Developer = require("../models").Developer;

exports.create = genericController.createOne(Developer, ['developerName'], ['developerName']);
exports.getAll = genericController.getAll(Developer);
exports.getById = genericController.getById(Developer);
exports.getByName = genericController.getByName(Developer, 'developerName');
exports.update = genericController.updateOne(Developer, ['developerName']);
exports.delete = genericController.deleteOne(Developer);