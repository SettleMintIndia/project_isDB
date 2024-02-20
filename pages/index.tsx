import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userErr, setUserErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    let error = 0;
    if (username === "") {
      setUserErr("Please enter User Name");
      error = error + 1;
    } else {
      setUserErr("");
    }
    if (password === "") {
      setPasswordErr("Please enter password");
      error = error + 1;
    } else {
      setPasswordErr("");
    }
    console.log(error);
    if (error == 0) {
      router.push("/listemplates");
    }
  };

  const handleInput = async (e: any) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === "username") {
      setUserName(value);
    }

    if (name === "password") {
      setPassword(value);
    }
  };
  return (
    <div className="container-fluid login">
      <div className="row">
        <div className="col-md-6">
          <img src="imgs/login-bg.png" alt="" />
        </div>
        <div className="col-md-6">
          <div className="form-container">
            <div className="login-form">
              <h1>Sign In</h1>
              <div>
                <label htmlFor="username">User Name</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  onChange={handleInput}
                  value={username}
                />
                {userErr != "" && <p className="alert-message">{userErr}</p>}

                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={handleInput}
                />
                {passwordErr != "" && (
                  <p className="alert-message">{passwordErr}</p>
                )}
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

                {/*                         <input className="signin-button" type="submit" value="SIGN IN" />
                 */}
                <button className="signin-button" onClick={() => handleLogin()}>
                  SIGN IN{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
