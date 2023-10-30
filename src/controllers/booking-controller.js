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

// model Payment {
//     id            String    @id @default(uuid())
//     paymentStatus Int       @default(1)
//     Booking       Booking[]
//   }

//get by customerId
const getBookingByCustomerId = async(req,res,next)=>{
    try{
        const customerId = req.params.customerId;

        const allBooking = await prisma.booking.findMany({
            where:{
                customerId:customerId
            }
        });

        res.status(200).json({message:"get booking by ID success",allBooking})

    }
    catch(error){
        next(error);

    }
}
//get by restaurantId
const getBookingByRestaurantId = async(req,res,next)=>{
    try{
        const restaurantId = req.params.restaurantId;
        const allRestaurantBookingData = await prisma.booking.findMany({
            where:{
                restaurantId:restaurantId
            }
        });

        res.status(200).json({message:"getBookingByRestaranId",allRestaurantBookingData});

    }
    catch(error){
        next(error);

    }
}

//get all
const getAllBooking = async(req,res,next)=>{
    try{
        const allBooking = await prisma.booking.findMany();
        res.status(200).json({message:"Get All Booking",allBooking});
    }
    catch(error){
        next(error);
    }
}

//get by status
const getBookingByStatus = async(req,res,next)=>{
    try{
        const status = req.params.status;//0,1,2
        const bookingByStatus = await prisma.booking.findMany({
            where:{
                orderStatus:status
            }
        });

        res.status(200).json({message:"Get Booking By status"},bookingByStatus);
    }
    catch(error){
        next(error);
    }
}
//post
//create booking
//userBooking
const userBooking =async(req,res,next)=>{
    try{
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

        const restaurantId = req.body.restaurantId;
        const customerId = req.body.userId;
        const totalCustomer = req.body.totalCustomer;
        const createdBooking = await prisma.booking.create({
            data:{
                customerId:customerId,
                restaurantId:restaurantId,
                totalCustomer:totalCustomer
            }
        });

        res.status(200).json({message:"create Booking",createdBooking});

    }
    catch(error){
        next(error);

    }
}

//delete booking
const deleteBookingById = async(req,res,next)=>{
    try{
        const bookingId = rea.params.bookingId;
        await prisma.booking.delete({
            where:{
                id:bookingId
            }
        });

    }catch(error){
        next(error);
    }
}

const updateOrderStatus = async(req,res,next)=>{
    try{
        //update order status

    }catch(error){
        next(error);
    }
}



exports.updateOrderStatus = updateOrderStatus;
exports.updatePaymentStatus = updatePaymentStatus;
exports.getBookingByCustomerId = getBookingByCustomerId;
exports.getBookingByStatus = getBookingByStatus;
exports.deleteBookingById = deleteBookingById;
exports.userBooking = userBooking;
exports.getAllBooking = getAllBooking;
exports.getBookingByRestaurantId = getBookingByRestaurantId;