import { Usermodel } from "../Model/Usermodel.js";
import { sendToken } from "../Utility/sendToken.js";
import bcrypt from "bcrypt";

// Get my profile

export const getMyProfile = async (req, resp) => {
  const user = await Usermodel.findById(req.user._id);
  try {
    resp.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};

// Delete users

export const deleteUser = async (req, resp) => {
  const { id } = req.params;
  const { currentUserId, currentUserAdminStatus } = req.body;

  try {
    if (currentUserId === id || currentUserAdminStatus === true) {
      await Usermodel.findByIdAndDelete(id);
      resp
        .status(200)
        .json({ success: true, message: "User deleted successfully." });
    } else {
      resp
        .status(400)
        .json({ success: false, message: "Only admin have this access." });
    }
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};

// Get all users

export const getAllUser = async (req, resp) => {
  try {
    const authUser = await Usermodel.findById(req.user._id);
    const users = await Usermodel.find();

    const allUsers = users
      .filter((user) => user._id.toString() !== authUser._id.toString()) //need to use String while comparing
      .map((filtered) => {
        const { password, ...otherDetails } = filtered._doc;
        return otherDetails;
      });

    resp.status(200).json({ success: true, users: allUsers });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};

// Update users

export const updateUser = async (req, resp) => {
  const { id } = req.params;
  const { _id, isAdmin, password } = req.body;
  try {
    if (id === _id) {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
        const user = await Usermodel.findByIdAndUpdate(_id, req.body, {
          new: true,
        }).then((updateduser) => {
          const { password, ...otherdetails } = updateduser._doc;
          return otherdetails;
        });
        resp.status(200).json({ success: true, user: user });
      } else {
        const user = await Usermodel.findByIdAndUpdate(_id, req.body, {
          new: true,
        }).then((updateduser) => {
          const { password, ...otherdetails } = updateduser._doc;
          return otherdetails;
        });
        resp.status(200).json({ success: true, user: user });
      }
    } else {
      resp
        .status(400)
        .json({ success: false, message: "User is not matching" });
    }
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};

// Follow user

export const followUser = async (req, resp) => {
  const { profileId, friendId } = req.body;
  try {
    const profileAcc = await Usermodel.findById(profileId);
    const friendAcc = await Usermodel.findById(friendId);
    if (profileAcc.following.includes(friendId)) {
      profileAcc.following.pull(friendId);
      friendAcc.followers.pull(profileId);
    } else {
      profileAcc.following.push(friendId);
      friendAcc.followers.push(profileId);
    }
    await profileAcc.save();
    await friendAcc.save();
    resp.status(200).json({ user: profileAcc });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};
