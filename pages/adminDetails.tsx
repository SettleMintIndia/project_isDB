"use client";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function Home() {
  const router = useRouter();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const handleDeleteClick = () => {
    setTooltipVisible(!tooltipVisible);
  };

  const handleDeleteConfirm = () => {
    setTooltipVisible(false);
  };

  const handleCancelClick = () => {
    setTooltipVisible(false);
  };
  const handleEdit = () => {
    router.push("/adminDetails");
  };

  return (
    <div className="container-fluid">
      <div className="template admin">
        <div className="head">
          <h1>Admins Details</h1>
          <button>
            <Link href="createadmin">
              <img src="/imgs/plus.svg" alt="" />
              ADD ADMIN
            </Link>
          </button>
        </div>
        <div className="total-template">
          <p>20 Admins</p>
        </div>

        <div className="filterArea">
          <div className="searchArea">
            <div className="searchFilter">
              <img src="imgs/search-icon.svg" alt="" />
              <input type="text" placeholder="Search by template name" />
            </div>
          </div>
        </div>
        <div className="row template-details">
          <div className="template-content table-responsive">
            <table className="table" style={{ borderSpacing: 0 }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>User name</th>
                  <th>Created On</th>
                  <th>Delete Account</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tawfiq Al Rabiah</td>
                  <td>TawfiqRabiah</td>
                  <td>Tue, 9 Jan 2024</td>

                  <td
                    className="actions
                  "
                  >
                    <button className="delete-icon" onClick={handleDeleteClick}>
                      <img src="imgs/recycle-bin.svg" alt="" title="Delete" />
                      {tooltipVisible && (
                        <span className="tooltip">
                          <div className="tool-info">
                            <p>
                              Are you sure you want to delete this template?
                            </p>
                            <div className="tool-buttons">
                              <button
                                className="delete-button"
                                type="button"
                                onClick={handleDeleteConfirm}
                              >
                                Delete
                              </button>
                              <button
                                className="cancel-button"
                                onClick={handleCancelClick}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </span>
                      )}
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>Tawfiq Al Rabiah</td>
                  <td>TawfiqRabiah</td>
                  <td>Tue, 9 Jan 2024</td>

                  <td
                    className="actions
                  "
                  >
                    <button className="delete-icon" onClick={handleDeleteClick}>
                      <img src="imgs/recycle-bin.svg" alt="" title="Delete" />
                      {tooltipVisible && (
                        <span className="tooltip">
                          <div className="tool-info">
                            <p>
                              Are you sure you want to delete this template?
                            </p>
                            <div className="tool-buttons">
                              <button
                                className="delete-button"
                                type="button"
                                onClick={handleDeleteConfirm}
                              >
                                Delete
                              </button>
                              <button
                                className="cancel-button"
                                onClick={handleCancelClick}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </span>
                      )}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="pagging-area">
          <div className="toolbar">
            <label htmlFor="">Results per page :</label>
            <div className="tooldrop">
              <select name="" id="">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
            <span>of 40</span>
          </div>
          <div className="paging-list">
            <div className="leftaction disable-pointer">
              <img src="imgs/left-doublearrow.svg" alt="" />
            </div>
            <div className="leftaction-single">
              <img src="imgs/left-paging.svg" alt="" />
            </div>
            <ul className="paging-count">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
            </ul>
            <div className="rightaction-single">
              <img src="imgs/right-paging.svg" alt="" />
            </div>
            <div className="rightaction">
              <img src="imgs/right-doublearrow.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
