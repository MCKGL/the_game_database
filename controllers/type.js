const genericController = require('./genericController');
const Type = require("../models").Type;

exports.create = genericController.createOne(Type, ['typeLabel'], ['typeLabel']);
exports.getAll = genericController.getAll(Type);
exports.getById = genericController.getById(Type);
exports.getByName = genericController.getByName(Type, 'typeLabel');
exports.update = genericController.updateOne(Type, ['typeLabel']);
exports.delete = genericController.deleteOne(Type);