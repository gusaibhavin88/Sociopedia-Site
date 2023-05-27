import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });

export const uploadPost = (formdata) => API.post("/post/uploadpost", formdata);
export const getAllPosts = (userId) => API.get(`/post/${userId}/getallposts`);
export const getPostUrl = () => API.get("/post/getpostsurl");
