const { upload } = require("../config/cloudinaryService");
const prisma = require("../models/prisma");

exports.updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;
    const updateData = { firstName, lastName };
    if (req.file) {
      const url = await upload(req.file.path);
      updateData.profileImg = url;
    }
    await prisma.customer.update({
      data: updateData,
      where: {
        id: req.user.id,
      },
    });

    res.status(200).json({ message: "Update successful" });
  } catch (err) {
    next(err);
  } finally {
  }
};
