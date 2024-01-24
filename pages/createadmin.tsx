import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/createtemplate");
  };

  return (
    <div className="container-fluid">
      <div className="template">
        <h1>Create Admin</h1>
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="form-content">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-content">
              <label htmlFor="user-name">User Name</label>
              <input type="text" id="user-name" name="User Name" required />
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="form-content">
              <label htmlFor="password">Create Password</label>
              <input
                type="password"
                id="password"
                name="Create Password"
                required
              />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-content">
              <label htmlFor="password1">Confirm Password</label>
              <input
                type="password"
                id="password1"
                name="Confirm Password"
                required
              />
            </div>
          </div>

          <input
            className="create-template"
            type="submit"
            value="CREATE ADMIN"
          />
        </div>
      </div>
    </div>
  );
}
