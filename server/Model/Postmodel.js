import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  desc: {
    required: true,
    type: String,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  imageName: String,
  profileUrl: String,
  likes: [],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const Postmodel = mongoose.model("Posts", postSchema);
