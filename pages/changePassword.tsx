import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import API_Auth from "./api/API_Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordErr, setcurrentPasswordErr] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordErr, setNewPasswordErr] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [marginTop, setMarginTop] = useState("-30px");
 
  const [totalErrors, setTotalErrors] = useState([])

  const handleNewPasswordInput = (event:any) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordInput = (event:any) => {
    setConfirmPassword(event.target.value);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleInput = (e: any) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === "currentPassword") {
      setCurrentPassword(value);
    }
    if (name === "newPassword") {
      setNewPassword(value);
    }
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    }

  }
  const validatePassword = (password: any) => {
    var p = password
    var errors: any = [];
    if (p.length < 8) {
      errors.push("Your password must be at least 8 characters");
    }
    if (p.search(/[a-z]/i) < 0) {
      errors.push("Your password must contain at least one letter.");
    }
    if (p.search(/[0-9]/) < 0) {
      errors.push("Your password must contain at least one digit.");
    }
    console.log(errors);
    if (errors.length > 0) {
      //alert(errors.join("\n"));
      setTotalErrors(errors)
      return false;
    } else {
      setTotalErrors([])
    }
    return true;
  }

  const handleUpdatePassword = async () => {
    let error = 0;
    if (currentPassword === "") {
      setcurrentPasswordErr("Please Enter Current Password");
      error = error + 1;
    } else {
      setcurrentPasswordErr("");
    }
    if (newPassword === "") {
      setNewPasswordErr("Please Enter New Password");
      error = error + 1;
    } else {
      setNewPasswordErr("");
      const data = validatePassword(newPassword)
      console.log(data)
      if (data == true) {
        setNewPasswordErr("")
      } else {
        error = error + 1;

      }
    }
    if (confirmPassword === "") {
      setConfirmPasswordErr("Please Enter Confirm Password");
      error = error + 1;
    } else if (newPassword != confirmPassword) {
      error = error + 1;

      setConfirmPasswordErr("Password Mismatch");
    } else {
      setConfirmPasswordErr("");
    }
    setMarginTop("0");

    console.log(error);
    if (error == 0) {
      const email = localStorage.getItem('useremail')
      console.log("email", email)
      let dummyemail = 'demo@isdb.com'

      let body = {
        "email": dummyemail,
        "old_password": currentPassword,
        "new_password": newPassword
      }
      const result = await API_Auth.updatePassword(body);
      console.log(result)
      if (result.status == 400) {
        toast.error(result.error)
      } else {
        toast.success(result.msg)
        setTimeout(() => {
          router.push("/myprofile");
        }, 2000);
      }
    }
  };
  const handleBack=()=>{
    router.back();
  }

  return (
    <>
      <div className="container-fluid">
        <div className="template edit-password">
          <div className="template-header">
            <div className="back-option" onClick={()=>handleBack()}>
              <img src="imgs/left-arrow.svg" alt="" />
              <p>Back</p>
            </div>
            <div className="main-header">
              <h1>Change Password</h1>
            </div>
            <div></div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="form-content">
                <label htmlFor="password1">Current Password</label>
                <input
                  type="password"
                  id="password1"
                  name="currentPassword"
                  value={currentPassword}
                  required
                  onChange={handleInput}
                />
              </div>
              {currentPasswordErr != "" && (
                <p className="alert-message">{currentPasswordErr}</p>
              )}
            </div>
            <div className="col-md-6 mb-3"></div>

            <div className="col-md-6 mb-3">
              <div className="form-content password1">
                <label htmlFor="password2">New Password</label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="password2"
                  name="newPassword"
                  required
                  value={newPassword}
                  onChange={handleNewPasswordInput}
                />
                <button
                  type="button"
                  onClick={toggleNewPasswordVisibility}
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
                  {showNewPassword ? "Hide" : "Show"}
                </button>
                {newPasswordErr != "" && (
                  <p className="alert-message">{newPasswordErr}</p>
                )}
              </div>
              <div className="passwordvalidation">
                  <ul>
                    {totalErrors.map((item: any) => (
                      <li key={item} className="alert-message">* {item}</li>
                    ))}
                  </ul>
                </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-content confirm">
                <label htmlFor="password3">Confirm New Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="password3"
                  name="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={handleConfirmPasswordInput}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
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
                {confirmPasswordErr != "" && (
                  <p className="alert-message">{confirmPasswordErr}</p>
                )}
              </div>
            </div>
            <div className="change-button" style={{ marginTop }}>
              <button
                className="create-template"
                onClick={handleUpdatePassword}
              >
                Save
              </button>
              <button className="cancel" onClick={()=>handleBack()}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
