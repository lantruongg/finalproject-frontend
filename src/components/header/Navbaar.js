import React, { useContext, useEffect, useState } from "react";
import "./navbaar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { Store } from "../../Store";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { getUserByID, searchProducts } from "../../api";
import { Button } from "@mui/material";
import { Dropdown } from "antd";

const Navbaar = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [keyword, setKeyword] = useState("");
  const [user, setUser] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const searchAllProducts = async () => {
      try {
        const result = await searchProducts(keyword);
        setProducts(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    searchAllProducts();
  }, [keyword]);

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };
  useEffect(() => {
    const filteredResults = products
      .filter((result) =>
        result.title.toLowerCase().includes(keyword.toLowerCase())
      )
      .slice(0, 10);
    setSearchResults(filteredResults);
  }, [keyword, products]);
  const logoutHandler = async () => {
    ctxDispatch({ type: "USER_LOGOUT" });
    localStorage?.removeItem("token");
    window.location.href = "/login";
  };
  useEffect(() => {
    const closeSearchResults = (event) => {
      // Check if the clicked element is not part of the search results list
      const isClickInside = event.target.closest(".search_results");
      if (!isClickInside) {
        setSearchResults([]); // Close the search results list
      }
    };

    document.addEventListener("click", closeSearchResults);

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("click", closeSearchResults);
    };
  }, []);
  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const userID = jwtDecode(token)?._id;
        if (userID) {
          try {
            const result = await getUserByID(userID);
            setUser(result.data);
          } catch (err) {
            toast.error(getError(err));
          }
        }
      }
    };
    getUser();
  }, [state?.token, ctxDispatch]);

  const items = [
    {
      key: "1",
      label: <div onClick={() => navigate("/profile")}>Profile</div>,
    },
    {
      key: "2",
      label: (
        <div onClick={() => navigate("/history-order")}>Order History</div>
      ),
    },
    user.role === "Admin" && {
      key: "3",
      label: <div onClick={() => navigate("/admin")}>Admin</div>,
    },
  ];

  return (
    <header>
      <nav>
        <div className="left">
          <div className="navlogo">
            <NavLink to="/">
              {" "}
              <img src="/amazon_PNG25.png" alt="logo" />
            </NavLink>
          </div>
          <div className="nav_searchbaar">
            <input
              type="text"
              name="search"
              placeholder="Search..."
              value={keyword}
              onChange={handleInputChange}
            />{" "}
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>
          </div>
          {searchResults.length > 0 && (
            <ul className="search_results">
              {searchResults.map((result, index) => (
                <li
                  onClick={() => navigate(`/product/${result._id}`)}
                  key={result._id}
                  style={{ display: "flex", lineHeight: 3 }}
                >
                  <img
                    style={{ width: 50, height: 50, marginRight: 10 }}
                    src={result.photos}
                    alt={result.title}
                  />
                  <span>{result.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="right">
          {!user && (
            <div className="nav-btn">
              <NavLink to="/login">Sign in</NavLink>
            </div>
          )}
          <div className="cart_btn" onClick={() => navigate("/cart")}>
            <Badge badgeContent={state.cart.length} color="primary">
              <ShoppingCartIcon id="icon" />
            </Badge>
            <p>Cart</p>
          </div>
          {user && (
            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
              arrow={{
                pointAtCenter: true,
              }}
            >
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
            </Dropdown>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbaar;
