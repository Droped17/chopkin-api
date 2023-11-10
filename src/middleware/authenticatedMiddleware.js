const jwt = require("jsonwebtoken");
// const { registerSchema, loginSchema } = require("../validators/auth-validator");
require("dotenv");
const prisma = require("../models/prisma");
const createError = require("../utils/create-error");

const authenticated = async(req,res,next)=>{
    try{
        const authorization = req.headers.authorization;
       
        //validate
        if(!authorization||!authorization.startsWith("Bearer ")){
            return next(createError("something wrong",400));
        }
        const token = authorization.split("Bearer ")[1];
        
        const payload = jwt.verify(token,process.env.JWT_SECRET_KEY||"8JncnNqEPncnca7ranc47anda");
        let user = null

        //check payload
        //customerId
        if(payload.customerId){
            user = await prisma.customer.findUnique({
                where:{
                    id:payload.customerId
                }
            });
        }
        //adminId
        if(payload.adminId){
            user = await prisma.admin.findUnique({
                where:{
                    id:payload.adminId
                }
            })
        }
        //restaurantId
        if(payload.restaurantId){
            user = await prisma.restaurant.findUnique({
                where:{
                    id:payload.restaurantId
                }
            });
        }
        if(!user){
            return next(createError("unauthenticated",401));
        }
        delete user.password;
        req.user = user;
        next();

    }
    catch(error){
        if(error.name ==="TokenExpiredError"||error.name ==="JsonWebTokenError")
        {
            error.statusCode=401;
            return next(error);
        }
        next(error);
    }
}

module.exports = authenticated;


