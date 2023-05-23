import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // minlength: [8, "password should have 8 character"],
    // select: false, //this will not show password in controller
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  profilePicture: String,
  coverPicture: String,
  livesin: String,
  country: String,
  worksAt: String,
  relationship: String,
  profileUrl: String,
  coverUrl: String,
  followers: [],
  following: [],
});

//This is for bcrpt the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(this.password, salt);
  this.password = hashedpassword;
  next();
});

// This is for create Token
userSchema.methods.getJWTtoken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KET, {
    expiresIn: process.env.JWT_EXPIRE_COOKIE * 60 * 60 * 1000,
  });
};

//This is for login functionality
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export const Usermodel = mongoose.model("User", userSchema);
