const { error } = require("console");
const prisma = require("../models/prisma");
// model Booking {
//     id            String     @id
//     customerId    String
//     customer      Customer   @relation(fields: [customerId], references: [id])
//     restaurantId  String
//     restaurant    Restaurant @relation(fields: [restaurantId], references: [id])
//     orderStatus   Int
//     paymentStatus Int
//     totalCustomer Int
//     totalKid      Int
//     createdAt     DateTime   @default(now())
//     bookingTime   DateTime
//     Payment       Payment[]
//     ChatRoom      ChatRoom[]
//   }

//get by customerId
const getBookingByCustomerId = async(req,res,next)=>{
    try{



    }
    catch(error){

    }
}
//get by restaurantId
const getBookingByRestarantId = async(req,res,next)=>{
    try{

    }
    catch(error){

    }
}



//get all
const getAllBooking = async(req,res,next)=>{
    try{

    }
    catch(error){

    }
}

//get by status
const getBookingByStatus = async(req,res,next)=>{
    try{

    }
    catch(error){

    }
}

//userBooking
const userBooking =async(req,res,next)=>{
    try{

    }
    catch(error){

    }
}

//delete booking
const deleteBookingById = async(req,res,next)=>{
    try{

    }catch(error){

    }
}


exports.getBookingByCustomerId = getBookingByCustomerId;
exports.getBookingByStatus = getBookingByStatus;
exports.deleteBookingById = deleteBookingById;
exports.userBooking = userBooking;
exports.getAllBooking = getAllBooking;
exports.getBookingByRestarantId = getBookingByRestarantId;