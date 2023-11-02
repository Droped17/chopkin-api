const Joi = require("joi");

exports.resIdSchema = Joi.object({
  resId: Joi.number().integer().positive().required(),
});

exports.resNationSchema = Joi.object({
  nationIndex: Joi.number().integer().positive().required(),
});

exports.resCatSchema = Joi.object({
  catIndex: Joi.number().integer().positive().required(),
});

exports.packageIdSchema = Joi.object({
  packageId: Joi.number().integer().positive().required(),
});
exports.pendingIdSchema = Joi.object({
  pendingId: Joi.number().integer().positive().required(),
});
