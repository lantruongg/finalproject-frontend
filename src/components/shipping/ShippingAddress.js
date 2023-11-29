import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../../Store";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import { createOrderProduct } from "../../api";
import { jwtDecode } from "jwt-decode";

export default function ShippingAddress() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { shippingAddress } = state;

  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [email, setEmail] = useState(shippingAddress.email || "");
  const submitHandler = async () => {
    if (fullName && address && city && email) {
      const token = localStorage.getItem("token");
      const userID = jwtDecode(token)?._id;

      const products = state?.cart;
      const totalPrice = products.reduce((total, product) => {
        return total + parseFloat(product.price) * product.quantity; // Multiply by quantity
      }, 0);

      ctxDispatch({
        type: "SAVE_SHIPPING_ADDRESS",
        payload: {
          fullName,
          address,
          city,
          email,
        },
      });
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify({
          fullName,
          address,
          city,
          email,
        })
      );
      const result = await createOrderProduct(
        state?.cart,
        state?.shippingAddress,
        totalPrice,
        userID
      );
      if (result?.data?.order?._id) {
        navigate(`/order/${result?.data?.order?._id}`);
      }
    } else {
      toast.error("Please fill in information");
    }
  };

  return (
    <div style={{ marginTop: 75 }}>
      <div className="container small-container">
        <h1 className="my-3">Shipping Address</h1>
        <Form
          style={{
            maxWidth: 1000,
          }}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
        >
          <Form.Item label="Full Name">
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Item>
          <Form.Item label="Address">
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Item>
          <Form.Item label="City">
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Item>
          <div
            className="mb-3"
            style={{ display: "flex", justifyContent: "end" }}
          >
            <Button type="primary" onClick={(e) => submitHandler(e)}>
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
