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
    router.push("/templatedetails_excel");
  };

  return (
    <div className="container-fluid">
      <div className="simulation-info compare">
        <div className="head">
          <img src="imgs/left-arrow.svg" alt="" />
          <h3>Back</h3>
        </div>

        <div className="template-details">
          <div className="compare-header">
            <div className="title">Template Details</div>
            <div className="format">
              <p>Download Compare Result</p>
              <div className="file-type">
                <Button>
                  <img src="imgs/download-white.svg" alt="" />
                  PDF
                </Button>
                <Button>
                  <img src="imgs/download-white.svg" alt="" />
                  EXCEL
                </Button>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <div className="template-content">
              <table className="table">
                <thead>
                  <tr>
                    <th className="emptycell"></th>
                    <th>Template 1</th>
                    <th>Template 2</th>
                    <th>Template 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="emptycell">Created on</th>
                    <td>Mon, 1 Jan 2024</td>
                    <td>Mon, 1 Jan 2024</td>
                    <td>Mon, 1 Jan 2024</td>
                  </tr>
                  <tr>
                    <th className="emptycell">Scenario Type</th>
                    <td>Crash</td>
                    <td>Crash</td>
                    <td>Crash</td>
                  </tr>
                  <tr>
                    <th className="emptycell">Initial Market Price</th>
                    <td>47.48</td>
                    <td>47.48</td>
                    <td>47.48</td>
                  </tr>
                  <tr>
                    <th className="emptycell">Price Variance Limit</th>
                    <td>55.01</td>
                    <td>55.01</td>
                    <td>55.01</td>
                  </tr>
                  <tr>
                    <th className="emptycell">Base Quantity</th>
                    <td>55.01</td>
                    <td>55.01</td>
                    <td>55.01</td>
                  </tr>
                  <tr>
                    <th className="emptycell">Quantity Variance Limit</th>
                    <td>55.01</td>
                    <td>55.01</td>
                    <td>55.01</td>
                  </tr>
                  <tr>
                    <th className="emptycell">Alpha 0</th>
                    <td>55.01</td>
                    <td>55.01</td>
                    <td>55.01</td>
                  </tr>
                  <tr>
                    <th className="emptycell">Alpha 1</th>
                    <td>55.01</td>
                    <td>55.01</td>
                    <td>55.01</td>
                  </tr>
                  <tr>
                    <th className="emptycell">Theta 0</th>
                    <td>55.01</td>
                    <td>55.01</td>
                    <td>55.01</td>
                  </tr>
                  <tr>
                    <th className="emptycell">Theta 1</th>
                    <td>55.01</td>
                    <td>55.01</td>
                    <td>55.01</td>
                  </tr>
                  <tr>
                    <th className="emptycell">Distribution</th>
                    <td>Uniform</td>
                    <td>Uniform</td>
                    <td>Uniform</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
