const express = require("express");
const router = express.Router();

const resController = require("../controllers/restaurant-controller");

router.get("/all", resController.getAllRes); // GET ALL RESTAURANTS
router.get("/:resId", resController.getResById); // GET RESTAURANT BY ID FOR RESTAURANT PAGE
router.get("/getPendingRes", resController.getPendingRes); // GET ALL PENDING RESTAURANTS
router.get("/:nationIndex", resController.getResByNation); // GET RESTAURANTS BY NATIONALITY
router.get("/:catIndex", resController.getResByCat); // GET RESTAURANTS BY CATEGORY
router.delete("/delete/:resId", resController.deleteRes); // DELETE RESTAURANT
router.patch("/edit/:resId", resController.createEditPending); // CREATE EDIT PENDING
router.get("/getPendingEdit", resController.getEditPending); // GET ALL EDIT PENDINGS
router.delete("/editPending/:resId", resController.deleteEditPending); // DELETE EDIT PENDING
router.patch("/updateStatus/:resId", resController.updateResStatus); // UPDATE RESTAURANT STATUS

module.exports = router;
