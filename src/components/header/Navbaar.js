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

const Navbaar = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [keyword, setKeyword] = useState("");
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
