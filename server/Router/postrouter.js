import express from "express";
import {
  getAllPosts,
  getposts,
  getpostsUrl,
  likePost,
  // likepost,
  uploadPost,
} from "../Controllers/postcontroller.js";
import { isAuthenticated } from "../Middleware/isauthenticated.js";

const router = express.Router();

router.post("/uploadpost", isAuthenticated, uploadPost);
// router.post("/likepost", isAuthenticated, likepost);
router.get("/:userId/getposts", isAuthenticated, getposts);
router.get("/getpostsurl", getpostsUrl);
router.get("/:userId/getallposts", isAuthenticated, getAllPosts);
router.put("/likepost", isAuthenticated, likePost);

export default router;
