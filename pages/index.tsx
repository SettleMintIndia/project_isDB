import { useState } from "react";
import { useRouter } from "next/router";
import API_Auth from "./api/API_Auth";

export default function Home() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userErr, setUserErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const router = useRouter();
  const [err, setErr] = useState("");

  const handleLogin = async () => {
    let error = 0;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userEmail === "") {
      setUserErr("Please Enter  Email");
      error = error + 1;
    } else if (!emailRegex.test(userEmail)) {
      setUserErr("Please Enter Valid Email");
      error = error + 1;
    } else {
      setUserErr("");
    }
    if (password === "") {
      setPasswordErr("Please Enter Password");
      error = error + 1;
    } else {
      setPasswordErr("");
    }
    console.log(error);
    /*  if (error == 0) {
       router.push("/listemplates");
     } */
    if (error == 0) {
      let body = {
        email: userEmail,
        password: password,
      };
      console.log(body);
      router.push("/createtemplate");
      /* 
      const result = await API_Auth.getLogin(body);
      console.log("result", result);
      if (result.status == 400) {
        setErr(result.error)
      } else {
        localStorage.setItem("useremail", result.email)
        localStorage.setItem("superadmin", result.isSuper);
        localStorage.setItem("displayname", result.display_name)
        router.push('/createtemplate')
      } */
    }
  };

  const handleInput = async (e: any) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === "userEmail") {
      setUserEmail(value);
    }

    if (name === "password") {
      setPassword(value);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="container-fluid login">
      <div className="row">
        <div className="col-md-6 img">
          <img src="imgs/login-bg.png" alt="" />
        </div>
        <div className="col-md-6 form">
          <div className="form-container">
            <div className="login-form">
              <h1>Sign In</h1>
              <div>
                <label htmlFor="username">Email Address</label>
                <input
                  type="text"
                  id="userEmail"
                  name="userEmail"
                  required
                  onChange={handleInput}
                  value={userEmail}
                />
                {userErr != "" && <p className="alert-message">{userErr}</p>}

                <label htmlFor="password">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={handleInput}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "relative",
                    bottom: "30px",
                    left: "230px",
                    transform: "translateY(-50%)",
                    border: "none",
                    textDecoration: "underline",
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

                {passwordErr != "" && (
                  <p className="alert-message">{passwordErr}</p>
                )}
                {/* <span
              className="show-password-icon"
              onClick={togglePasswordVisibility()}
            >
              &#128065;
            </span> */}
                <label id="checkbox">
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
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
