import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import sharp from "sharp";
import { Usermodel } from "../Model/Usermodel.js";
import { Postmodel } from "../Model/Postmodel.js";
import fs from "fs";

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage });

// Define route for image upload
router.post("/:_id", upload.single("image"), async (req, res) => {
  const _id = req.params;
  // Access the uploaded image file
  const user = await Usermodel.findById(_id);
  const post = await Postmodel.find({ userId: _id });
  const file = req.file;

  try {
    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Compress the image using sharp
    const compressedImage = await sharp(file.path)
      .resize({ fit: "inside", withoutEnlargement: true, limitPixels: 1000000 })
      .jpeg({ quality: 80 }) // Adjust quality as per your requirements
      .toBuffer();

    // Write the compressed image buffer to a temporary file
    const tempFilePath = `temp_${file.filename}`;
    fs.writeFileSync(tempFilePath, compressedImage);

    // Upload the image file to Cloudinary
    await cloudinary.v2.uploader.upload(
      tempFilePath,
      { public_id: file.filename, folder: "Sociopedia" },

      async (error, result) => {
        if (error) {
          res.status(500).json({ error: "Something went wrong" });
        }

        // Return the Cloudinary image URL
        if (file.filename === `${user._id}_Profile`) {
          user.profileUrl = result.secure_url;
          if (post) {
            post.map(async (post) => {
              post.profileUrl = result.secure_url;
              await post.save();
            });
          }
        }
        if (file.filename === `${user._id}_Cover`) {
          user.coverUrl = result.secure_url;
        }
        await user.save();
        const directory = "./uploads/";
        fs.readdirSync(directory).forEach((file) => {
          const filePath = directory + file;
          fs.rmSync(filePath, { recursive: true });
        });

        // Remove the temporary file
        fs.unlinkSync(tempFilePath);

        res
          .status(200)
          .json({ success: true, message: "Image Updated successfully" });
      }
    );
  } catch (error) {
    console.log(error);
  }
});
export default router;
