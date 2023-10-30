const prisma = require("../models/prisma");
const { resIdSchema } = require("../validators/res-validator");

exports.createPackage = async (req, res, next) => {
  try {
    const { error, value } = resIdSchema(req.params);
    if (error) {
      next(error);
    }
  } catch (err) {
    next(err);
  }
};
