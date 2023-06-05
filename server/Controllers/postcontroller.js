import mongoose from "mongoose";
import { Postmodel } from "../Model/Postmodel.js";
import { Usermodel } from "../Model/Usermodel.js";
import cloudinary from "cloudinary";

// uploadPost

export const uploadPost = async (req, resp) => {
  const { userId, desc, imageName } = req.body;
  const user = await Usermodel.findById(userId);

  try {
    const post = new Postmodel({
      userId,
      desc,
      imageName,
      firstname: user.firstname,
      lastname: user.lastname,
      profileUrl: user.profileUrl,
    });
    const newpost = await post.save();
    resp.status(200).json({ success: true, message: newpost });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};

// getposts

export const getposts = async (req, resp) => {
  const { userId } = req.params;
  const posts = await Postmodel.find({ userId });
  try {
    if (!posts) {
      resp.status(400).json({ success: false, message: "No posts" });
    } else {
      resp.status(200).json({ success: true, message: posts });
    }
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};

// getpostsUrl

export const getpostsUrl = (req, res) => {
  cloudinary.v2.api.resources(
    //v2 must required
    {
      type: "upload",
      prefix: "Sociopedia/", // Optional: specify a folder path to retrieve photos from a specific folder
      max_results: 500, // Optional: adjust the maximum number of results to retrieve
    },
    (error, result) => {
      if (error) {
        console.error("Error fetching photos from Cloudinary:", error);
        return res.status(500).json({ error: "Error fetching photos" });
      } else {
        const photoUrls = result.resources.map((photo) => photo.secure_url);
        return res.status(200).json({ posturl: photoUrls });
      }
    }
  );
};

// getAllPosts

export const getAllPosts = async (req, resp) => {
  const userId = await req.user._id;
  try {
    const currentUserPosts = await Postmodel.find({ userId: userId });
    const followingPosts = await Usermodel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    resp.status(200).json({
      post: currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          const createdAtA = new Date(a.createdAt);
          const createdAtB = new Date(b.createdAt);
          return (createdAtB - createdAtA) / 1000;
        }),
    });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};

// likepost

export const likePost = async (req, resp) => {
  const { postId, profileId } = req.body;
  try {
    const post = await Postmodel.findById(postId);
    if (post.likes.includes(profileId)) {
      post.likes.pull(profileId);
    } else {
      post.likes.push(profileId);
    }
    await post.save();
    resp.status(200).json({ post: post });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};
