import express from "express";
import {
  deleteUser,
  followUser,
  getAllUser,
  getMyProfile,
  updateUser,
} from "../Controllers/usercontroller.js";
import { isAuthenticated } from "../Middleware/isauthenticated.js";

const router = express.Router();

router.get("/me/", isAuthenticated, getMyProfile);
router.get("/getusers", isAuthenticated, getAllUser);
router.put("/updateuser/:id", isAuthenticated, updateUser);
router.post("/followuser", isAuthenticated, followUser);

export default router;
