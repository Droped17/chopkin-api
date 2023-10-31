const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
const { resIdSchema, resNationSchema } = require("../validators/res-validator");

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
      return;
    }
    const restaurant = await prisma.restaurant.findFirst({
      where: {
        id: value.resId,
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

exports.getResByNation = async (req, res, next) => {
  try {
    const { error, value } = resNationSchema.validate(req.params);
    if (error) {
      next(error);
      return;
    }
    const resByNation = await prisma.nation.findMany({
      where: {
        name: value.nation,
      },
      include: {
        Restaurants: {
          include: {
            RestaurantImage: true,
            category: true,
            district: true,
            nation: true,
            Review: true,
          },
        },
      },
    });
    res.status(200).json(resByNation);
  } catch (err) {
    next(err);
  }
};

exports.createRes = async (req, res, next) => {
  try {
  } catch (err) {
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
    next(err);
  }
};

exports.editRes = async (req, res, next) => {
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
    const { restaurantName, price, category, district, nation } = req.body;
    const restaurantData = {
      restaurantName: restaurantName,
      price: price,
      restaurantId: value.resId,
    };
    if (req.files.profileImg) {
      restaurantData.profileImg = req.files.profileImg[0].path;
    }
    if (category) {
      const foundCat = await prisma.category.findFirst({
        where: {
          name: category,
        },
      });
      restaurantData.categoryId = foundCat.id;
    }
    if (district) {
      const foundDis = await prisma.district.findFirst({
        where: {
          name: district,
        },
      });
      restaurantData.districtId = foundDis.id;
    }
    if (nation) {
      const foundNation = await prisma.nation.findFirst({
        where: {
          name: nation,
        },
      });
      // restaurantData.nationId =
    }
    await prisma.restaurantPendingEdit.create({
      data: restaurantData,
    });
  } catch (err) {
    next(err);
  }
};
