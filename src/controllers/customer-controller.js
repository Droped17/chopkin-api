const { upload } = require("../config/cloudinaryService");
const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
const fs = require("fs/promises");

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

		res.status(200).json({ message: "Update successful", updateData });
	} catch (err) {
		next(err);
	} finally {
		if (req.file) {
			fs.unlink(req.file.path);
		}
	}
};

exports.getAllCus = async (req, res, next) => {
	try {
		if (!req.user.isAdmin) {
			next(createError("You're unauthorized", 401));
			return;
		}
		const allCus = await prisma.customer.findMany();
		res.status(200).json(allCus);
	} catch (err) {
		next(err);
	}
};
