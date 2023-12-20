import React, { useContext, useState } from "react";
import "./signup.css";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../../api";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { Button } from "@mui/material";
import { Store } from "../../Store";
import { Helmet } from "react-helmet-async";

const SignIn = () => {
  const { dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();

  const [logdata, setData] = useState({
    email: "",
    password: "",
  });

  const adddata = (e) => {
    const { name, value } = e.target;

    setData(() => {
      return {
        ...logdata,
        [name]: value,
      };
    });
  };
  const login = async () => {
    try {
      const result = await loginUser(logdata);

      if (result.data) {
        ctxDispatch({ type: "USER_LOGIN", payload: result.data });
        localStorage.setItem("token", result.data.token);
        navigate("/");
      }

      toast.success("User login successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <section>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div className="sign_container">
        <div className="sign_header">
          <img src="./blacklogoamazon.png" alt="signupimg" />
        </div>
        <div className="sign_form">
          <form>
            <h1>Sign-In</h1>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                onChange={adddata}
                value={logdata.email}
                name="email"
                id="email"
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={adddata}
                value={logdata.password}
                name="password"
                placeholder="at least 6 char"
                id="password"
              />
            </div>
            <Button className="signin_btn" onClick={() => login()}>
              Continue
            </Button>
          </form>
        </div>
        <div className="create_accountinfo">
          <p>New Account</p>
          <button>
            {" "}
            <NavLink to="/register">Create your Account</NavLink>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
