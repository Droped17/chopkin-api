const { upload } = require("../config/cloudinaryService");
const prisma = require("../models/prisma");
const { resIdSchema } = require("../validators/res-validator");
upload;

exports.createPackage = async (req, res, next) => {
  try {
    const { error, value } = resIdSchema(req.params);
    if (error) {
      next(error);
    }
    const response = {};
    const { name, detail, price } = req.body;
    const data = {
      name: name,
      detail: detail,
      price: price,
      restaurantId: value.resId,
    };
    if (req.file) {
      const url = await upload(req.file[0].url);
      data.img = url;
    }
    const package = await prisma.package.create({
      data: data,
    });
    response.package = package;
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

exports.getPackageByRes = async (req, res, next) => {
  try {
    const { error, value } = resIdSchema.validate(req.params);
    if (error) {
      next(error);
      return;
    }
    const packages = await prisma.package.findMany({
      where: {
        restaurantId: value.resId,
      },
    });
    res.status(200).json(packages);
  } catch (err) {
    next(err);
  }
};
