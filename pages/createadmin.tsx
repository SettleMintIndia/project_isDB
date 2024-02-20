import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

import API_Auth from './api/API_Auth'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

  const handleCreateAdmin = async() => {
    let error = 0;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    console.log(emailRegex.test(name))

    if (name === "") {
      setNameErr("Please Enter Email");
      error = error + 1;
    } else if (!emailRegex.test(name)) {
      setNameErr("Please Enter Valid Email");
      error = error + 1;

    } else {
      setNameErr("");
      console.log("Incorrect mail")

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

    console.log(error);
    if (error == 0) {
      let body = {
        "email": name,
        "password": password,
        "display_name": username
      }
      console.log(body);

      const result = await API_Auth.createAdmin(body);
      console.log("result", result, result.msg);
      if (result.status == 200) {
        toast.success('Admin Created Successfully')

        setTimeout(() => {
          router.push("/adminDetails")
        }, 2000);
      } else {
        toast.error(result.msg)
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="template">
        <h1>Create Admin</h1>
        <div className="table-responsive">
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="form-content">
                <label htmlFor="name">Email</label>
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
              <div className="form-content">
                <label htmlFor="user-name">User Name</label>
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
                <label htmlFor="password">Create Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleInput}
                  required
                />
                {passwordErr != "" && (
                  <p className="alert-message">{passwordErr}</p>
                )}
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-content">
                <label htmlFor="password1">Confirm Password</label>
                <input
                  type="password"
                  id="password1"
                  name="confirmPwd"
                  value={confirmPwd}
                  required
                  onChange={handleInput}
                />
                {confirmPwdErr != "" && (
                  <p className="alert-message">{confirmPwdErr}</p>
                )}
              </div>
            </div>

            {/*   <input
            className="create-template"
            type="submit"
            value="CREATE ADMIN"
          /> */}
            <button
              className="create-template"
              onClick={() => handleCreateAdmin()}
            >
              CREATE ADMIN
            </button>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}