import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import API_Auth from './api/API_Auth'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordErr, setcurrentPasswordErr] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordErr, setNewPasswordErr] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordErr, setConfirmPasswordErr] = useState('');


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
  const handleUpdatePassword = async() => {
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
    }
    if (confirmPassword === "") {
      setConfirmPasswordErr("Please Enter Confirm Password");
      error = error + 1;
    }
    else if (newPassword != confirmPassword) {
      error = error + 1;

      setConfirmPasswordErr("Password Mismatch");
    } else {
      setConfirmPasswordErr("");
    }
    console.log(error);
    if (error == 0) {
      const email = localStorage.getItem('useremail')
      console.log("email", email)
      let dummyemail = 'demo4@gmail.com'

      let body = {
        "email": dummyemail,
        "old_password": currentPassword,
        "new_password": newPassword
      }
      const result=await API_Auth.updatePassword(body);
      console.log(result)
      if(result.status==400){
        toast.error(result.error)
      }else{
        toast.success(result.msg)
        setTimeout(() => {
          router.push("/myprofile")
        }, 2000);

      }

    }
  }

  return (
    <>
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
            <div className="form-content">
              <label htmlFor="password2">New Password</label>
              <input
                type="password"
                id="password2"
                name="newPassword"
                required
                value={newPassword}
                onChange={handleInput}
              />
            </div>
            {newPasswordErr != "" && (
              <p className="alert-message">{newPasswordErr}</p>
            )}
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-content">
              <label htmlFor="password3">Confirm New Password</label>
              <input
                type="password"
                id="password3"
                name="confirmPassword"
                required
                value={confirmPassword}
                onChange={handleInput}
              />
            </div>
            {confirmPasswordErr != "" && (
              <p className="alert-message">{confirmPasswordErr}</p>
            )}
          </div>

          {/*           <input className="submit" type="submit" value="SUBMIT" />
 */}
          <button className="create-template" onClick={() => handleUpdatePassword()} >SUBMIT</button>

        </div>
      </div>
    </div>
    <ToastContainer/>
    </>
  );
}
