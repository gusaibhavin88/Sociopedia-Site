import { Usermodel } from "../Model/Usermodel.js";
import { sendToken } from "../Utility/sendToken.js";

// Register

export const register = async (req, resp) => {
  const { email, password, firstname, lastname } = req.body;
  let user = await Usermodel.findOne({ email });
  try {
    if (user) {
      resp.status(400).json({
        success: false,
        message: "User already exist with this email",
      });
    } else {
      user = new Usermodel({
        email,
        password,
        firstname,
        lastname,
      });
      const newuser = await user.save();
      sendToken(resp, 200, newuser, "User registered successfully");
    }
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};

// Login

export const login = async (req, resp) => {
  const { email, password } = req.body;
  const user = await Usermodel.findOne({ email });
  try {
    if (!user) {
      resp
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    } else {
      const ismatch = await user.comparePassword(password);
      if (!ismatch) {
        resp
          .status(400)
          .json({ success: false, message: "Invalid email or password" });
      } else {
        sendToken(resp, 200, user, "User login successfully");
      }
    }
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};

// Logout

export const logout = async (req, resp) => {
  try {
    resp
      .clearCookie("token")
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};
