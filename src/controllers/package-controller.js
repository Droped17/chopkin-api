const { upload } = require("../config/cloudinaryService");
const prisma = require("../models/prisma");
const fs = require("fs/promises");
const createError = require("../utils/create-error");
const { resIdSchema, packageIdSchema } = require("../validators/res-validator");
upload;

exports.createPackage = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(createError("You're unauthorized", 401));
    }

    const { error, value } = resIdSchema(req.params);
    if (error) {
      next(error);
      return;
    }
    const { name, detail, price, status } = req.body;
    const data = {
      name: name,
      detail: detail,
      price: price,
      restaurantId: value.resId,
      status: 1,
    };
    if (req.file) {
      const url = await upload(req.file.path);
      data.img = url;
    }

    const package = await prisma.package.create({
      data: data,
    });
    // if (package.status === 0) {
    //   await prisma.package.update({
    //     status: 1,
    //   });
    // }
    res.status(201).json(package);
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
        status: 1,
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
      console.log(req.file);
      const url = await upload(req.file.path);
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
      fs.unlink(req.file.path);
    }
  }
};

exports.deletePackage = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(createError("You're unauthorized", 401));
    }
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
    if (!req.user.isAdmin) {
      next(createError("You're unauthorized.", 401));
    }
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

exports.getEditPending = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(createError("You're unauthorized", 401));
    }
    const pendingPackages = await prisma.packageEditPending.findMany();
    res.status(200).json(pendingPackages);
  } catch (err) {
    next(err);
  }
};
