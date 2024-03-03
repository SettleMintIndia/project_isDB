// components/Layout.js
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import API_Auth from "../../pages/api/API_Auth";
import moment from "moment";
import { UserContext } from "@/pages/context";

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
  const [loginKey, setLoginKey] = useState(false)

  useEffect(() => {
    let admin_id = 1;
    getNotifications(admin_id);
    const data = localStorage.getItem("useremail");
    console.log("email", loginuseremail);

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
  const getNotifications = async (id: any) => {
    const admin_notifications = await API_Auth.getNotifications(id);
    console.log("admin_notifications", admin_notifications);

    setTotalNotifications(admin_notifications.notifications);
  };


  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/login")
  }
  return (
    <>
      {loginKey == false ? (
        <><div className={`nav-container ${isNavFixed ? "fixed-nav" : ""}`}>
          {/* <div className="nav-container"> */}
          <div className="nav-logo">
            <Link href="/">
              <img src="/imgs/isdb-logo-layout.png" alt="" />
            </Link>
          </div>
          <div className="navhead-links">
            <ul>
              <li>
                <a href="homepage">
                  How it works
                </a>
              </li>
              <li>
                <a href="faqs">
                  FAQs
                </a>
              </li>
              <li>
                <a href="works">
                  Contact us
                </a>
              </li>
            </ul>
          </div>
          <div className="nav-user"
            onClick={() => handleLogin()}
          >
            <div className="user">
              <div className="username">
                <h4 style={{ textAlign: 'center' }}>Login</h4>
              </div>
            </div>
          </div>
        </div>
        </>) : (
        <>
          <div className={`nav-container ${isNavFixed ? "fixed-nav" : ""}`}>
            <div className="nav-logo">
              <Link href="/">
                <img src="/imgs/isdb-logo-layout.png" alt="" />
              </Link>
            </div>
            <div className="nav-right">
              <div
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
              </ul>
              <div
                className="notification"
                onMouseEnter={() => setTooltipVisible(true)}
                onMouseLeave={() => setTooltipVisible(false)}
              >
                <img src="/imgs/notification.svg" alt="" />
              </div>

              <div className="notification-list">
                <div className="notification-heading">
                  <h4>New Message</h4>
                </div>


                {totalNotifications.map((item: any) => (
                  <div className="notification-details">
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
                    <h4>Name1</h4>
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
      )
      }
     
    </>

  );
};

export default MainLayout;
