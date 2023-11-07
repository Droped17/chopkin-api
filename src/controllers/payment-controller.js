const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
const paymentMiddleware = require("../middleware/paymentMiddleware");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

//post
const updatePaymentByBookingId = async(req,res,next)=>{
    try{
        const bookingId = req.body.bookingId;
        const paymentStatus = req.body.paymentStatus;//0,1

        const checkBooking = await prisma.booking.findFirst({
            where:{
                id:bookingId
            }
        });
        
        if(!checkBooking) return next(createError("not found this booking",404));

        //stripe pay

        let url = "";
        //update
        const paymentUpdate = await prisma.payment.update({
            where:{
                id:checkBooking.paymentId
            },
            data:{
                paymentStatus:paymentStatus
            }
        });

        res.status(200).json({message:"update payment to:"+paymentStatus,paymentUpdate});
    }
    catch(error){
        next(error);
    }
}
const checkoutByBookingId = async(req,res,next)=>{
    try{
        // const session = await 
    }
    catch(error){
        next(error);
    }
}

//delete cascade

exports.updatePaymentByBookingId = updatePaymentByBookingId;

// app.post("/checkout/card", async (req, res,next) => {
//     try {
//       const session = await stripe.checkout.sessions.create({
//         // payment_method_types: ["card"],
//         mode: "payment",
//         line_items: req.body.items.map(item => {
//           const product = products.get(item.id)
//           return {
//             price_data: {
//               currency: "thb",
//               product_data: {
//                 name: product.name,
//               },
//               unit_amount: product.price,
//             },
//             quantity: item.quantity,
//           }
//         }),
//         success_url: `${process.env.CLIENT_URL}/stripe-checkout-vanilla/client/success.html`,
//         cancel_url: `${process.env.CLIENT_URL}/stripe-checkout-vanilla/client/cancel.html`,
//       })
//       res.json({ url: session.url })
//     } catch (e) {
//       res.status(500).json({ error: e.message })
//     }
//   })