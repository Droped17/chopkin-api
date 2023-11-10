const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
// const paymentMiddleware = require("../middleware/paymentMiddleware");

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

//stripe
const checkout = async(req,res,next)=>{
    try{





    }
    catch(error){
        next(error);
    }
}



//stripe

const getPaymentByBookingId = async(req,res,next)=>{
    try{
        const bookingId = req.params.bookingId;

        const booking  = await prisma.booking.findFirst({
            where:{
                id:bookingId
            },
            include:{
                payment:true
            }
        });

        if(!booking){
            return next(createError("dont have this bookingId"));
        }

        res.status(200).json({message:"get payment",booking});
    }
    catch(error){
        next(error);
    }
}

//post
const updatePaymentByBookingId = async(req,res,next)=>{
    try{
        const bookingId = req.body.bookingId;
        // const paymentStatus = +req.body.paymentStatus;//0,1
        // console.log(bookingId)
        const checkBooking = await prisma.booking.findFirst({
            where:{
                id:bookingId
            }
        });
        
        if(!checkBooking) return next(createError("not found this booking",404));

        //use stripe pay
        const url = await checkoutByBookingId(req,res,next);
        
        //check url
        
        // if(url!= "f") return next(createError("fail paying",500));
        // console.log(checkBooking.paymentId)
        //update
        const paymentUpdate = await prisma.payment.update({
            where:{
                id:checkBooking.paymentId
            },
            data:{
                paymentStatus:1
            }
        });

        res.status(200).json({message:"update payment to:"+paymentStatus,paymentUpdate,url});
    }
    catch(error){
        next(error);
    }
}

//pay stripe
const checkoutByBookingId = async(req,res,next)=>{
    try{
        const packageName = req.body.packageName;
        const packagePrice = +req.body.packagePrice;
        // console.log(packageName);
        const session = await stripe.checkout.session.create({
            made:"payment",
            line_items:{
                price_data:{
                    currency:"thb",
                    product_data:{
                        name:packageName
                    },
                    unit_amount:packagePrice
                },
                quantity:1,
            },
            success_url:"s",
            cancel_url:"c",
        });
      
        // res.status(200).json({message:"Pay Success",url:session.url});
        return session.url;
    }
    catch(error){
        next(error);
    }
}

//delete cascade

exports.updatePaymentByBookingId = updatePaymentByBookingId;
exports.getPaymentByBookingId = getPaymentByBookingId;
// exports.checkoutByBookingId = checkoutByBookingId;


//edit paymentBy Id
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
