const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .trim()
    .required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .trim()
    .required()
    .strip(),
});

exports.registerSchema = registerSchema;

const loginSchema = Joi.object({
  emailOrPhone: Joi.string().required(),
  password: Joi.string().required(),
});

exports.loginSchema = loginSchema;

        // "restaurantName": "asdasasdasd",
        // "ownerFirstName": "data.ownerFirstName",
        // "ownerLastName": "data.ownerLastName",
        // "email": "gg@gg.com",
        // "phone": "0855555555",
        // "latitude": 123.33,
        // "longitude": 2.22,
        // "price": 5555,
        // "categoryIndex": 1,
        // "districtIndex": 1,
        // "nationIndex": 1

const registerCustomerSchema = Joi.object({
  restaurantName:Joi.string().required(),
  ownerFirstName:Joi.string().required(),
  ownerLastName:Joi.string().required(),

});
exports.registerCustomerSchema = registerCustomerSchema;

const registerRestaurantSchema = Joi.object({

});
exports.registerRestaurantSchema = Joi.object({

});

const registerAdminSchema = Joi.object({

});
exports.registerAdminSchema = registerAdminSchema;