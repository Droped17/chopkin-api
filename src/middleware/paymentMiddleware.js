const prisma = require("../models/prisma");
const createError = require("../utils/create-error");

// model Payment {
//     id            String    @id @default(uuid())
//     paymentStatus Int       @default(1)
//     Booking       Booking[]
//   }


const paymentFunction = {};

const createPaymentFunction = async(paymentStatus,next)=>{
    try{
        console.log(paymentStatus)
        const payment = await prisma.payment.create({
            data:{
                paymentStatus:(paymentStatus===0?paymentStatus:1)
            }
        });
        return payment;
    }
    catch(error){
        next(error);
    }
}
paymentFunction.createPaymentFunction = createPaymentFunction;

module.exports = paymentFunction;