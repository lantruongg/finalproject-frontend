import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { registerUser } from "../../api";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { getError } from "../../utils.js";
import { Helmet } from "react-helmet-async";
const SignUp = () => {
  const [udata, seetUdata] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const adddata = (e) => {
    const { name, value } = e.target;

    seetUdata((e) => {
      return {
        ...udata,
        [name]: value,
      };
    });
  };
  const register = async () => {
    try {
      await registerUser(udata);
      toast.success("User registered successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <section>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div className="sign_container">
        <div className="sign_header">
          <img src="./blacklogoamazon.png" alt="signupimg" />
        </div>
        <div className="sign_form">
          <form>
            <h1>Sign-Up</h1>
            <div className="form_data">
              <label htmlFor="fullName">Your name</label>
              <input
                type="text"
                onChange={adddata}
                name="fullName"
                id="fullName"
              />
            </div>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                onChange={adddata}
                value={udata.email}
                name="email"
                id="email"
              />
            </div>
            <div className="form_data">
              <label htmlFor="number">Mobile</label>
              <input
                type="text"
                onChange={adddata}
                value={udata.number}
                name="mobile"
                id="mobile"
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={adddata}
                value={udata.password}
                name="password"
                placeholder="at least 6 char"
                id="password"
              />
            </div>
            <div className="form_data">
              <label htmlFor="cpassword">Password Again</label>
              <input
                type="password"
                onChange={adddata}
                value={udata.cpassword}
                name="cpassword"
                placeholder="at least 6 char"
                id="cpassword"
              />
            </div>
            <Button className="signin_btn" onClick={() => register()}>
              Continue
            </Button>
            <div className="signin_info">
              <p>Already have an accout?</p>
              <NavLink to="/login">Sign in</NavLink>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
