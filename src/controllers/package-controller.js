const { upload } = require("../config/cloudinaryService");
const prisma = require("../models/prisma");
const fs = require("fs/promises");
const createError = require("../utils/create-error");
const { resIdSchema, packageIdSchema } = require("../validators/res-validator");
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

exports.createPackageEditPending = async (req, res, next) => {
  try {
    if (!req.user.restaurantName) {
      return next(createError("You're unauthorized", 401));
    }
    const { name, detail, price } = req.body;
    const data = {
      name: name,
      detail: detail,
      price: price,
      restaurantId: req.user.id,
    };
    if (req.file) {
      const url = await upload(req.file[0].path);
      data.img = url;
    }
    const edit = await prisma.packageEditPending.create({
      data: data,
    });
    res.status(201).json(edit);
  } catch {
    next(err);
  } finally {
    if (req.file) {
      fs.unlink(req.file[0].path);
    }
  }
};

exports.deletePackage = async (req, res, next) => {
  try {
    const { error, value } = packageIdSchema(req.params);
    if (error) {
      next(error);
      return;
    }
    const foundPack = await prisma.package.findFirst({
      where: {
        id: value.packageId,
      },
    });
    if (!foundPack) {
      next("Package doesn't exist", 404);
      return;
    }
    await prisma.package.delete({
      where: {
        id: foundPack.id,
      },
    });
    res.status(200).json({ message: "Package has been deleted." });
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { error, value } = packageIdSchema(req.params);
    if (error) {
      next(error);
      return;
    }
    const foundPack = await prisma.package.findFirst({
      where: {
        id: value.packageId,
      },
    });
    if (foundPack.status === 1) {
      await prisma.package.update({
        data: {
          status: 0,
        },
        where: {
          id: value.packageId,
        },
      });
      res
        .status(200)
        .json({ message: "Package has been hidden from the website." });
      return;
    }
    if (foundPack.status === 0) {
      await prisma.package.update({
        data: {
          status: 1,
        },
        where: {
          id: value.packageId,
        },
      });
      res
        .status(200)
        .json({ message: "Package has been shown on the website." });
    }
  } catch (err) {
    next(err);
  }
};
