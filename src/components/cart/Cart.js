import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./cart.css";
import { getProductByID } from "../../api";
import { useParams } from "react-router-dom";

const Cart = () => {
  const [product, setProduct] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const getProductDetails = async () => {
      const result = await getProductByID(id);
      setProduct(result.data);
    };
    getProductDetails();
  }, [id]);
  return (
    <div className="cart_section">
      <div className="cart_container">
        <div className="left_cart">
          <img
            src={product.photos}
            style={{ width: 500, height: 400 }}
            alt="cart_img"
          />
          <div className="cart_btn">
            <button className="cart_btn1">Add to Cart</button>
            <button className="cart_btn2">Buy now</button>
          </div>
        </div>
        <div className="right_cart">
          <h3>{product?.category?.name}</h3>
          <h4>{product?.title}</h4>
          <Divider />
          <p className="mrp">M.R.P: ${product?.price}</p>
          <p>
            Deal of the Day: <span style={{ color: "#B12704" }}> $625</span>
          </p>
          <p>
            You save: <span style={{ color: "#B12704" }}> $570 (47%)</span>
          </p>

          <div className="discount_box">
            <h5>
              Discount :<span style={{ color: "#111" }}>Extra 10% off</span>
            </h5>
            <h4>
              Free Delivety{" "}
              <span style={{ color: "#111", fontWeight: 600 }}>Oct 8-21</span>{" "}
              Details
            </h4>
            <p>
              Fastest delivery:{" "}
              <span style={{ color: "#111", fontWeight: 600 }}>
                Tomorrow 11AM
              </span>{" "}
            </p>
          </div>
          <p className="description">
            About the Item :
            <span
              style={{
                color: "#565959",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.4px",
              }}
            >
              {product?.description}
            </span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
