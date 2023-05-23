import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });

export const getUsers = () => API.get("/user/getusers");
export const getMyProfile = (_id) => API.get(`/user/me/${_id}`);
export const followUpdate = (ids) => API.post("user/followuser", ids);
export const updateUser = (id, formdata) =>
  API.put(`/user/updateuser/${id}`, formdata);
