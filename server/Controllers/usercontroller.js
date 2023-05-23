import { Usermodel } from "../Model/Usermodel.js";
import { sendToken } from "../Utility/sendToken.js";
import bcrypt from "bcrypt";

// Get my profile

export const getMyProfile = async (req, resp) => {
  const { _id } = req.params;
  const user = await Usermodel.findById(_id);
  try {
    sendToken(resp, 200, user, "Welcome back");
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
  const users = await Usermodel.find();

  const allUsers = users.map((user) => {
    const { password, ...otherdetails } = user._doc;
    return otherdetails;
  });

  try {
    resp.status(200).json({ success: false, user: allUsers });
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

// Upload Image

// export const uploadImage = async (req, resp) => {
//   const file = req.files.file;
//   try {
//     resp.status(200).json({ success: true, message: "Uploaded success FUlly" });
//   } catch (error) {
//     resp.status(500).json({ success: false, message: error.message });
//   }
// };
