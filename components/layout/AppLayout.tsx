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
                  <a href="createtemplate">Create Template</a>
                </li>
                <li>
                  <a href="createadmin">Create Admin</a>
                </li>
              </ul>
            </div>
          ) : (
            <div></div>
          )}

          <div className="nav-user">
            <div className="user">
              <img src="/imgs/user.svg" alt="" />
              <p>Super Admin</p>
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
      )}

      {/* render page */}
      <main className="render-page">{children}</main>
    </div>
  );
};

export default AppLayout;
