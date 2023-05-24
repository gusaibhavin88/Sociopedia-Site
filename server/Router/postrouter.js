import express from "express";
import {
  getposts,
  getpostsUrl,
  likepost,
  uploadPost,
} from "../Controllers/postcontroller.js";

const router = express.Router();

router.post("/uploadpost", uploadPost);
router.post("/likepost", likepost);
router.get("/:userId/getposts", getposts);
router.get("/getpostsurl", getpostsUrl);

export default router;
