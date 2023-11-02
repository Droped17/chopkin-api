const express = require("express");
const router = express.Router();

const resController = require("../controllers/restaurant-controller");
const authenticatedMw = require("../middleware/authenticatedMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get("/all", resController.getAllRes); // GET ALL RESTAURANTS
router.get("/:resId", resController.getResById); // GET RESTAURANT BY ID FOR RESTAURANT PAGE
router.get("/getPendingRes", authenticatedMw, resController.getPendingRes); // GET ALL PENDING RESTAURANTS
router.get("/:nationIndex", resController.getResByNation); // GET RESTAURANTS BY NATIONALITY
router.get("/:catIndex", resController.getResByCat); // GET RESTAURANTS BY CATEGORY
router.delete("/delete/:resId", authenticatedMw, resController.deleteRes); // DELETE RESTAURANT
router.post(
  "/edit",
  authenticatedMw,
  upload.array("image"),
  resController.createEditPending
); // CREATE EDIT PENDING
router.get("/getPendingEdit", authenticatedMw, resController.getEditPending); // GET ALL EDIT PENDINGS
router.delete(
  "/editPending/:pendingId",
  authenticatedMw,
  resController.deleteEditPending
); // DELETE EDIT PENDING
router.patch(
  "/updateStatus/:resId",
  authenticatedMw,
  resController.updateResStatus
); // UPDATE RESTAURANT STATUS

module.exports = router;
