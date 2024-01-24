// components/Layout.js
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";

interface LayoutProps {
  children: ReactNode;
}
const AppLayout = ({ children }: LayoutProps) => {
  const router = useRouter();

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
          router.route === "/createadmin" ? (
            <div className="nav-links">
              <ul>
                <li>
                  <a href="#">Create Template</a>
                </li>
                <li>
                  <a href="#">Create Admin</a>
                </li>
              </ul>
            </div>
          ) : (
            <div></div>
          )}

          <div className="nav-user">
            <div className="user">
              <img src="/imgs/user.svg" alt="" />
            </div>
            <div className="user-name">Super Admin</div>
            <div className="down-arrow">
              <img src="/imgs/down-arrow.svg" alt="" />
              <ul className="menu-dropdown">
                <li>
                  <a href="#">My Profile</a>
                </li>
                <li>
                  <a href="#">Template Details</a>
                </li>
                <li>
                  <a href="#">Create Scenario Type</a>
                </li>
                <li>
                  <a href="#">Admins Details</a>
                </li>
                <li className="logout">
                  <a href="#">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* render page */}
      <main className="render-page">{children}</main>
    </div>
  );
};

export default AppLayout;
