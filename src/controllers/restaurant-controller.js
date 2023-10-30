const prisma = require("../models/prisma");
const { resIdSchema } = require("../validators/res-validator");

exports.getAllRes = async (req, res, next) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        status: 1,
      },
      include: {
        RestaurantImage: true,
        category: true,
        district: true,
        nation: true,
        Review: true,
      },
    });
    res.status(200).json(restaurants);
  } catch (err) {
    next(err);
  }
};

exports.getResById = async (req, res, next) => {
  try {
    const { error, value } = resIdSchema.validate(req.params);
    if (error) {
      next(error);
    }
    const restaurant = await prisma.restaurant.findFirst({
      where: {
        id: value.id,
        status: 1,
      },
      include: {
        category: true,
        district: true,
        nation: true,
        Review: true,
        RestaurantImages: true,
        Packages: true,
        BusinessTimes: true,
      },
    });
    res.status(200).json(restaurant);
  } catch (err) {
    next(err);
  }
};
