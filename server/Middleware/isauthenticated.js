import jwt from "jsonwebtoken";
import { Usermodel } from "../Model/Usermodel.js";

export const isAuthenticated = async (req, resp, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KET);
      req.user = await Usermodel.findById(decoded._id);
    } else {
      resp.status(400).json({ success: false, message: "Login first" });
    }
    next();
  } catch (error) {
    resp.status(500).json("Authentification required");
  }
};
