import React, { createContext, useReducer } from "react";
export const Store = createContext();
const initialState = {
  token: localStorage?.getItem("token") ? localStorage.getItem("token") : null,
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
    default:
      return state;
  }
};
export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
