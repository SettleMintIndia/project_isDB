import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import API_Auth from "./api/API_Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppLayout from "@/components/layout/AppLayout";

export default function Home() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    display_name: "",
    display_pic: "",
  });

  const handleEdit = () => {
    router.push("/changePassword");
  };

  useEffect(() => {
    const email = localStorage.getItem("useremail");
    console.log("email", email);
    getAdminInfo(email);
  }, []);
  const getAdminInfo = async (email: any) => {
    let dummyemail = 'demo@isdb.com'
    const result = await API_Auth.getAdminInformation(dummyemail)
    console.log(result);
    setUserData(result);
  };

  const handleFileUpload = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fieldname = e.target.name;
    console.log(selectedFile, fieldname);
    const email = localStorage.getItem('useremail')
    console.log("email", email)
    let dummyemail = 'demo@isdb.com'

    let body = {
      email: dummyemail,
      new_image_link: selectedFile.name,
    };
    console.log(body);
    const result = await API_Auth.uploadUserImage(body);
    console.log(result);
    if (result.status == 200) {
      toast.success("Image Uploade Successfully");
      getAdminInfo(dummyemail);
    }
  };
  return (
    <AppLayout>
    <div className="container-fluid">
      <div className="template profile">
        <div className="template-header">
          <div className="back-option"></div>
          <div className="main-header">
            <h1>My Profile</h1>
          </div>
          <div></div>
        </div>
        <div className="user-profile">
          <div className="profile">
            <div className="user-icon">
              {userData.display_pic == null && (
                <img src="imgs/user.svg" alt="" />
              )}
              {userData.display_pic != null && (
                <img
                  src="https://www.shutterstock.com/image-illustration/generic-image-default-avatar-profile-260nw-1902153229.jpg"
                  alt=""
                  className="userImage"
                />
              )}
            </div>
            <div className="file">
              <div className="imageUpload_area">
                <label className="dropzone" htmlFor="dropzone-file">
                  <div>
                    <p>
                      <span> Choose File</span> No file chosen
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    className="hidden"
                    type="file"
                    name="file"
                    placeholder="Item Name"
                    onChange={(e) => handleFileUpload(e)}
                  />
                </label>
                <div className="file-format">
                  <p>JPG, GIF or PNG. Max size of 800k</p>
                </div>
              </div>
            </div>
          </div>
          <div className="user-info">
            <div className="name">
              {" "}
              <label htmlFor="username">Name</label>
              <span id="username">{userData?.display_name}</span>
            </div>
            <div className="email">
              {" "}
              <label htmlFor="fullname"> Email Address</label>
              <span id="fullname">{userData?.email}</span>
            </div>

            <div className="password">
              <label htmlFor="password">Password</label>
              <span id="password">*****</span>
              <button onClick={() => handleEdit()}>
                {" "}
                <Link href="changePassword">
                  <img src="imgs/pencil.svg" alt="" />
                </Link>{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    </AppLayout>
  );
}
