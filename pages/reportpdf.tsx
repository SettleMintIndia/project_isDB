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
import API_Auth from "./api/API_Auth";
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
      resultPerPage: 1,
      pgNo: 1,
      showPrivate: true,
    };

    console.log(body);

    const result = await API_Auth.getAllTemplates(body);

    console.log("result", result);
    if (result.status == 200) {
      console.log(result.templates[0]);
      var data = result.templates[0];
      setViewData(result.templates[0]);
    }
  };
  if (mounted)
    return (
      <AppLayout>
        <div className="container-fluid pdf report mt-2">
          <div className="header">
            <div className="left-head">
              <img
                src="/imgs/isdb-logo-signin.svg"
                className="isDB-logo"
                alt=""
              />
            </div>
            <div className="right-head">
              <div className="pdf-title">Report</div>
              <div className="pdf info">
                <div className="pdf-time">
                  <label htmlFor="">Report Downloaded Date & Time </label>
                  <span>
                    {" "}
                    {moment(viewData.created_timestamp).format(
                      "MM/DD/YYYY h:mm:ss A"
                    )}
                  </span>
                </div>
                <div className="pdf-time">
                  <label htmlFor="">Run Simulation Date & Time </label>
                  <span>
                    {" "}
                    {moment(viewData.created_timestamp).format(
                      "MM/DD/YYYY h:mm:ss A"
                    )}
                  </span>
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
                    <table className="table rounded">
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
                    <table className="table rounded">
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
                        <tr>
                          <td>Distribution</td>
                          <td>{viewData.distribution}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table rounded">
                      <tbody>
                        <tr>
                          <td>Number Of Iterations</td>
                          <td>0.05</td>
                        </tr>
                        <tr>
                          <td>Number Of Rounds</td>
                          <td>0.3</td>
                        </tr>
                        <tr>
                          <td>Number Of Orders In Each Round</td>
                          <td>0.75</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="simulation-data">
                <div className="data-header">
                  <h1>Simulation Result</h1>
                </div>
                <div className="alltable">
                  <div className="simulation-table">
                    <div className="title">
                      <h4>Volume</h4>
                    </div>
                    <div className="table-responsive">
                      <div className="template-content">
                        <table className="table">
                          <thead>
                            <tr>
                              <th className="emptycell"></th>
                              <th className="with">With Stabilization</th>
                              <th className="without">Without Stabilization</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th className="emptycell">Mean</th>
                              <td>105.77</td>
                              <td>615.00</td>
                            </tr>
                            <tr>
                              <th className="emptycell">Median</th>
                              <td>105.77</td>
                              <td>615.00</td>
                            </tr>
                            <tr>
                              <th className="emptycell">Standard deviation</th>
                              <td>105.77</td>
                              <td>615.00</td>
                            </tr>
                            <tr>
                              <th className="emptycell">10% - 90% interval</th>
                              <td>55.01</td>
                              <td>615.00</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>{" "}
                    </div>
                  </div>
                  <div className="simulation-table">
                    <div className="title">
                      <h4>Price</h4>
                    </div>
                    <div className="table-responsive">
                      <div className="template-content">
                        <table className="table">
                          <thead>
                            <tr>
                              <th className="emptycell"></th>
                              <th className="with">With Stabilization</th>
                              <th className="without">Without Stabilization</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th className="emptycell">Mean</th>
                              <td>105.77</td>
                              <td>615.00</td>
                            </tr>
                            <tr>
                              <th className="emptycell">Median</th>
                              <td>105.77</td>
                              <td>615.00</td>
                            </tr>
                            <tr>
                              <th className="emptycell">Standard deviation</th>
                              <td>105.77</td>
                              <td>615.00</td>
                            </tr>
                            <tr>
                              <th className="emptycell">10% - 90% interval</th>
                              <td>55.01</td>
                              <td>615.00</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>{" "}
                    </div>
                  </div>
                  <div className="simulation-table">
                    <div className="title">
                      <h4>Quantity</h4>
                    </div>
                    <div className="table-responsive">
                      <div className="template-content">
                        <table className="table">
                          <thead>
                            <tr>
                              <th className="emptycell"></th>
                              <th className="with">With Stabilization</th>
                              <th className="without">Without Stabilization</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th className="emptycell">Mean</th>
                              <td>105.77</td>
                              <td>615.00</td>
                            </tr>
                            <tr>
                              <th className="emptycell">Median</th>
                              <td>105.77</td>
                              <td>615.00</td>
                            </tr>
                            <tr>
                              <th className="emptycell">Standard deviation</th>
                              <td>105.77</td>
                              <td>615.00</td>
                            </tr>
                            <tr>
                              <th className="emptycell">10% - 90% interval</th>
                              <td>55.01</td>
                              <td>615.00</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="stabilization-data">
                <div className="data-header">
                  <h1> Stabilization Fund</h1>
                </div>
                <div className="stabilization-tab">
                  <div className="stabilization">
                    <p>Stabilization Fund :</p>
                    <ul className="stabilization-fund">
                      <li className="token-issued">
                        <label htmlFor="token">Token Issued</label>
                        <span>100</span>
                      </li>
                      <li className="assets">
                        <label htmlFor="asset">Assets (QTY)</label>
                        <span>200</span>
                      </li>
                      <li className="cash">
                        <label htmlFor="cash">Cash</label>
                        <span>200</span>
                      </li>
                    </ul>
                  </div>
                  <div className="stabilization-table">
                    <div className="table-responsive">
                      <div className="template-content">
                        <table className="table">
                          <thead>
                            <tr>
                              <th className="emptycell"></th>
                              <th>Cash</th>
                              <th>Asset (Quantity)</th>
                              <th>Total Assets ($)</th>
                              <th>Total Assets/V</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th className="emptycell">Mean</th>
                              <td>44963.09</td>
                              <td>635.46</td>
                              <td>53901.14</td>
                              <td>0.26</td>
                            </tr>
                            <tr>
                              <th className="emptycell">Median</th>
                              <td>44963.09</td>
                              <td>635.46</td>
                              <td>53901.14</td>
                              <td>0.26</td>
                            </tr>
                            <tr>
                              <th className="emptycell">Standard deviation</th>
                              <td>44963.09</td>
                              <td>635.46</td>
                              <td>53901.14</td>
                              <td>0.26</td>
                            </tr>
                            <tr>
                              <th className="emptycell">10% - 90% interval</th>
                              <td>44963.09</td>
                              <td>635.46</td>
                              <td>53901.14</td>
                              <td>0.26</td>
                            </tr>
                          </tbody>
                        </table>
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
