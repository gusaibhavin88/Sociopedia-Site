import { Postmodel } from "../Model/Postmodel.js";
import { Usermodel } from "../Model/Usermodel.js";
import cloudinary from "cloudinary";

export const uploadPost = async (req, resp) => {
  const { userId, desc, imageName } = req.body;

  try {
    const post = new Postmodel({
      userId,
      desc,
      imageName,
    });
    const newpost = await post.save();
    resp.status(200).json({ success: true, message: newpost });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};

export const likepost = async (req, resp) => {
  const { postId, likerId } = req.body;
  let post = await Postmodel.findOne({ _id: postId });
  try {
    if (post.likes.includes(likerId)) {
      post.likes.pull(likerId);
    } else {
      post.likes.push(likerId);
    }
    await post.save();
    resp.status(200).json({ success: true, message: post });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};

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

// export const getpostsUrl = (req, res) => {
//   cloudinary.v2.api.resources(
//     //v2 must required
//     {
//       type: "upload",
//       prefix: "Sociopedia/", // Optional: specify a folder path to retrieve photos from a specific folder
//       max_results: 500, // Optional: adjust the maximum number of results to retrieve
//     },
//     (error, result) => {
//       if (error) {
//         console.error("Error fetching photos from Cloudinary:", error);
//         return res.status(500).json({ error: "Error fetching photos" });
//       } else {
//         const photoUrls = result.resources.map((photo) => photo.secure_url);
//         return res.status(200).json(photoUrls);
//       }
//     }
//   );
// };

export const getpostsUrl = async (req, res) => {
  const { userId } = req.params;
  try {
    const currentUserPosts = await Postmodel.findOne({ userId });
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
    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
    );
  } catch (error) {}
};