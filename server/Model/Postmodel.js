import mongoose from "mongoose";
import moment from "moment";

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
    default: moment().toDate(),
  },
});

export const Postmodel = mongoose.model("Posts", postSchema);
