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

    // Set the target file size in bytes (1MB)
    const targetFileSize = 1 * 1024 * 1024;
    let quality = 90; // Initial quality value
    let compressedImage;

    // Reduce image quality progressively until the size is within the desired limit
    do {
      compressedImage = await sharp(file.path)
        .resize({
          fit: "inside",
          withoutEnlargement: true,
          limitPixels: 1000000,
        })
        .jpeg({ quality })
        .toBuffer();

      quality -= 10; // Decrease quality by 10 for each iteration
    } while (compressedImage.length > targetFileSize && quality >= 10);

    if (compressedImage.length > targetFileSize) {
      // Handle the case where the image cannot be compressed within the desired limit
      return res
        .status(400)
        .json({ success: false, message: "Image size exceeds the limit" });
    }

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
