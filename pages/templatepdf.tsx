"use client";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import API_Auth from './api/API_Auth'
import moment from "moment";
import AppLayout from "@/components/layout/AppLayout";

export default function Home() {
  const router = useRouter();
  const [totalTempName, setTotalTempName] = useState(router.query.temp_name);
  const [mounted, setMounted] = useState(false);



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

  useEffect(() => {
    setMounted(true);

    console.log(totalTempName);

    getTemplateDetails(totalTempName);

  }, [totalTempName]);
  const getTemplateDetails = async (totalTempName: any) => {
    // const result=API_Auth.getTemplateDetails(totalTempName);

    let body = {
      temp_name: totalTempName,
      admin_id: "",
      scenario: "",
      datefrom: "",
      dateto: "",
      limit: 1,
      offset: 0,
      showPrivate: true,
    };

    console.log(body);

    const result = await API_Auth.getAllTemplates(body);

    console.log("result", result);
    if (result.status == 200) {
      console.log(result.templates[0]);
      var data = result.templates[0];
      setViewData(result.templates[0])
    }
  }
  if (mounted) return (
    <AppLayout>
      <div className="container-fluid pdf mt-2">
        <div className="header">
          <div className="left-head">
            <img src="/imgs/isdb-logo-signin.svg" className="isDB-logo" alt="" />
          </div>
          <div className="right-head">
            <div className="pdf-title">{viewData.temp_name}</div>
            <div className="pdf info">
              <div className="pdf-time">
                <label htmlFor="">Template Created On </label>
                <span> {moment(viewData.created_timestamp).format(
                  "MM/DD/YYYY h:mm:ss A"
                )}</span>
              </div>
              <div className="type">
                <label htmlFor="">Scenario Type </label>
                <span>{viewData.scenario_name}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pdf-section">
          <div className="pdf-name">{viewData.temp_name}</div>
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
    </AppLayout>
  );
}
