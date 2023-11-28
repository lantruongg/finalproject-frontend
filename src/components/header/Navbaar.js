import React, { useContext, useEffect } from "react";
import "./navbaar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import { Store } from "../../Store";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { getUserByID } from "../../api";
import { Button } from "@mui/material";

const Navbaar = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const logoutHandler = async () => {
    ctxDispatch({ type: "USER_LOGOUT" });
    localStorage?.removeItem("token");
    window.location.href = "/login";
  };
  useEffect(() => {
    const getUser = async () => {
      const userID = state?.token?._id;
      if (userID) {
        try {
          const result = await getUserByID(userID);
          ctxDispatch({ type: "SET_DATA", payload: result.data });
        } catch (err) {
          toast.error(getError(err));
        }
      }
    };
    getUser();
  }, [state?.token, ctxDispatch]);
  const user = state.data;
  return (
    <header>
      <nav>
        <div className="left">
          <div className="navlogo">
            <NavLink to="/">
              {" "}
              <img src="./amazon_PNG25.png" alt="logo" />{" "}
            </NavLink>
          </div>
          <div className="nav_searchbaar">
            <input type="text" name="" id="" />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>
          </div>
        </div>
        <div className="right">
          {!user && (
            <div className="nav-btn">
              <NavLink to="/login">Sign in</NavLink>
            </div>
          )}
          <div className="cart_btn">
            <Badge badgeContent={4} color="primary">
              <ShoppingCartIcon id="icon" />
            </Badge>
            <p>Cart</p>
          </div>
          {user && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "white",
                fontSize: 22,
              }}
            >
              <div>
                <img
                  style={{
                    marginRight: 10,
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                  }}
                  src={user.avatar}
                  alt={user.fullName}
                />
              </div>
              <div>{user.fullName}</div>
              <Button onClick={() => logoutHandler()}>Logout</Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbaar;
