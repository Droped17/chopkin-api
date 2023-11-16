const express = require("express");
const router = express.Router();
const {UserCreateRoom,DeleteRoomById} = require("../controllers/chat-controller");

router.post("",UserCreateRoom);
router.delete("",DeleteRoomById);

module.exports = router;
