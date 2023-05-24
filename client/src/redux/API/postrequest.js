import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });

export const uploadPost = (formdata) => API.post("/post/uploadpost", formdata);
