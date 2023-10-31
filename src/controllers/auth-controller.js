const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../validators/auth-validator");
const prisma = require("../models/prisma");
const createError = require("../utils/create-error");

// model Customer {
//   id          String     @id
//   firstName   String
//   lastName    String
//   profileImg  String?
//   memberPoint Int
//   email       String     @unique
//   phone       String     @unique
//   password    String
//   Bookings    Booking[]
//   Reviews     Review[]
//   ChatRooms   ChatRoom[]
// }

// model Admin {
//   id        String     @id
//   isAdmin   Int        @default(1)
//   email     String     @unique
//   password  String
//   ChatRooms ChatRoom[]
// }

// model Restaurant {
//   id                    String                  @id
//   restaurantName        String                  @unique
//   ownerFirstName        String
//   ownerLastName         String
//   email                 String                  @unique
//   phone                 String                  @unique
//   password              String                  @default("1234")
//   profileImg            String?
//   latitude              String?
//   longitude             String?
//   price                 String
//   categoryIndex         Int
//   districtIndex         Int?
//   nationIndex           Int
//   status                Int                     @default(0)
//   Bookings              Booking[]
//   Reviews               Review[]
//   RestaurantImages      RestaurantImage[]
//   Packages              Package[]
//   BusinessTime          BusinessTime[]
//   RestaurantPendingEdit RestaurantPendingEdit[]
// }

//check Param
const register = async (req, res, next) => {
  try {
    const { usertype } = req.params;
    console.log(req.params);
    if (usertype == "customer") CustomerRegister(req, res, next);
    else if (usertype == "restaurant") CreateRestaurants(req, res, next);
  } catch (error) {
    next(error);
  }
};
const createAdmin = async (req, res, next) => {
  try {
    //validate

    //validate

    const adminData = req.body;
    const newAdmin = await prisma.admin.create({
      data: {
        email: adminData.email,
        password: adminData.password,
      },
    });
    const payload = { adminId: newAdmin.id };
    const accessToken = jwt.sign(
      payload,
      process.JWT_SECRET_KEY || "8JncnNqEPncnca7ranc47anda",
      { expiresIn: process.env.JWT_EXPIRE }
    );
    res.status(200).json({ message: "create admin", accessToken, newAdmin });
  } catch (error) { }
};

const CreateRestaurants = async (req, res, next) => {
  try {
    //validate

    //validate
    const data = req.body;
    if(data.password!= data.confirmPassword){
      return next(createError("password not match", 400));
    }
    const checkRestaurants = await prisma.restaurant.findFirst({
      where: {
        OR: [{ email: data.email }, { phone: data.phone }],
      }
    });
    const checkCustomer = await prisma.customer.findFirst({
      where: {
        OR: [{ email: data.email }, { phone: data.phone }],
      }
    });

    if (checkRestaurants || checkCustomer) {
      return next(createError("have this email and password", 400));
    }

    const newRestaurants = await prisma.restaurant.create({
      data: {
        restaurantName: data.restaurantName,
        ownerFirstName: data.ownerFirstName,
        ownerLastName: data.ownerLastName,
        email: data.email,
        phone: data.phone,
        latitude: +data.latitude,
        longitude: +data.longitude,
        price: +data.price,
        password:data.password,
        categoryIndex: data.categoryIndex,
        districtIndex: data.districtIndex,
        nationIndex: data.nationIndex,
      },
    });
    

    const payload = { restaurantId: newRestaurants.id };
    const accessToken = jwt.sign(payload,process.JWT_SECRET_KEY || "8JncnNqEPncnca7ranc47anda",{ expiresIn: process.env.JWT_EXPIRE });

    res.status(200).json({
      message: "create restaurants success",
      accessToken,
      newRestaurants,
    });
  } catch (error) {
    next(error);
  }
};

const CustomerRegister = async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);
    if (error) {
      next(error);
      return;
    }
    const checkRestaurants = await prisma.restaurant.findFirst({
      where: {
        OR: [{ email: data.email }, { phone: data.phone }],
      }
    });
    const checkCustomer = await prisma.customer.findFirst({
      where: {
        OR: [{ email: data.email }, { phone: data.phone }],
      }
    });

    if (checkRestaurants || checkCustomer) {
      return next(createError("have this email and password", 400));
    }

    //hash password
    value.password = await bcrypt.hash(value.password, 12);

    //create
    const customer = await prisma.customer.create({
      data: {
        firstName: value.firstName,
        lastName: value.lastName,
        // memberPoint: 0,
        email: value.email,
        phone: value.phone,
        password: value.password,
      },
    });

    const payload = { customerId: customer.id };
    //accessToken
    const accessToken = jwt.sign(payload,process.JWT_SECRET_KEY || "8JncnNqEPncnca7ranc47anda",{ expiresIn: process.env.JWT_EXPIRE });

    delete customer.password;
    res.status(200).json({ message: "Create customer success", accessToken, customer });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// exports.register = async (req, res, next) => {
//   try {
//     const { value, error } = registerSchema.validate(req.body);
//     if (error) {
//       return next(error);
//     }
//     value.password = await bcrypt.hash(value.password, 12);
//     const customer = await prisma.customer.create({ data: value });
//     const payload = { CustomerId: Customer.id };
//     const accessToken = jwt.sign(
//       payload,
//       process.env.JWT_SECRET_KEY || "8JncnNqEPncnca7ranc47anda",
//       {
//         expiresIn: process.env.JWT_EXPIRE,
//       }
//     );
//     res.status(201).json({ accessToken });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.login = async (req, res, next) => {
//   try {
//     const { value, error } = loginSchema.validate(req.body);
//     if (error) {
//       console.log(error.name);
//       return next(error);
//     }
//     const customer = await prisma.customer.findFirst({
//       where: {
//         OR: [{ email: value.email }, { phone: value.phone }],
//       },
//     });
//     if (!customer) {
//       return next(createError("invalid credential", 400));
//     }

//     const isMatch = await bcrypt.compare(value.password, customer.password);
//     if (!isMatch) {
//       return next(createError("invalid credential", 400));
//     }
//     const payload = { CustomerId: customer.id };
//     const accessToken = jwt.sign(
//       payload,
//       process.env.JWT_SECRET_KEY || "8ICNd310ncCXaldnenq",
//       { expiresIn: process.env.JWT_EXPIRE }
//     );
//     res.status(200).json({ accessToken });
//   } catch (err) {
//     next(err);
//   }
// };

exports.register = register;
exports.createAdmin = createAdmin;
// exports.login = async (req, res, next) => {
//   try {
//     const { value, error } = loginSchema.validate(req.body);
//     if (error) {
//       console.log(error.name);
//       return next(error);
//     }
//     const customer = await prisma.customer.findFirst({
//       where: {
//         OR: [{ email: value.email }, { phone: value.phone }],
//       },
//     });
//     if (!customer) {
//       return next(createError("invalid credential", 400));
//     }

//     const isMatch = await bcrypt.compare(value.password, customer.password);
//     if (!isMatch) {
//       return next(createError("invalid credential", 400));
//     }
//     const payload = { CustomerId: customer.id };
//     const accessToken = jwt.sign(
//       payload,
//       process.env.JWT_SECRET_KEY || "8ICNd310ncCXaldnenq",
//       { expiresIn: process.env.JWT_EXPIRE }
//     );
//     res.status(200).json({ accessToken });
//   } catch (err) {
//     next(err);
//   }
// };
