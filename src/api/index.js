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
export const getCategory = () => axiosInstance.get("/category/");
export const createCategory = (name) =>
  axiosInstance.post("/category/create", { name });
export const deleteCategory = (id) =>
  axiosInstance.delete(`/category/delete/${id}`);
export const getProducts = () => axiosInstance.get("/products/");
export const createProduct = (product) =>
  axiosInstance.post("/products/create", { product });
export const deleteProduct = (id) =>
  axiosInstance.delete(`/products/delete/${id}`);
export const getProductByID = (id) =>
  axiosInstance.post("/products/details", { id });
export const searchProducts = (keyword) =>
  axiosInstance.get("/products/search", {
    params: {
      keyword,
    },
  });
