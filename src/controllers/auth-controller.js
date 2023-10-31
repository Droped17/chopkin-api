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
//   id               String            @id
//   restaurantName   String            @unique
//   ownerFirstName   String
//   ownerLastName    String
//   email            String            @unique
//   phone            String            @unique
//   password         String
//   profileImg       String?
//   latitude         String?
//   longitude        String?
//   price            String
//   categoryId       Int
//   category         Category          @relation(fields: [categoryId], references: [id], onDelete: Cascade)
//   districtId       Int?
//   district         District?         @relation(fields: [districtId], references: [id], onDelete: Cascade)
//   nationId         Int
//   nation           Nation            @relation(fields: [nationId], references: [id], onDelete: Cascade)
//   status           Int               @default(0)
//   businessTime     BusinessTime      @relation(fields: [businessTimeId], references: [id])
//   businessTimeId   Int
//   Bookings         Booking[]
//   Reviews          Review[]
//   RestaurantImages RestaurantImage[]
//   Packages         Package[]
// }


// model Category {
//   id                    Int                     @id @default(autoincrement())
//   name                  String                  @unique
//   Restaurants           Restaurant[]
//   RestaurantPendingEdit RestaurantPendingEdit[]
// }

// model District {
//   id                    Int                     @id @default(autoincrement())
//   name                  String
//   Restaurants           Restaurant[]
//   RestaurantPendingEdit RestaurantPendingEdit[]
// }


// id               String            @id
// restaurantName   String            @unique
// ownerFirstName   String
// ownerLastName    String
// email            String            @unique
// phone            String            @unique
// password         String
// profileImg       String?
// latitude         String?
// longitude        String?
// price            String
// categoryId       Int
// category         Category          @relation(fields: [categoryId], references: [id], onDelete: Cascade)
// districtId       Int?
// district         District?         @relation(fields: [districtId], references: [id], onDelete: Cascade)
// nationId         Int
// nation           Nation            @relation(fields: [nationId], references: [id], onDelete: Cascade)
// status           Int               @default(0)
// Bookings         Booking[]
// Reviews          Review[]
// RestaurantImages RestaurantImage[]
// Packages         Package[]
// BusinessTime     BusinessTime[]

const CreateRestaurants = async(req,res,next)=>{
  try{
      
      const data = req.body;
      let category = await prisma.category.findFirst({
        where:{
          name:data.category
        }
      });
      if(!category){
        category = await prisma.category.create({
          name:data.category
        });
      }

      let district= await prisma.district.findFirst({
        where:{
          name:data.district
        }
      });

      if(!district){
        district = await prisma.district.create({
          data:{
            name:data.district
          }
        })
      }
      let nation = await prisma.nation.findFirst({
          where:{
            name:data.nation
          }
      }) 
      if(!nation){
        nation = await prisma.nation.create({
          data:{
            
          }
        })
      }

      const newRestaurants = await prisma.restaurant.create({
        data:{
          restaurantName:data.restaurantName,
          ownerFirstName:data.ownerFirstName,
          ownerLastName:data.ownerLastName,
          email:data.email,
          phone:data.phone,
          latitude:data.latitude,
          longitude:data.longitude,
          price:data.price,
          categoryId:category.id,
          districtId:district.id,
          nationId:nationId,
        }
      })
      
    
  }
  catch{

  }
}


const CustomerRegister = async(req,res,next)=>{
  try
  {
      const { value, error } = registerSchema.validate(req.body);
      if(error)
      {
        next(error);
      }
      //create 
      value.password = await bcrypt.hash(value.password,12);
      const customer = await prisma.customer.create({
          data:{
            firstName:value.firstName,
            lastName:value.lastName,
            memberPoint:0,
            email,
            phone
          }
      })
  }
  catch(error){
    next(error);
  }
}

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
