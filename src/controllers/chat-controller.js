const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
require("dotenv");
// model ChatRoom {
//     id             Int      @id @default(autoincrement())
//     roomId         string
//   }


const GetAllRoom = async(req,res,next)=>{
    const allRoom = await prisma.chatRoom.findMany({});

    res.status(200).json({message:"all resturant",allRoom});
}

const UserCreateRoom = async(req,res,next)=>{
    try{
        const roomId = req.body.roomId;

        //validate
        const isHaveThisRoomId = prisma.chatRoom.findFirst({
            where:{
                roomId:roomId
            }
        })

        if(isHaveThisRoomId) return next(createError("have this roomId:"+isHaveThisRoomId.roomId+"on database",405));

        const newRoom = await prisma.chatRoom.create({
            data:{
                roomId:roomId
            }
        });

        res.status(200).json({message:"create room success||RoomId:"+newRoom.roomId});

    }
    catch(error){
        next(error);
    }
}

const DeleteRoomById = async(req,res,next)=>{
    try{
        const roomId = req.params.roomId;
        const isHaveThisRoomId = await prisma.chatRoom.findFirst({
            where:{
                roomId:roomId
            }
        });

        if(!isHaveThisRoomId)return res

    }
    catch(error){
        next(error);
    }
}

exports.UserCreateRoom = UserCreateRoom;
exports.DeleteRoomById = DeleteRoomById;



