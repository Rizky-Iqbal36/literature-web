import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const setAuthToken = (token) => {
  if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete API.defaults.headers.common["Authorization"];
};

//dev
/*export const urlAsset = {
  avatar: "http://localhost:5000/public/avatars/",
  thumbnail: "http://localhost:5000/public/thumbnails/",
  file: "http://localhost:5000/public/files/",
};*/

//production
export const urlAsset = {
  avatar: "https://literature-be.herokuapp.com/public/avatars/",
  thumbnail: "https://literature-be.herokuapp.com/public/thumbnails/",
  file: "https://literature-be.herokuapp.com/public/files/",
};
