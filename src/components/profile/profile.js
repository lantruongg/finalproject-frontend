import React, { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Store } from "../../Store";
import { Form, Input } from "antd";
import { jwtDecode } from "jwt-decode";
import { getUserByID, updateUser } from "../../api";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { Helmet } from "react-helmet-async";
export default function Profile() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [user, setUser] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
  const submitHandler = async (e) => {
    try {
      const token = localStorage.getItem("token");
      const userID = jwtDecode(token)?._id;
      await updateUser(userID, fullName, email, password);
      toast.success("User updated successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className="container small-container" style={{ marginTop: 100 }}>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <h1
        className="my-3"
        style={{ display: "flex", justifyContent: "center" }}
      >
        User Profile
      </h1>
      <Form
        style={{
          maxWidth: 1000,
        }}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
      >
        <Form.Item className="mb-3" label="Full Name">
          <Input
            value={fullName}
            placeholder={user.fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            value={email}
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Item>
        <Form.Item className="mb-3" label="Password">
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Item>
        <Form.Item className="mb-3" label="Confirm Password">
          <Input.Password
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Item>
        <div
          className="mb-3"
          style={{ display: "flex", justifyContent: "end" }}
        >
          <Button onClick={submitHandler}>Update</Button>
        </div>
      </Form>
    </div>
  );
}
