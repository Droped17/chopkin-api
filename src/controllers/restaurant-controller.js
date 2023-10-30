const prisma = require("../models/prisma");

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
      },
    });
    res.status(200).json(restaurants);
  } catch (err) {
    next(err);
  }
};

exports.getResById = (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
