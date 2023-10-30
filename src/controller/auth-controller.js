const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../validators/auth-validator");
const prisma = require("../models/prisma");
const createError = require("../utils/create-error");

exports.register = async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    value.password = await bcrypt.hash(value.password, 12);
    const customer = await prisma.customer.create({ data: value });
    const payload = { CustomerId: Customer.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "8JncnNqEPncnca7ranc47anda",
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    res.status(201).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { value, error } = loginSchema.validate(req.body);
    if (error) {
      console.log(error.name);
      return next(error);
    }
    const customer = await prisma.customer.findFirst({
      where: {
        OR: [{ email: value.email }, { phone: value.phone }],
      },
    });
    if (!customer) {
      return next(createError("invalid credential", 400));
    }

    const isMatch = await bcrypt.compare(value.password, customer.password);
    if (!isMatch) {
      return next(createError("invalid credential", 400));
    }
    const payload = { CustomerId: customer.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "8ICNd310ncCXaldnenq",
      { expiresIn: process.env.JWT_EXPIRE }
    );
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};
