const prisma = require("../models/prisma");
const fs = require("fs/promises");
const { upload } = require("../config/cloudinaryService");
const createError = require("../utils/create-error");
const { checkReviewIdSchema } = require("../validators/review-validator");

exports.createReview = async (req, res, next) => {
  try {
    const { reviewMessage, restaurantId, score } = JSON.parse(req.body.data);
    // const { reviewMessage, restaurantId, score } =req.body
    console.log(req.body);

    if ((!reviewMessage || !reviewMessage.trim()) && !req.file) {
      return next(createError("Review or Image is required", 400));
    }

    const data = {};
    data.restaurantId = restaurantId;
    data.customerId = req.user.id;
    console.log(req.files);
    let allReviewImages = [];
    if (req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        allReviewImages[i] = { url: await upload(req.files[i].path) };
      }
      console.log(allReviewImages);
      // data.ReviewImages[0] = await upload(req.files[0].path);
      // data.ReviewImages[1] = await upload(req.files[1].path);
      // data.ReviewImages[2] = await upload(req.files[2].path);
    }
    if (reviewMessage) {
      data.message = reviewMessage;
    }
    data.score = +score;
    const review = await prisma.review.create({
      data: {
        message: data.message,
        restaurantId: data.restaurantId,
        customerId: data.customerId,
        score: data.score,
        ReviewImages: {
          create:
            // { url: data.ReviewImages[0] },
            allReviewImages,
        },
      },

      include: {
        ReviewImages: true,
      },
    });
    res.status(201).json({ message: "Review created", review });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlink(req.file.path);
    }
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const { value, error } = checkReviewIdSchema.validate(req.params);
    if (error) {
      return next(error);
    }

    const existReview = await prisma.review.findFirst({
      where: {
        id: value.reviewId,
        // customerId: req.customer.id,
      },
    });

    if (!existReview) {
      return next(createError("Unable to delete this review", 400));
    }
    await prisma.review.delete({
      where: {
        id: existReview.id,
      },
    });
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

exports.getAllReviewByRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reviews = await prisma.review.findMany({
      where: {
        restaurantId: id,
      },
      include: {
        customer: {
          select: {
            profileImg: true,
            firstName: true,
            lastName: true,
          },
        },
        ReviewImages: {
          select: {
            url: true,
            reviewId: true,
          },
        },
      },
    });
    res.status(200).json({ reviews });
  } catch (err) {
    next(err);
  }
};