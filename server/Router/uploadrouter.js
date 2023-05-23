import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { Usermodel } from "../Model/Usermodel.js";

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

    // Upload the image file to Cloudinary
    await cloudinary.v2.uploader.upload(
      file.path,
      { public_id: file.filename, folder: "Sociopedia" },

      async (error, result) => {
        if (error) {
          res.status(500).json({ error: "Something went wrong" });
        }

        // Return the Cloudinary image URL
        if (file.filename === "Profile") {
          user.profileUrl = result.secure_url;
        }
        if (file.filename === "Cover") {
          user.coverUrl = result.secure_url;
        }
        await user.save();
        res
          .status(200)
          .json({ success: false, message: "Profile Updated successfully" });
      }
    );
  } catch (error) {
    console.log(error);
  }
});
export default router;
