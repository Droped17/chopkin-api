const prisma = require("../models/prisma");
const paymentMiddleware = require("../middleware/paymentMiddleware");
const createError = require("../utils/create-error");
//booking
// id             String     @id @default(uuid())
// customerId     String
// customer       Customer   @relation(fields: [customerId], references: [id], onDelete: Cascade)
// restaurantId   String
// restaurant     Restaurant @relation(fields: [restaurantId], references: [id], onDelete: Cascade)
// orderStatus    Int        @default(0)
// payment        Payment    @relation(fields: [paymentId], references: [id], onDelete: Cascade)
// paymentId      String
// package        Package    @relation(fields: [packageId], references: [id])
// packageId      Int
// totalCustomer  Int
// totalKid       Int        @default(0)
// specialRequest String?
// createdAt      DateTime   @default(now())
// bookingDate    String
// bookingTime    String
// ChatRooms      ChatRoom[]
  
//==use==
//create post | useAuthMiddleware
const customerCreateBooking =async(req,res,next)=>{
    try{
        const data = req.body; //
        console.log(data);
        const packageId = data.packageId;
        const customer = req.user;
        const restaurantId = data.restaurantId;
        const bookingDate = data.bookingDate;
        const bookingTime = data.bookingTime;
        const specialRequest = data.specialRequest;
        const totalKid = data.totalKid;
        const totalCustomer = data.totalCustomer;
        const paymentStatus = data.paymentStatus;
        //validate

        //validate

        //find package
        const selectPackage = await prisma.package.findFirst({
            where:{ 
                id:packageId
            }
        });
        //check package
        if(!selectPackage){
            return next(createError("not found this package",404));
        }

        
        //Validate CustomerBookingData
        
        //Validate CustomerBookingData
        
        const payment = await paymentMiddleware.createPaymentFunction(paymentStatus,next);
        //create booking
        const newBooking =  await prisma.booking.create({
            data:{
                customerId:customer.id,
                restaurantId:restaurantId,
                paymentId:payment.id,
                packageId:selectPackage.id,
                totalCustomer:totalCustomer,
                totalKid:totalKid,
                specialRequest:specialRequest||"",
                bookingDate:bookingDate,
                bookingTime:bookingTime,
            }
        });

        res.status(200).json({message:"create complete",newBooking})
    }
    catch(error){
        next(error);
    }
}



const EditBooking = async(req,res,next)=>{
    try{
        const data = req.body.data;

        const bookingId = req.body.bookingId

        const editBooking = await prisma.booking.update({
            where:{
                id:bookingId
            },
            data:data//match by key
        });

        res.status(200).json({message:"edit complete",editBooking});
    }
    catch(error){
        next(error);
    }
}
//For===payment controller===
// const editPayment = async(req,res,next)=>{
//     try{

//         const data = req.body;
//         const paymentId  = data.paymentId;
//         const status = data.status;

//         const check  = await prisma.payment.findFirst({
//             where:{
//                 id:paymentId
//             }
//         });

//         //check
//         if(!check) next(createError("dont have this payment Id",404));

//         const paymentUpdated = await prisma.payment.update({
//             where:{
//                 id:paymentId
//             },
//             data:{
//                 paymentStatus:status
//             }
//         });
        
//         res.status(200).json({message:"update complete",paymentUpdated});
//     }
//     catch(error){
//         next(error);
//     }
// }

//===before===

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
            },
            include:{
                customer:true,
                package:true
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
        const allBooking = await prisma.booking.findMany({
            include:{
                restaurant:true,customer:true,package:true
            }
        });
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
//get own Booking
const getOwnBooking = async(req,res,next)=>{
    try{
        const my = req.user;
        let allBooking = null;

        if(my.restaurantName){
            allBooking = await prisma.booking.findMany({
                where:{
                    restaurantId:my.id
                }
            });
        }
        else if(my.memberPoint){
            allBooking = await prisma.booking.findMany({
                where:{
                    customerId:my.id
                }
            });
        }
        else{

           return next(createError("not found",404));
        }
        res.status(200).json({message:"get success",allBooking})
    
    }   
    catch(error){
        next(error);
    }
}

//delete booking
const deleteBookingById = async(req,res,next)=>{
    try{
        const bookingId = req.params.bookingId;
        const deleteBooking = await prisma.booking.findFirst({
            where:{
                id:bookingId
            }
        })
        
        if(!deleteBooking){
            return next(createError("not found this booking",404))
        }

        await prisma.booking.delete({
            where:{
                id:bookingId
            }
        });

    }catch(error){
        next(error);
    }
}

//patch
const updateOrderStatusByBookingId = async(req,res,next)=>{
    try{
        //update order status
        const bookingId = req.body.bookingId;
        const orderStatusUpdate = req.body.status;//0,1,2

        const bookingForUpdate = await prisma.booking.findFirst({
            where:{
                id:bookingId
            },
            data:{
                orderStatus:orderStatusUpdate
            }

        });

        res.status(200).json({message:"update Complete",bookingForUpdate});


    }catch(error){
        next(error);
    }
}



exports.updateOrderStatusByBookingId = updateOrderStatusByBookingId;
exports.getBookingByCustomerId = getBookingByCustomerId;
exports.getBookingByStatus = getBookingByStatus;
exports.deleteBookingById = deleteBookingById;
exports.getAllBooking = getAllBooking;
exports.getBookingByRestaurantId = getBookingByRestaurantId;
exports.EditBooking = EditBooking;
exports.customerCreateBooking = customerCreateBooking;
exports.getOwnBooking = getOwnBooking;

// exports.updatePaymentStatus = updatePaymentStatus;