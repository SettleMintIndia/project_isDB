// components/Layout.js
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import API_Auth from "../../pages/api/API_Auth";
import moment from "moment";
import { UserContext } from "@/pages/context";
import Image from "next/image";

interface LayoutProps {
  children: ReactNode;
}
const MainLayout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [totalNotifications, setTotalNotifications] = useState([]);

  const [key, setKey] = useState("superadmin"); //superadmin
  // const [key, setKey] = useState("admin"); //admin
  const [isNavFixed, setIsNavFixed] = useState(false);
  const [email, setEmail] = useState("");
  const { loginuseremail, setloginuseremail } = useContext(UserContext);
  const [loginKey, setLoginKey] = useState(false);
  const [username, setusername] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("useremail");
    const id = localStorage.getItem("userid")
    console.log("user_id", id)
    if (id != undefined) {

      getNotifications(id);

      setLoginKey(true)

    }

    const superadminkey = localStorage.getItem("superadmin");
    console.log("superadmin", superadminkey);
    if (superadminkey == "superadmin") {
      setKey("superadmin");
    } else {
      setKey("admin");
    }
    const name: any = localStorage.getItem("displayname");
    console.log("username", name);
    setusername(name);

    const handleScroll = () => {
      console.log(window.scrollY);
      if (window.scrollY >= 10) {
        setIsNavFixed(true);
      } else {
        setIsNavFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [email]);
  const getEmailInfo = async (email: any) => {
    const result = await API_Auth.getAdminInformation(email);
    console.log(result);
    getNotifications(result.id);
  };
  const getNotifications = async (id: any) => {
    const admin_notifications = await API_Auth.getNotifications(id);
    console.log("admin_notifications", admin_notifications);
    setTotalNotifications(admin_notifications.notifications);
  };

  const handleDismissNotications = () => {
    setTooltipVisible(true)
    const id = localStorage.getItem("userid")
    console.log("user_id", id)
    if (id != undefined) {

      getNotifications(id);
    } else {
      setTotalNotifications([])
    }
  }
  const handleDismissNotications1 = () => {
    setTooltipVisible(false)
    const id = localStorage.getItem("userid")
    console.log("user_id", id)
    if (id != undefined) {
      getDismissNotifications(id);
    } else {
      setTotalNotifications([])
    }
  }
  const getDismissNotifications = async (id: any) => {
    const admin_notifications = await API_Auth.getDismissNotifications(id);
    console.log("admin_notifications", admin_notifications);

    setTotalNotifications([]);
  };




  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
    window.location.reload();
  };

  const handleLogin = () => {
    router.push("/login");
  };
  return (
    <>
      {loginKey == false ? (
        <>
          <div
            className="nav-container landing"
          // style={{ position: "fixed", width: "96%", margin: "32px" }}
          >
            <div className="nav-logo">
              <Link href="/">
                <img src="/imgs/IsDBI_Logo.svg" alt="" />
              </Link>
            </div>
            <div className="navhead-links">
              <ul>
                <li>
                  <a href="#worksection">How it works</a>
                </li>
                <li>
                  <Link href="#faqsection">FAQs</Link>
                </li>
                <li>
                  <Link href="#contactsection">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className="rightnav">
              <div className="nav-user landing" onClick={() => handleLogin()}>
                <div className="user">
                  <div className="username">
                    <h4 style={{ textAlign: "center" }}>Sign In</h4>
                  </div>
                </div>
              </div>
              <div
                className="menu landing"
                onMouseEnter={() => setTooltipVisible(true)}
                onMouseLeave={() => setTooltipVisible(false)}
              >
                <img src="/imgs/menu.svg" alt="" />
              </div>
              <ul className="menu-list">
                <li>
                  <Link href="#worksection">How It Works </Link>
                </li>
                <li>
                  <Link href="#faqsection">FAQs</Link>
                </li>
                <li>
                  <Link href="#contactsection">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={`nav-container ${isNavFixed ? "fixed-nav" : ""}`}>
            <div className="nav-logo">
              <Link href="/">
                <img src="/imgs/IsDBI_Logo.svg" alt="" />
              </Link>
            </div>
            <div className="nav-right">
              {/*  <div
                className="menu"
                onMouseEnter={() => setTooltipVisible(true)}
                onMouseLeave={() => setTooltipVisible(false)}
              >
                <img src="/imgs/menu.svg" alt="" />
              </div>
              <ul className="menu-list">
                <li>
                  <Link href="#">Home</Link>
                </li>
                <li>
                  <Link href="#">About Product</Link>
                </li>
                <li>
                  <Link href="#">How It Works </Link>
                </li>
                <li>
                  <Link href="#">FAQs</Link>
                </li>
                <li>
                  <Link href="#">Contact Us</Link>
                </li>
              </ul> */}
              <div
                className="notification"
                onMouseEnter={() => handleDismissNotications()}
                onMouseLeave={() => handleDismissNotications1()}
              >
                <div className="countInfo">{totalNotifications.length}</div>

                <img src="/imgs/notification.svg" alt="" />
              </div>

              <div className="notification-list">
                <div className="notification-heading">
                  <h4>New Message</h4>
                </div>

                {totalNotifications.map((item: any) => (
                  <div className="notification-details" key={item.id}>
                    <div className="notification-info">
                      <h5>{item.source}</h5>
                      <p>
                        {" "}
                        {moment(item.created_timestamp).format("MM/DD/YYYY")}
                      </p>
                    </div>
                    <div className="notification-para">
                      <p>{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="nav-user"
                onMouseEnter={() => setTooltipVisible(true)}
                onMouseLeave={() => setTooltipVisible(false)}
              >
                <div className="user">
                  <img src="/imgs/user.svg" alt="" />
                  <div className="username">
                    <h4>{username}</h4>
                    <p>{key == "superadmin" ? "Super Admin" : "Admin"} </p>
                  </div>
                </div>
                <div className="down-arrow">
                  <img src="/imgs/down-arrow.svg" alt="" />
                </div>
              </div>
              {key == "superadmin" && (
                <ul className="menu-dropdown">
                  <li>
                    <Link href="myprofile">My Profile</Link>
                  </li>
                  <li>
                    <Link href="templateDetails">Template Details</Link>
                  </li>
                  <li>
                    <Link href="scenarioType">Create Scenario Type</Link>
                  </li>
                  <li>
                    <Link href="adminDetails">Admins Details</Link>
                  </li>
                  <li className="logout">
                    <a onClick={() => handleLogout()}>Logout</a>
                  </li>
                </ul>
              )}

              {key == "admin" && (
                <ul className="menu-dropdown">
                  <li>
                    <Link href="myprofile">My Profile</Link>
                  </li>
                  <li>
                    <Link href="mytemplates">My Templates</Link>
                  </li>
                  <li>
                    <Link href="simulationhistory">Simulation History</Link>
                  </li>
                  <li>
                    <Link href="request_scenarioType">
                      Scenario Type Creation Request
                    </Link>
                  </li>
                  <li className="logout">
                    <a onClick={() => handleLogout()}>Logout</a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </>
      )}
      <main className="render-page">{children}</main>
    </>
  );
};

export default MainLayout;
