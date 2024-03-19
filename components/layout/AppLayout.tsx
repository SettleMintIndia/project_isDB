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
const AppLayout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [totalNotifications, setTotalNotifications] = useState([]);
  const [tooltipVisible1, setTooltipVisible1] = useState(false);

  // const [key, setKey] = useState("superadmin"); //superadmin
  const [key, setKey] = useState("admin"); //admin
  const [isNavFixed, setIsNavFixed] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setusername] = useState("");

  const { loginuseremail, setloginuseremail } = useContext(UserContext);


  useEffect(() => {

    const data = localStorage.getItem("useremail");
    console.log("email", data);
    if (data != undefined) {
      let admin_id = 1;
      getNotifications(admin_id);
    }
    const superadminkey = localStorage.getItem("superadmin");
    console.log("superadmin", superadminkey);
    if (superadminkey == "superadmin") {
      setKey("superadmin")
    } else {
      setKey("admin")
    }
    const name = localStorage.getItem("displayname");
    console.log("username", name);
    setusername(name);





    /*  const handleScroll = () => {
       console.log(window.scrollY);
       if (window.scrollY >= 100) {
         setIsNavFixed(true);
       } else {
         setIsNavFixed(false);
       }
     };
 
     window.addEventListener("scroll", handleScroll);
 
     return () => {
       window.removeEventListener("scroll", handleScroll);
     }; */
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

  return (
    <div className="base">
      {/* Navbar */}
      {router.route === "/login" ? (
        <div className="login-nav">
          <Link href="/">
            <img
              src="/imgs/isdb-logo-signin.svg"
              className="isDB-logo"
              alt=""
            />
          </Link>
          <img className="close" src="/imgs/close.svg" alt="" />
        </div>
      ) : (
        // <div className="nav">
        <>
          {router.route != "/templatepdf" && (
            <div className={`nav-container ${isNavFixed ? "fixed-nav" : ""}`}>
              {/* <div className="nav-container"> */}
              <div className="nav-logo">
                <Link href="/">
                  <img src="/imgs/isdb-logo-layout.png" alt="" />
                </Link>
              </div>
              <div
                className="nav-user  us-1"
                onMouseEnter={() => setTooltipVisible1(true)}
                onMouseLeave={() => setTooltipVisible1(false)}
              >
                <div className="use">
                  <img src="/imgs/add.png" alt="" width={30} height={30} />
                </div>
              </div>
              {key == "superadmin" && (
                <ul className="menu-dropdown dp">
                  <li
                    className={
                      router.pathname === "/createtemplate" ||
                        router.pathname === "/createadmin" ||
                        router.pathname === "/runSimulation"
                        ? "active"
                        : ""
                    }
                  >
                    <a href="createtemplate" className="icn">
                      <img src="imgs/template.svg" alt="" />
                      Create Template
                    </a>
                  </li>
                  {router.route === "/runSimulation" ? (
                    <li
                      className={
                        router.pathname === "/runSimulation" ? "active" : ""
                      }
                    >
                      <a href="runSimulation" className="icn">
                        <img src="imgs/run.svg" alt="" />
                        Run Simulation
                      </a>
                    </li>
                  ) : (
                    <li className="active">
                      <a href="createadmin" className="icn">
                        <img src="imgs/admin.svg" alt="" />
                        Create Admin
                      </a>
                    </li>
                  )}
                </ul>
              )}
              {(router.route === "/createtemplate" ||
                router.route === "/createadmin") &&
                key == "superadmin" ? (
                <>
                  <div className="nav-links">
                    <ul>
                      <li
                        className={
                          router.pathname === "/createtemplate" ? "active" : ""
                        }
                      >
                        <a href="createtemplate">
                          <img src="imgs/template.svg" alt="" />
                          Create Template
                        </a>
                      </li>
                      <li
                        className={
                          router.pathname === "/createadmin" ? "active" : ""
                        }
                      >
                        <a href="createadmin">
                          <img src="imgs/admin.svg" alt="" />
                          Create Admin
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <></>
              )}

              {(router.route === "/createtemplate" ||
                router.route === "/runSimulation") &&
                key == "admin" ? (
                <>
                  <div className="nav-links">
                    <ul>
                      <li
                        className={
                          router.pathname === "/runSimulation" ? "active" : ""
                        }
                      >
                        <a href="runSimulation">
                          <img src="imgs/run.svg" alt="" />
                          Run Simulation
                        </a>
                      </li>
                      <li
                        className={
                          router.pathname === "/createtemplate" ? "active" : ""
                        }
                      >
                        <a href="createtemplate">
                          <img src="imgs/template.svg" alt="" />
                          Create Template
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <div style={{ display: "none" }}></div>
              )}
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
          )}
        </>
        // </div>
      )}

      {/* render page */}
      <main className="render-page">{children}</main>
    </div>
  );
};

export default AppLayout;
