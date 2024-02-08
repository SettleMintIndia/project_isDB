// components/Layout.js
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";

interface LayoutProps {
  children: ReactNode;
}
const AppLayout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className="base">
      {/* Navbar */}
      {router.route === "/" ? (
        <Link href="/">
          <img src="/imgs/isdb-logo-signin.svg" className="isDB-logo" alt="" />
        </Link>
      ) : (
        <div className="nav-container">
          <div className="nav-logo">
            <Link href="/">
              <img src="/imgs/isdb-logo-layout.svg" alt="" />
            </Link>
          </div>
          {router.route === "/createtemplate" ||
          router.route === "/createadmin" ||
          router.route === "/runSimulation" ? (
            <div className="nav-links">
              <ul>
                <li>
                  <a href="createtemplate">Create Template</a>
                </li>
                {router.route === "/runSimulation" ? (
                  <li>
                    <a href="runSimulation">Run Simulation</a>
                  </li>
                ) : (
                  <li>
                    <a href="createadmin">Create Admin</a>
                  </li>
                )}
              </ul>
            </div>
          ) : (
            <div></div>
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
              <div className="notification-details">
                <div className="notification-info">
                  <h5>Name1</h5>
                  <p>13min ago</p>
                </div>
                <div className="notification-para">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </p>
                </div>
              </div>
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
                  <p>Super Admin</p>
                </div>
              </div>
              <div className="down-arrow">
                <img src="/imgs/down-arrow.svg" alt="" />
              </div>
            </div>
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
                <Link href="/">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* render page */}
      <main className="render-page">{children}</main>
      {/* <div className="nav-bottom">
        <ul className="nav nav-tabs nav-tabs-bottom">
          <li>
            <a href="homePage">Home Page</a>{" "}
          </li>
          <li>
            <a href="works">How it works</a>{" "}
          </li>
          <li>
            <a href="support">Support</a>{" "}
          </li>
          <li>
            <a href="faqs">Faqs</a>{" "}
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default AppLayout;
