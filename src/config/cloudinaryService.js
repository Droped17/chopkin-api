const cloudinary = require("./cloudinary");

exports.upload = async (path) => {
  const result = await cloudinary.uploader.upload(path);
  return result.secure_url;
};
