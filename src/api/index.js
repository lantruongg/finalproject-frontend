import axios from "axios";
export const token = localStorage.getItem("token");
export const URL = "http://localhost:5000";
const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
});
axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  config.headers["Content-Type"] = "application/json";
  return config;
});
export const loginUser = (user) =>
  axiosInstance.post(`${URL}/users/login/`, { user });
export const registerUser = (user) =>
  axiosInstance.post(`${URL}/users/register/`, {
    user,
  });
export const getUserByID = (id) =>
  axiosInstance.post("/users/getUserByID", { userID: id });
