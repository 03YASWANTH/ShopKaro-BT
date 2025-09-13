const cloudinary = require("cloudinary").v2;

const imageUpload = async (req, res, next) => {
  try {
    const { ImageUrl } = req.body;
    if (ImageUrl && typeof ImageUrl === "string") {
      req.Imageurl = ImageUrl;
      return next();
    }

    const file = req.files?.ImageFile || req.files?.ImageUrl;
    if (!file) {
      return res.status(400).json({ success: false, message: "File not provided" });
    }

    // Validate file type
    const supportedTypes = ["jpg", "jpeg", "png", "avif"];
    const fileType = file.name.split(".").pop().toLowerCase();
    if (!supportedTypes.includes(fileType)) {
      return res.status(400).json({ success: false, message: "File type not supported" });
    }

    // Upload to Cloudinary
    const response = await cloudinary.uploader.upload(file.tempFilePath, { folder: "Eomm Admin Data" });

    req.Imageurl = response.secure_url;
    next();

  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({ success: false, message: "Failed to upload image", error });
  }
};
module.exports = imageUpload