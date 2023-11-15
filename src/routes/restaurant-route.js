const express = require("express");
const router = express.Router();

const resController = require("../controllers/restaurant-controller");
const authenticatedMw = require("../middleware/authenticatedMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get("/all", resController.getAllRes); // GET ALL RESTAURANTS
router.get("/resById/:resId", resController.getResById); // GET RESTAURANT BY ID FOR RESTAURANT PAGE
router.get("/getPendingRes", authenticatedMw, resController.getPendingRes); // GET ALL PENDING RESTAURANTS
router.get("/resByNation/:nationIndex", resController.getResByNation); // GET RESTAURANTS BY NATIONALITY
router.get("/resByCat/:catIndex", resController.getResByCat); // GET RESTAURANTS BY CATEGORY
router.delete("/delete/:resId", authenticatedMw, resController.deleteRes); // DELETE RESTAURANT
router.post(
  "/edit",
  authenticatedMw,
  upload.single("profileImg"),
  resController.createEditPending
); // CREATE EDIT PENDING

router.get(
  "/getResImgPending",
  authenticatedMw,
  resController.getResImgPending
);

router.get(
  "getImgPendingByResId/:resId",
  authenticatedMw,
  resController.getResImgPendingByResId
);

router.post(
  "/createResImgPending",
  authenticatedMw,
  upload.array("image", 10),
  resController.createResImgPending
);

router.post(
  "/mergeResImgWithTemp",
  authenticatedMw,
  resController.mergeResImgWithTemp
);

router.delete(
  "/deleteAllTempImg/:resId",
  authenticatedMw,
  resController.deleteAllTempImg
);
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

router.patch(
  "/mergeResInfo/:resId",
  authenticatedMw,
  resController.mergeResInfo
); // update res info with temp info

module.exports = router;
