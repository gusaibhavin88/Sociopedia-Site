import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import Authrouter from "./Router/authrouter.js";
import Userrouter from "./Router/userrouter.js";
import Uploadrouter from "./Router/uploadrouter.js";
import cloudinary from "cloudinary";

const app = express();

// parse application/json
app.use(bodyParser.json({ extended: true, limit: "30mb" }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

app.use(cors());
app.use(cookieParser());
dotenv.config();

// Configure Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Connecting to database
mongoose
  .connect(process.env.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

// handle incoming requests
app.use("/auth", Authrouter);
app.use("/user", Userrouter);
app.use("/upload", Uploadrouter);
