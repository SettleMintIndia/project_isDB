import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/listemplates");
  };

  return (
    <div className="container-fluid">
      <nav>
        <div className="logo">IsDB</div>
      </nav>
      <div className="form-container">
        <div className="login-form">
          <h1>Sign In</h1>
          <form>
            <label htmlFor="username">User Name</label>
            <input type="text" id="username" name="username" required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
            {/* <span
              className="show-password-icon"
              onClick={togglePasswordVisibility()}
            >
              &#128065;
            </span> */}
            <label className="checkbox">
              <input
                className="checkbox"
                type="checkbox"
                name="keep_signed_in"
              />{" "}
              Keep me signed in.
            </label>

            <input className="signin-button" type="submit" value="SIGN IN" />
          </form>
        </div>
      </div>
    </div>
  );
}
