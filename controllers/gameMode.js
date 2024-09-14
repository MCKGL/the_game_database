const genericController = require('./genericControllerGameAttributes');
const GameMode = require("../models").GameMode;

exports.create = genericController.createOne(GameMode, ['gameMode'], 'gameMode');
exports.getAll = genericController.getAll(GameMode);
exports.getById = genericController.getById(GameMode);
exports.getByName = genericController.getByName(GameMode, 'gameMode');
exports.update = genericController.updateOne(GameMode, ['gameMode']);
exports.delete = genericController.deleteOne(GameMode);