const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
const fs = require("fs/promises");
const { upload } = require("../config/cloudinaryService");
const {
  resIdSchema,
  resNationSchema,
  resCatSchema,
  pendingIdSchema,
} = require("../validators/res-validator");

exports.getAllRes = async (req, res, next) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        status: 1,
      },
      include: {
        Reviews: true,
        BusinessTimes: true,
      },
    });
    res.status(200).json(restaurants);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getResById = async (req, res, next) => {
  try {
    const { error, value } = resIdSchema.validate(req.params);
    if (error) {
      next(error);
      return;
    }
    const restaurant = await prisma.restaurant.findFirst({
      where: {
        id: value.resId,
        status: 1,
      },
      include: {
        Bookings: true,
        Reviews: true,
        RestaurantImages: true,
        Packages: true,
        BusinessTime: true,
      },
    });
    res.status(200).json(restaurant);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getPendingRes = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(createError("You're unauthorized", 401));
    }
    const pendingRes = await prisma.restaurant.findMany({
      where: {
        status: 0,
      },
    });
    res.status(200).json(pendingRes);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getResByNation = async (req, res, next) => {
  try {
    const { error, value } = resNationSchema.validate(req.params);
    if (error) {
      next(error);
      return;
    }
    const resByNation = await prisma.restaurant.findMany({
      where: {
        nationIndex: value.nationIndex,
      },
      include: {
        Reviews: true,
        BusinessTimes: true,
      },
    });
    res.status(200).json(resByNation);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getResByCat = async (req, res, next) => {
  try {
    const { error, value } = resCatSchema.validate(req.params);
    if (error) {
      next(error);
      return;
    }
    const resByCat = await prisma.restaurant.findMany({
      where: {
        categoryIndex: value.catIndex,
      },
    });
    res.status(200).json(resByCat);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deleteRes = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(createError("You're unauthorized", 401));
    }
    const { error, value } = resIdSchema.validate(req.params);
    if (error) {
      next(err);
      return;
    }
    const exist = await prisma.restaurant.findFirst({
      where: {
        id: value.resId,
      },
    });
    if (!exist) {
      next(createError("Restaurant doesn't exist", 404));
      return;
    }
    await prisma.restaurant.delete({
      where: {
        id: value.resId,
      },
    });
    res.status(200).json({ message: "deleted successfully" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.createEditPending = async (req, res, next) => {
  try {
    console.log(req.body);
    if (!req.user.restaurantName) {
      return next(createError("You're unauthorized", 401));
    }
    const {
      restaurantName,
      price,
      categoryIndex,
      districtIndex,
      nationIndex,
      businessTime,
      latitude,
      longitude,
    } = req.body.info;
    const data = {
      restaurantName: restaurantName,
      price: price,
      restaurantId: req.user.id,
      categoryIndex: categoryIndex,
      districtIndex: districtIndex,
      nationIndex: nationIndex,
      latitude: latitude,
      longitude: longitude,
    };

    if (req.file) {
      const url = await upload(req.file.path);
      data.profileImg = url;
    }

    const pendingOutput = await prisma.restaurantPendingEdit.create({
      data: data,
    });

    const businessTimeData = businessTime.map(
      (x) => (x.restaurantPendingEditId = pendingOutput.id)
    );
    const businessTimeOutput = await prisma.tempBusinessTime.createMany({
      data: businessTimeData,
    });

    res.status(201).json({
      message: "Edit pending has been created.",
      pendingOutput,
      businessTimeOutput,
    });
  } catch (err) {
    console.log(err);
    next(err);
  } finally {
    if (req.file) {
      fs.unlink(req.file.path);
    }
  }
};

// NEED FIXING *************
exports.createResImgPending = async (req, res, next) => {
  try {
    console.log(req.file);
    if (!req.user.restaurantName) {
      next(createError("You're unauthorized", 401));
      return;
    }

    const { error, value } = pendingIdSchema.validate(req.params);
    if (error) {
      next(error);
      return;
    }

    if (req.files) {
      for (let x of req.files) {
        console.log("araiwa", x);
        const images = await upload(x.path);
        console.log("imagesss", images);
        await prisma.restaurantImage.create({
          data: {
            url: images,
            restaurantId: req.user.id,
          },
        });
      }
    }
  } catch (err) {
    next(err);
  } finally {
    if (req.files) {
      for (let x of req.files) {
        fs.unlink(x.path);
      }
    }
  }
};

exports.getEditPending = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(createError("You're unauthorized", 401));
    }
    const pendingEdit = await prisma.restaurantPendingEdit.findMany();
    res.status(200).json(pendingEdit);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deleteEditPending = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(createError("You're unauthorized", 401));
    }
    const { error, value } = pendingIdSchema.validate(req.params);
    if (error) {
      next(error);
      return;
    }
    const foundPending = await prisma.restaurantPendingEdit.findFirst({
      where: {
        id: value.resId,
      },
    });
    if (!foundPending) {
      next(createError("Restaurant doesn't exist", 404));
      return;
    }
    await prisma.restaurantPendingEdit.delete({
      where: {
        id: foundPending.id,
      },
    });
    res.status(200).json({ message: "Pending has been deleted." });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.updateResStatus = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(createError("You're unauthorized", 401));
    }
    const { error, value } = resIdSchema.validate(req.params);
    if (error) {
      next(error);
      return;
    }
    const foundRes = await prisma.restaurant.findFirst({
      where: {
        id: value.resId,
      },
    });
    if (!foundRes) {
      next(createError("Restaurant doesn't exist", 404));
      return;
    }
    if (foundRes.status === 0) {
      await prisma.restaurant.update({
        data: {
          status: 1,
        },
        where: {
          id: value.resId,
        },
      });
      res
        .status(200)
        .json({ message: "Restaurant is now shown on the website." });
      return;
    }
    if (foundRes.status === 1) {
      await prisma.restaurant.update({
        data: {
          status: 0,
        },
        where: {
          id: value.resId,
        },
      });
      res
        .status(200)
        .json({ message: "Restaurant is now hidden on the website." });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.mergeResInfo = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(createError("You're unauthorized", 401));
    }
    const { error, value } = resIdSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const {
      restaurantName,
      price,
      categoryIndex,
      districtIndex,
      nationIndex,
      businessTime,
      latitude,
      longitude,
    } = req.body.info;
    const data = {
      restaurantName: restaurantName,
      price: price,
      restaurantId: value.resId,
      categoryIndex: categoryIndex,
      districtIndex: districtIndex,
      nationIndex: nationIndex,
      latitude: latitude,
      longitude: longitude,
    };
    if (req.file) {
      const url = await upload(req.file.path);
      data.profileImg = url;
    }
    const resInfo = await prisma.restaurant.update({
      data: data,
      where: {
        id: value.resId,
      },
      include: {
        RestaurantImages: true,
      },
    });
    if (req.body.businessTime) {
      await prisma.businessTime.updateMany({
        data: businessTime,
        where: {
          restaurantId: value.resId,
        },
      });
    }
    res.status(201).json("Updated restaurant successfully", resInfo);
  } catch (err) {
    next(err);
  }
};
