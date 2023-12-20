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
export const updateUser = (id, fullName, email, password) =>
  axiosInstance.put(`${URL}/users/profile`, { id, fullName, email, password });
export const getUsers = () => axiosInstance.get("/users/");
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
export const createOrderPaypal = (cost) =>
  axiosInstance.post("/paypal/create-paypal-order", {
    cost,
  });
export const approvePaypal = (data) =>
  axiosInstance.post("/paypal/capture-paypal-order", {
    orderID: data?.orderID,
  });
export const createOrderProduct = (cart, address, totalPrice, userID) =>
  axiosInstance.post("/orders/create", { cart, address, totalPrice, userID });
export const getOrders = () => axiosInstance.get("/orders/");
export const getOrderDetails = (id) =>
  axiosInstance.post("/orders/details", { id });
export const payOrder = (id) => axiosInstance.put(`/orders/${id}/pay`);
export const getMyOrder = (id) =>
  axiosInstance.post("/orders/my-order", { id });
export const getDataChart = () => axiosInstance.get("/orders/chart");
