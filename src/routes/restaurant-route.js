const express = require("express");
const router = express.Router();

const resController = require("../controllers/restaurant-controller");

router.get("/all", resController.getAllRes); // GET ALL RESTAURANTS
router.get("/:resId", resController.getResById); // GET RESTAURANT BY ID FOR RESTAURANT PAGE
router.get("/:nationIndex", resController.getResByNation); // GET RESTAURANTS BY NATIONALITY
router.get("/:catIndex", resController.getResByCat); // GET RESTAURANTS BY CATEGORY
router.post("/create", resController.createRes); // CREATE RESTAURANT
router.delete("/delete", resController.deleteRes);
router.patch("/edit", resController.editRes);
router.patch("/updatestatus", resController.updateResStatus);

module.exports = router;
