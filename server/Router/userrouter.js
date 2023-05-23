import express from "express";
import {
  deleteUser,
  followUser,
  getAllUser,
  getMyProfile,
  updateUser,
} from "../Controllers/usercontroller.js";
// import { isAuthenticated } from "../Middleware/isAuthenticated.js";

const router = express.Router();

router.get("/me/:_id", getMyProfile);
// router.post("/delete/:id", isAuthenticated, deleteUser);
router.get("/getusers", getAllUser);
router.put("/updateuser/:id", updateUser);
router.post("/followuser", followUser);

export default router;
