const genericController = require('./genericControllerGameAttributes');
const Trigger = require("../models").Trigger;

exports.create = genericController.createOne(Trigger, ['triggerLabel']);
exports.getAll = genericController.getAll(Trigger);
exports.getById = genericController.getById(Trigger);
exports.getByName = genericController.getByName(Trigger);
exports.update = genericController.updateOne(Trigger, ['triggerLabel']);
exports.delete = genericController.deleteOne(Trigger);