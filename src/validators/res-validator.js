const Joi = require("joi");

exports.resIdSchema = Joi.object({
  resId: Joi.number().integer().positive().required(),
});

exports.resNationSchema = Joi.object({
  nation: Joi.string().trim().required(),
});
