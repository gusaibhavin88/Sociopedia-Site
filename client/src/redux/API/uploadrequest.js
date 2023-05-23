import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });

export const uploadImage = (_id, formdata) => {
  API.post(`/upload/${_id}`, formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      console.log("Image uploaded successfully!");
    })
    .catch((error) => {
      console.error("Image upload failed:", error.response.data.error);
    });
};
