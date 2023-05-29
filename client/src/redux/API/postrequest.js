import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });

API.interceptors.request.use((req) => {
  const token = JSON.parse(localStorage.getItem("token"));

  if (token) {
    req.headers.Authorization = `Bearer ${token.token}`;
  }

  return req;
});

export const uploadPost = (formdata) => API.post("/post/uploadpost", formdata);
export const getAllPosts = (userId) => API.get(`/post/${userId}/getallposts`);
export const getPostUrl = () => API.get("/post/getpostsurl");
export const likePost = (formdata) => API.put("/post/likepost", formdata);
