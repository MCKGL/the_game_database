const genericController = require('./genericControllerGameAttributes');
const Type = require("../models").Type;

exports.create = genericController.createOne(Type, ['typeLabel']);
exports.getAll = genericController.getAll(Type);
exports.getById = genericController.getById(Type);
exports.getByName = genericController.getByName(Type);
exports.update = genericController.updateOne(Type, ['typeLabel']);
exports.delete = genericController.deleteOne(Type);