const express = require("express");
const router = express.Router();
const {
	UserCreateRoom,
	DeleteRoomById,
	GetAllRoom,
} = require("../controllers/chat-controller");

// chat/roomId:

router.get("/roomAll", GetAllRoom);
router.post("/create", UserCreateRoom);
router.delete("/delete/:roomId", DeleteRoomById);

module.exports = router;
