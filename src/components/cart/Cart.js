import { Divider } from "@mui/material";
import React, { useContext } from "react";
import "./cart.css";
import { Store } from "../../Store";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Cart = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const products = state.cart;
  const totalPrice = products.reduce((total, product) => {
    return total + parseFloat(product.price) * product.quantity; // Multiply by quantity
  }, 0);
  const removeFromCart = (id) => {
    ctxDispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const { address, city, email, fullName } = state.shippingAddress;

  return (
    <div className="buynow_section">
      <div className="buynow_container">
        <div className="left_buy">
          <h1>Shopping cart</h1>

          <span className="leftbuyprice">Action</span>

          <Divider />
          {products?.length > 0 &&
            products.map((product) => (
              <div
                className="item_containert"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img
                  src={product.photos}
                  style={{ width: 200, height: 250 }}
                  alt="cart_img"
                />
                <div className="item_details">
                  <h3>{product.title}</h3>
                  {state.cart.map((cartProduct) => {
                    if (cartProduct._id === product._id) {
                      return (
                        <p key={cartProduct._id}>
                          Quantity in cart: {cartProduct.quantity}
                        </p>
                      );
                    }
                    return null;
                  })}
                  <h3>{product.category.name}</h3>
                  <h3 className="deffrentprice">${product.price}</h3>
                  <p className="unusuall">Usually dispatched in 8 day</p>
                  <p>Eligible for Free shipping</p>
                  <img
                    src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png"
                    alt=""
                  />
                </div>
                <div>
                  <Button
                    className="leftbuyprice"
                    style={{
                      alignItems: "center",
                    }}
                    onClick={() => removeFromCart(product._id)}
                  >
                    <DeleteOutlined />
                  </Button>
                </div>
              </div>
            ))}

          <span className="leftbuyprice">Total Price</span>
          <span className="leftbuyprice">${totalPrice.toFixed(2)}</span>
          <span className="leftbuyprice" style={{ marginTop: 15 }}>
            <Button onClick={() => navigate("/shipping")} type="primary">
              Continue to shipping address
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
