import { Divider } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "./productDetails.css";
import { getProductByID } from "../../api";
import { useParams } from "react-router-dom";
import { Store } from "../../Store";

const ProductDetails = () => {
  const [product, setProduct] = useState("");
  const { id } = useParams();
  const { state, dispatch } = useContext(Store);
  console.log(state);
  useEffect(() => {
    const getProductDetails = async () => {
      const result = await getProductByID(id);
      setProduct(result.data);
    };
    getProductDetails();
  }, [id]);
  const handleAddToCart = () => {
    if (product) {
      const existingProductIndex = state.cart.findIndex(
        (p) => p._id === product._id
      );

      if (existingProductIndex !== -1) {
        // If the product already exists in the cart, increment its quantity
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].quantity += 1;
        dispatch({ type: "UPDATE_CART", payload: updatedCart });
      } else {
        // If the product doesn't exist in the cart, add it with quantity 1
        dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity: 1 } });
      }
    }
  };

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
            <button className="cart_btn1" onClick={handleAddToCart}>
              Add to Cart
            </button>
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

export default ProductDetails;
