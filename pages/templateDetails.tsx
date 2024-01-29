import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "@/node_modules/next/link";

export default function Home() {
  const router = useRouter();

  const handleEdit = () => {
    router.push("/templateDetails");
  };

  return (
    <div className="container-fluid">
      <div className="template">
        <div className="head">
          <h1>Template Details</h1>
          <button>
            <img src="/imgs/plus.svg" alt="" /> CREATE TEMPLATE
          </button>
        </div>
        <div className="total-template">
          <p>20 Templates</p>
        </div>
        <div className="filterArea">
          <div className="totalReport">
            <label htmlFor="">Total :</label>
            <span>40 Reports</span>
          </div>
          <div className="filterRight">
            <div className="dateFilter">
              <select name="" id=""></select>
            </div>

            <div className="searchFilter">
              <input type="text" placeholder="Search by file name" />
            </div>
          </div>
        </div>

        <div className="report-content table-responsive">
          <table className="table">
            <thead>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>

                <td></td>
              </tr>
            </thead>
            <tbody>
              return (
              <tr>
                <td>
                  <span className="hashtxt"></span>{" "}
                  <button className="copybtn">
                    <img src="/copy.svg" alt="copy" />
                  </button>
                </td>
                <td>
                  <span className="hashtxt"></span>
                  <button className="copybtn">
                    <img src="/copy.svg" alt="copy" />
                  </button>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <span className="info-icon">
                    <span className="error-tooltip">
                      <label className="tool-info">
                        <img src="error.svg" alt="error" />
                        <p></p>
                      </label>
                    </span>
                  </span>
                  )
                </td>
                <td>
                  <button className="downlaod-btn">
                    <img src="/download.svg" alt="download" />
                  </button>
                </td>
                <td>
                  <button className="downlaod-btn">
                    <img src="/download.svg" alt="download" />
                  </button>
                </td>

                <td>
                  <button className="match-btn">
                    <Link href="/verify"></Link>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pagging-area">
          {/* toolbar */}
          <div className="toolbar">
            <label htmlFor=""></label>
            <div className="tooldrop">
              <select>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
            <span></span>
          </div>
          {/* pagging info */}

          <div className="pagging-list">
            <div className="leftaction ">
              <img src="/left-arrow-inactive.svg" alt="" />

              <img src="/left-arrow-active.svg" alt="" />
            </div>
            <ul className="pagging-count">
              <li className=""></li>
            </ul>
            <div className="rightaction">
              <img src="/right-arrow-inactive.svg" alt="" />
              <img src="/right-arrow-active.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
