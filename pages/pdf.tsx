"use client";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const router = useRouter();
  const handleEdit = () => {
    router.push("/pdf");
  };

  const [viewData, setViewData] = useState({
    temp_name: "",
    created_timestamp: "",
    scenario_name: "",
    initial_mkt_price: "",
    price_var: "",
    base_quant: "",
    quant_var: "",
    alpha0: "",
    alpha1: "",
    theta0: "",
    theta1: "",
    std_dev_price_buy: "",
    std_dev_price_sell: "",
    std_dev_quant: "",
    mean_quant: "",
    distribution: "",
    comments: "",
    mean_price_buy: "",
    mean_price_sell: "",
    is_public: 1,
  });
  return (
    <div className="container-fluid pdf">
      <div className="header">
        <div className="left-head">
          <img src="/imgs/isdb-logo-signin.svg" className="isDB-logo" alt="" />
        </div>
        <div className="right-head">
          <div className="pdf-title">TEMPLATE DETAILS</div>
          <div className="pdf info">
            <div className="pdf-time">
              <label htmlFor="">Template Created On </label>
              <span>Mon, 5 Feb 2024 15:31:40</span>
            </div>
            <div className="type">
              <label htmlFor="">Scenario Type </label>
              <span>Crash</span>
            </div>
          </div>
        </div>
      </div>
      <div className="pdf-section">
        <div className="pdf-name">Template 1</div>
        <div className="pdf-data">
          <div className="modal-details">
            <div className="details-section">
              <div className="template-details">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Initial Market Price</td>
                      <td>{viewData.initial_mkt_price}</td>
                    </tr>
                    <tr>
                      <td>Price Variance Limit</td>
                      <td>{viewData.price_var}</td>
                    </tr>
                    <tr>
                      <td>Base Quantity</td>
                      <td>{viewData.base_quant}</td>
                    </tr>
                    <tr>
                      <td>Quantity Variance Limit</td>
                      <td>{viewData.quant_var}</td>
                    </tr>
                    <tr>
                      <td>Limit Order Upper Bound</td>
                      <td>0.95</td>
                    </tr>
                    <tr>
                      <td>Limit Order Lower Bound</td>
                      <td>1.05</td>
                    </tr>
                  </tbody>
                </table>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Alpha 0</td>
                      <td>{viewData.alpha0}</td>
                    </tr>
                    <tr>
                      <td>Alpha 1</td>
                      <td>{viewData.alpha1}</td>
                    </tr>
                    <tr>
                      <td>Theta 0</td>
                      <td>{viewData.theta0}</td>
                    </tr>
                    <tr>
                      <td>Theta 1</td>
                      <td>{viewData.theta1}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="right-section">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Distribution</td>
                        <td>{viewData.distribution}</td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="independant-table">
                    <tr>
                      <td>Visibility</td>
                      {viewData.is_public == 1 && <td>Public</td>}
                      {viewData.is_public == 0 && <td>Private</td>}{" "}
                    </tr>
                  </table>
                  <div className="modal-comment">
                    <label htmlFor="comment">Comment</label>
                    <p>{viewData.comments}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
