import React, { createContext, useReducer } from "react";
export const Store = createContext();
const initialState = {
  token: localStorage?.getItem("token") ? localStorage.getItem("token") : null,
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
};
const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, token: action.payload };
    case "USER_LOGOUT":
      return { ...state, token: null };
    case "GET_USER":
      return { ...state, token: action.payload };
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "ADD_TO_CART":
      const updatedCart = [...state.cart, action.payload];
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save cart to localStorage
      return { ...state, cart: updatedCart };
    case "REMOVE_FROM_CART":
      const filteredCart = state.cart.filter(
        (item) => item._id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(filteredCart)); // Save updated cart to localStorage
      return { ...state, cart: filteredCart };
    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        shippingAddress: action.payload,
      };

    default:
      return state;
  }
};
export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
