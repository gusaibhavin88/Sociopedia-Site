import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import Authrouter from "./Router/authrouter.js";
import Userrouter from "./Router/userrouter.js";

const app = express();

// parse application/json
app.use(bodyParser.json({ extended: true, limit: "30mb" }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

app.use(cors());
app.use(cookieParser());
dotenv.config();

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

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

// handle incoming POST requests
app.use("/auth", Authrouter);
app.use("/user", Userrouter);
