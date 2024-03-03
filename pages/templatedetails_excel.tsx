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
  const [tempname1, setTempName1] = useState(router.query.temp_name1)
  const [tempname2, setTempName2] = useState(router.query.temp_name2)
  const [tempname3, setTempName3] = useState(router.query.temp_name3)
  const [tempData1, setTempData1] = useState({
    limit_order_lower_bound: "",
    limit_order_upper_bound: "",
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
  })
  const [tempData2, settempData2] = useState({
    limit_order_lower_bound: "",
    limit_order_upper_bound: "",
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
  })
  const [tempData3, settempData3] = useState({
    temp_name: "",
    limit_order_lower_bound: "",
    limit_order_upper_bound: "",
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
  })
  useEffect(() => {
    getTemplate1(tempname1)
    getTemplate2(tempname2)
    getTemplate3(tempname3)

  }, [tempname1, tempname2, tempname3]);

  const getTemplate1 = async (totalTempName: any) => {
    // const result=API_Auth.getTemplateDetails(totalTempName);

    let body = {
      temp_name: totalTempName,
      admin_id: "",
      scenario: "",
      datefrom: "",
      dateto: "",
      resultPerPage: 1,
      pgNo: 1,
      showPrivate: true,
    };
    const result = await API_Auth.getAllTemplates(body);
    console.log("result1", result);
    setTempData1(result.templates[0])
  }
  const getTemplate2 = async (totalTempName: any) => {
    // const result=API_Auth.getTemplateDetails(totalTempName);

    let body = {
      temp_name: totalTempName,
      admin_id: "",
      scenario: "",
      datefrom: "",
      dateto: "",
      resultPerPage: 1,
      pgNo: 1,
      showPrivate: true,
    };
    const result = await API_Auth.getAllTemplates(body);
    console.log("result2", result);
    settempData2(result.templates[0])
  }
  const getTemplate3 = async (totalTempName: any) => {
    // const result=API_Auth.getTemplateDetails(totalTempName);

    let body = {
      temp_name: totalTempName,
      admin_id: "",
      scenario: "",
      datefrom: "",
      dateto: "",
      resultPerPage: 1,
      pgNo: 1,
      showPrivate: true,
    };
    const result = await API_Auth.getAllTemplates(body);
    console.log("result3", result);
    settempData3(result.templates[0])
  }
  const handleBack = () => {
    router.back();
  };
  return (
    <AppLayout>
    <div className="container-fluid">
      <div className="template simulation-info compare">
        <div className="template-header">
          <div className="back-option" onClick={() => handleBack()}>
            <img src="imgs/left-arrow.svg" alt="" />
            <p className="mb-0">Back</p>
          </div>
          <div className="main-header">
            <h1>Template Details</h1>
          </div>
          <div className="right-head">
            {/* <div className="format"> */}
            <p>Download Template Details :</p>
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
            {/* </div> */}
          </div>
        </div>

        <div className="template-details">
          <div className="table-responsive">
            <div className="template-content">
              <table className="table">
                <thead>
                  <tr>
                    <th className="emptycell"></th>
                    <th>{tempData1.temp_name}</th>
                    <th>{tempData2.temp_name}</th>
                    <th>{tempData3.temp_name}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="emptycell">Created on</th>
                    <td>  {moment(tempData1.created_timestamp).format(
                      "MM/DD/YYYY h:mm:ss A"
                    )}</td>
                    <td>  {moment(tempData2.created_timestamp).format(
                      "MM/DD/YYYY h:mm:ss A"
                    )}</td>
                    <td>  {moment(tempData3.created_timestamp).format(
                      "MM/DD/YYYY h:mm:ss A"
                    )}</td>

                  </tr>
                  <tr>
                    <th className="emptycell">Scenario Type</th>
                    <td>{tempData1.scenario_name}</td>
                    <td>{tempData2.scenario_name}</td>
                    <td>{tempData3.scenario_name}</td>
                  </tr>
                  <tr>
                    <th className="emptycell">Initial Market Price</th>
                    <td>{tempData1.initial_mkt_price}</td>
                    <td>{tempData2.initial_mkt_price}</td>
                    <td>{tempData3.initial_mkt_price}</td>
                  </tr>
                  <tr>
                    <th className="emptycell">Price Variance Limit</th>
                    <td>{tempData1.price_var}</td>
                    <td>{tempData2.price_var}</td>
                    <td>{tempData3.price_var}</td>
                  </tr>
                  <tr>
                    <th className="emptycell">Base Quantity</th>
                    <td>{tempData1.base_quant}</td>
                    <td>{tempData2.base_quant}</td>
                    <td>{tempData3.base_quant}</td>
                  </tr>
                  <tr>
                    <th className="emptycell">Quantity Variance Limit</th>
                    <td>{tempData1.quant_var}</td>
                    <td>{tempData2.quant_var}</td>
                    <td>{tempData3.quant_var}</td>
                  </tr>
                  <tr>
                    <th className="emptycell">Limit Order Upper Bound</th>
                    <td>{tempData1.limit_order_upper_bound}</td>
                    <td>{tempData2.limit_order_upper_bound}</td>
                    <td>{tempData3.limit_order_upper_bound}</td>
                  </tr>
                  <tr>
                    <th className="emptycell">Limit Order Lower Bound</th>
                    <td>{tempData1.limit_order_lower_bound}</td>
                    <td>{tempData2.limit_order_lower_bound}</td>
                    <td>{tempData3.limit_order_lower_bound}</td>
                  </tr>
                  <tr>
                    <th className="emptycell">Alpha 0</th>
                    <td>{tempData1.alpha0}</td>
                    <td>{tempData2.alpha0}</td>
                    <td>{tempData3.alpha0}</td>
                  </tr>
                  <tr>
                    <th className="emptycell">Alpha 1</th>
                    <td>{tempData1.alpha1}</td>
                    <td>{tempData2.alpha1}</td>
                    <td>{tempData3.alpha1}</td>
                  </tr>
                  <tr>
                    <th className="emptycell">Theta 0</th>
                    <td>{tempData1.theta0}</td>
                    <td>{tempData2.theta0}</td>
                    <td>{tempData3.theta0}</td>
                  </tr>
                  <tr>
                    <th className="emptycell">Theta 1</th>
                    <td>{tempData1.theta1}</td>
                    <td>{tempData2.theta1}</td>
                    <td>{tempData3.theta1}</td>
                  </tr>
                  <tr>
                    <th className="emptycell">Distribution</th>
                    <td>{tempData1.distribution}</td>
                    <td>{tempData2.distribution}</td>
                    <td>{tempData3.distribution}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </AppLayout>
  );
}
