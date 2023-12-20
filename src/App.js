import "./App.css";
import Navbaar from "./components/header/Navbaar";
import Newnav from "./components/newnavbaar/Newnavbaar";
import Maincomp from "./components/home/Maincomp";
import Footer from "./components/footer/Footer";
import SignIn from "./components/signup_signin/SignIn";
import SignUp from "./components/signup_signin/SignUp";
import ProductDetails from "./components/productDetails/productDetails.js";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./components/admin/Admin";
import Chart from "./components/chart/chart.js";
import Cart from "./components/cart/Cart.js";
import ShippingAddress from "./components/shipping/ShippingAddress.js";
import Order from "./components/order/Order.js";
import MyOrder from "./components/MyOrders/MyOrder.js";
import { useContext, useEffect, useState } from "react";
import { Store } from "./Store.js";
import { jwtDecode } from "jwt-decode";
import { getUserByID } from "./api/index.js";
import Profile from "./components/profile/profile.js";

function App() {
  const { state } = useContext(Store);
  const [user, setUser] = useState("");
  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const userID = jwtDecode(token)?._id;
        if (userID) {
          const result = await getUserByID(userID);
          setUser(result.data);
        }
      }
    };
    getUser();
  }, [state?.token]);
  return (
    <>
      <Navbaar />
      <ToastContainer position="bottom-center" limit={5} />
      <Newnav />
      <Routes>
        <Route path="/" element={<Maincomp />} />
        <Route path="/shipping" element={<ShippingAddress />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        {user?.role === "Admin" && <Route path="/admin" element={<Admin />} />}
        <Route path="/chart" element={<Chart />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/history-order/" element={<MyOrder />} />
        <Route path="/profile/" element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
