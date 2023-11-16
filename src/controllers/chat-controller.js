const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
require("dotenv");
// model ChatRoom {
//     id             Int      @id @default(autoincrement())
//     roomId         string
//   }


const UserCreateRoom = async(req,res,next)=>{
    try{
        const roomId = req.body.roomId;

        await prisma.chatRoom.create({
            data:{
                
            }
        })

    }
    catch(error){
        next(error);
    }
}

const DeleteRoom = async(req,res,next)=>{
    try{

    }
    catch(error){
        next(error);
    }
}



