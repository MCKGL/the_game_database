const genericController = require('./genericControllerGameAttributes');
const ReleaseDate = require("../models").ReleaseDate;

exports.create = genericController.createOne(ReleaseDate, ['jap', 'An', 'Aus', 'Eur', 'game', 'hardware'], 'game');
exports.getAll = genericController.getAll(ReleaseDate);
exports.getById = genericController.getById(ReleaseDate);
exports.update = genericController.updateOne(ReleaseDate, ['jap', 'An', 'Aus', 'Eur', 'game', 'hardware']);
exports.delete = genericController.deleteOne(ReleaseDate);