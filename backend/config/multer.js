const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary.js");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile_images",
    format: async (req, file) => "png", // supports promises as well
    public_id: (req, file) => "computed-filename-using-request",
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
