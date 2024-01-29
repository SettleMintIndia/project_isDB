import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const handleEdit = () => {
    router.push("/changePassword");
  };

  return (
    <div className="container-fluid">
      <div className="template">
        <h1>My Profile</h1>
        <div className="user-profile">
          <div className="profile">
            <div className="user-icon">
              <img src="imgs/user.svg" alt="" />
            </div>
            <div className="file">
              <div className="choose-file">
                <button>Choose File</button>
                <p>No file chosen</p>
              </div>
              <div className="file-format">
                <p>JPG, GIF or PNG. Max size of 800k</p>
              </div>
            </div>
          </div>
          <div className="user-info">
            <div className="name">
              {" "}
              <label htmlFor="fullname"> Name</label>
              <span id="fullname">Muhammed Al-Jasser</span>
            </div>
            <div className="user-name">
              {" "}
              <label htmlFor="username">User Name</label>
              <span id="username">MuhammedJasser</span>
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <span id="password">123456</span>
              <button onClick={() => handleEdit()}>
                {" "}
                <Link href="changePassword">Edit</Link>{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
