const prisma = require("../models/prisma");
const paymentMiddleware = require("../middleware/paymentMiddleware");
const createError = require("../utils/create-error");


const updatePaymentByBookingId = (req,res,next)=>{
    try{

    }
    catch(error){
        next(error);
    }
}
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