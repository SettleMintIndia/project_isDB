import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/changePassword");
  };

  return (
    <div className="container-fluid">
      <div className="template">
        <div className="change-password">
          <img src="imgs/left-arrow.svg" alt="" />
          <h1>Change Password</h1>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="form-content">
              <label htmlFor="password1">Current Password</label>
              <input
                type="password"
                id="password1"
                name="current password"
                required
              />
            </div>
          </div>
          <div className="col-md-6 mb-3"></div>

          <div className="col-md-6 mb-3">
            <div className="form-content">
              <label htmlFor="password2">New Password</label>
              <input
                type="password"
                id="password2"
                name="new password"
                required
              />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-content">
              <label htmlFor="password3">Confirm New Password</label>
              <input
                type="password"
                id="password3"
                name="confirm new password"
                required
              />
            </div>
          </div>

          <input className="submit" type="submit" value="SUBMIT" />
        </div>
      </div>
    </div>
  );
}
