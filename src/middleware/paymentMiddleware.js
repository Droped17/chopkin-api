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
                paymentStatus:(paymentStatus?paymentStatus:0)
            }
        });
        return payment;
    }
    catch(error){
       return next(error);
    }
}
const updatePayment = async(paymentId,paymentStatus,next)=>{
    try{
        const updatePayment = await prisma.payment.update({
            where:{
                id:paymentId
            },
            data:{
                paymentStatus:paymentStatus
            }
        });
        return updatePayment
    }
    catch(error){
       return null
    }
}
paymentFunction.createPaymentFunction = createPaymentFunction;
paymentFunction.updatePayment = updatePayment;
module.exports = paymentFunction;