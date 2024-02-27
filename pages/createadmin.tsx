import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

import API_Auth from "./api/API_Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [username, setusername] = useState("");
  const [usernameErr, setusernameErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [confirmPwdErr, setConfirmPwdErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [marginTop, setMarginTop] = useState("-30px");

  const handleInput1 = (event) => {
    const { name, value } = event.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPwd") {
      setConfirmPwd(value);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPwd") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };
  const handleInput = (e: any) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === "name") {
      setName(value);
    }
    if (name === "username") {
      setusername(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    if (name === "confirmPwd") {
      setConfirmPwd(value);
    }
  };

  const handleCreateAdmin = async () => {
    let error = 0;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    console.log(emailRegex.test(name));

    if (name === "") {
      setNameErr("Please Enter Email");
      error = error + 1;
    } else if (!emailRegex.test(name)) {
      setNameErr("Please Enter Valid Email");
      error = error + 1;
    } else {
      setNameErr("");
      console.log("Incorrect mail");
    }
    if (username === "") {
      setusernameErr("Please Enter User Name");
      error = error + 1;
    } else {
      setusernameErr("");
    }
    if (password === "") {
      setPasswordErr("Please Enter password");
      error = error + 1;
    } else {
      setPasswordErr("");
    }
    if (confirmPwd === "") {
      setConfirmPwdErr("Please Enter Confirm Password");
      error = error + 1;
    } else if (password != confirmPwd) {
      error = error + 1;

      setConfirmPwdErr("Password Mismatch");
    } else {
      setConfirmPwdErr("");
    }
    setMarginTop("0");

    console.log(error);
    if (error == 0) {
      let body = {
        email: name,
        password: password,
        display_name: username,
      };
      console.log(body);

      const result = await API_Auth.createAdmin(body);
      console.log("result", result, result.msg);
      if (result.status == 200) {
        toast.success("Admin Created Successfully");

        setTimeout(() => {
          router.push("/adminDetails");
        }, 2000);
      } else {
        toast.error(result.msg);
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="template createadmin">
        <div className="template-header">
          <div className="back-option"></div>
          <div className="main-header">
            <h1>Create Admin</h1>
          </div>
          <div></div>
        </div>
        <div className="table-responsive">
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="form-content">
                <label htmlFor="user-name"> Name</label>
                <input
                  type="text"
                  id="user-name"
                  name="username"
                  value={username}
                  required
                  onChange={handleInput}
                />
                {usernameErr != "" && (
                  <p className="alert-message">{usernameErr}</p>
                )}
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-content">
                <label htmlFor="name">Email Address</label>
                <input
                  type="email"
                  id="name"
                  name="name"
                  required
                  value={name}
                  onChange={handleInput}
                />
                {nameErr != "" && <p className="alert-message">{nameErr}</p>}
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="form-content password1">
                <label htmlFor="password"> Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleInput1}
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("password")}
                  style={{
                    position: "relative",
                    bottom: "22px",
                    left: "390px",
                    transform: "translateY(-50%)",
                    border: "none",
                    textDecoration: "underline",
                    fontSize: "12px",
                    width: "fit-content",
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                {passwordErr != "" && (
                  <p className="alert-message">{passwordErr}</p>
                )}
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-content confirm">
                <label htmlFor="password1 ">Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="password1"
                  name="confirmPwd"
                  value={confirmPwd}
                  required
                  onChange={handleInput1}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPwd")}
                  style={{
                    position: "relative",
                    bottom: "22px",
                    left: "390px",
                    transform: "translateY(-50%)",
                    border: "none",
                    textDecoration: "underline",
                    fontSize: "12px",
                    width: "fit-content",
                  }}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
                {confirmPwdErr != "" && (
                  <p className="alert-message">{confirmPwdErr}</p>
                )}
              </div>
            </div>

            <div className="buttoncenter admin" style={{ marginTop }}>
              <button
                className="create-template"
                onClick={() => handleCreateAdmin()}
              >
                Create Admin
              </button>
              <button className="reset">Reset</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
