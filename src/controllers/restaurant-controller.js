const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
const {
  resIdSchema,
  resNationSchema,
  resCatSchema,
} = require("../validators/res-validator");

exports.getAllRes = async (req, res, next) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        status: 1,
      },
      include: {
        Reviews: true,
        BusinessTime: true,
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
        BusinessTime: true,
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
    const { error, value } = resIdSchema.validate(req.params);
    if (error) {
      next(error);
      return;
    }
    if (!req.user.type !== "restaurant") {
      next(createError("You're unauthorized."));
      return;
    }
    const { restaurantName, price, categoryIndex, districtIndex, nationIndex } =
      req.body;
    const data = {
      restaurantName: restaurantName,
      price: price,
      restaurantId: value.resId,
      categoryIndex: categoryIndex,
      districtIndex: districtIndex,
      nationIndex: nationIndex,
    };
    if (req.files.profileImg) {
      data.profileImg = req.files.profileImg[0].path;
    }
    await prisma.restaurantPendingEdit.create({
      data: data,
    });
    if (req.files.resImg) {
      for (let x of req.files.resImg) {
        await prisma.restaurantImage.create({
          data: {
            url: x[0].path,
            restaurantId: value.resId,
          },
        });
      }
    }
    res.json(201).json({ message: "Edit pending has been created" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getEditPending = async (req, res, next) => {
  try {
    const pendingEdit = await prisma.restaurantPendingEdit.findMany();
    res.status(200).json(pendingEdit);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deleteEditPending = async (req, res, next) => {
  try {
    const { error, value } = resIdSchema.validate(req.params);
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
