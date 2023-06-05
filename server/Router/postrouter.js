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
router.get("/:userId/getposts", isAuthenticated, getposts);
router.get("/getpostsurl", isAuthenticated, getpostsUrl);
router.get("/getallposts", isAuthenticated, getAllPosts);
router.put("/likepost", isAuthenticated, likePost);

export default router;
