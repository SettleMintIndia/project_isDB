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
        <div className="container-fluid pdf report compared mt-2">
          <div className="header">
            <div className="left-head">
              <img
                src="/imgs/isdb-logo-signin.svg"
                className="isDB-logo"
                alt=""
              />
            </div>
            <div className="right-head">
              <div className="pdf-title">COMPARE RESULT REPORT</div>
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
                <div className="pdf-time"></div>
                <div className="type"></div>
              </div>
            </div>
          </div>
          <div className="pdf-section">
            <div className="pdf-name">Template 1, Template 3, Template 4</div>
            <div className="pdf-data">
              <div className="simulation-data mb-4">
                <div className="data-header">
                  <h1>Simulation Result</h1>
                </div>
                <div className="alltable">
                  <div className="price-table">
                    <div className="main-title">
                      <h3>PRICE</h3>
                    </div>
                    <div className="alltable">
                      <div className="simulation-table with">
                        <div className="title">
                          <h4>With Stabilization</h4>
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
                                  <th className="emptycell">Mean</th>
                                  <td>105.77</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                                <tr>
                                  <th className="emptycell">Median</th>
                                  <td>105.77</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                                <tr>
                                  <th className="emptycell">
                                    Standard deviation
                                  </th>
                                  <td>105.77</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                                <tr>
                                  <th className="emptycell">
                                    10% - 90% interval
                                  </th>
                                  <td>55.01</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>{" "}
                        </div>
                      </div>
                      <div className="simulation-table without-s">
                        <div className="title">
                          <h4>Without Stabilization</h4>
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
                                  <th className="emptycell">Mean</th>
                                  <td>105.77</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                                <tr>
                                  <th className="emptycell">Median</th>
                                  <td>105.77</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                                <tr>
                                  <th className="emptycell">
                                    Standard deviation
                                  </th>
                                  <td>105.77</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                                <tr>
                                  <th className="emptycell">
                                    10% - 90% interval
                                  </th>
                                  <td>55.01</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="price-table">
                    <div className="main-title">
                      <h3>VOLUME</h3>
                    </div>
                    <div className="alltable">
                      <div className="simulation-table with">
                        <div className="title">
                          <h4>With Stabilization</h4>
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
                                  <th className="emptycell">Mean</th>
                                  <td>105.77</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                                <tr>
                                  <th className="emptycell">Median</th>
                                  <td>105.77</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                                <tr>
                                  <th className="emptycell">
                                    Standard deviation
                                  </th>
                                  <td>105.77</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                                <tr>
                                  <th className="emptycell">
                                    10% - 90% interval
                                  </th>
                                  <td>55.01</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>{" "}
                        </div>
                      </div>
                      <div className="simulation-table without-s">
                        <div className="title">
                          <h4>Without Stabilization</h4>
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
                                  <th className="emptycell">Mean</th>
                                  <td>105.77</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                                <tr>
                                  <th className="emptycell">Median</th>
                                  <td>105.77</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                                <tr>
                                  <th className="emptycell">
                                    Standard deviation
                                  </th>
                                  <td>105.77</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                                <tr>
                                  <th className="emptycell">
                                    10% - 90% interval
                                  </th>
                                  <td>55.01</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="price-table">
                    <div className="main-title">
                      <h3>QUANTITY</h3>
                    </div>
                    <div className="alltable">
                      <div className="simulation-table with">
                        <div className="title">
                          <h4>With Stabilization</h4>
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
                                  <th className="emptycell">Mean</th>
                                  <td>105.77</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                                <tr>
                                  <th className="emptycell">Median</th>
                                  <td>105.77</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                                <tr>
                                  <th className="emptycell">
                                    Standard deviation
                                  </th>
                                  <td>105.77</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                                <tr>
                                  <th className="emptycell">
                                    10% - 90% interval
                                  </th>
                                  <td>55.01</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>{" "}
                        </div>
                      </div>
                      <div className="simulation-table without-s">
                        <div className="title">
                          <h4>Without Stabilization</h4>
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
                                  <th className="emptycell">Mean</th>
                                  <td>105.77</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                                <tr>
                                  <th className="emptycell">Median</th>
                                  <td>105.77</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                                <tr>
                                  <th className="emptycell">
                                    Standard deviation
                                  </th>
                                  <td>105.77</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                                <tr>
                                  <th className="emptycell">
                                    10% - 90% interval
                                  </th>
                                  <td>55.01</td>
                                  <td>615.00</td>
                                  <td>615.00</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="stabilization-data mt-4">
                <div className="data-header">
                  <h1> Stabilization Fund</h1>
                </div>
                <div className="price-table">
                  <div className="alltable">
                    <div className="simulation-table with">
                      <div className="title">
                        <h4>Cash</h4>
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
                                <th className="emptycell">Mean</th>
                                <td>105.77</td>
                                <td>615.00</td>
                                <td>615.00</td>
                              </tr>
                              <tr>
                                <th className="emptycell">Median</th>
                                <td>105.77</td>
                                <td>615.00</td>
                                <td>615.00</td>
                              </tr>
                              <tr>
                                <th className="emptycell">
                                  Standard deviation
                                </th>
                                <td>105.77</td>
                                <td>615.00</td>
                                <td>615.00</td>
                              </tr>
                              <tr>
                                <th className="emptycell">
                                  10% - 90% interval
                                </th>
                                <td>55.01</td>
                                <td>615.00</td>
                                <td>615.00</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>{" "}
                      </div>
                    </div>
                    <div className="simulation-table without-s">
                      <div className="title">
                        <h4>Asset (Quantity) </h4>
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
                                <th className="emptycell">Mean</th>
                                <td>105.77</td>
                                <td>615.00</td>
                                <td>615.00</td>
                              </tr>
                              <tr>
                                <th className="emptycell">Median</th>
                                <td>105.77</td>
                                <td>615.00</td>
                                <td>615.00</td>
                              </tr>
                              <tr>
                                <th className="emptycell">
                                  Standard deviation
                                </th>
                                <td>105.77</td>
                                <td>615.00</td>
                                <td>615.00</td>
                              </tr>
                              <tr>
                                <th className="emptycell">
                                  10% - 90% interval
                                </th>
                                <td>55.01</td>
                                <td>615.00</td>
                                <td>615.00</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="price-table">
                  <div className="alltable">
                    <div className="simulation-table with">
                      <div className="title">
                        <h4>Total Assets ($)</h4>
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
                                <th className="emptycell">Mean</th>
                                <td>105.77</td>
                                <td>615.00</td>
                                <td>615.00</td>
                              </tr>
                              <tr>
                                <th className="emptycell">Median</th>
                                <td>105.77</td>
                                <td>615.00</td>
                                <td>615.00</td>
                              </tr>
                              <tr>
                                <th className="emptycell">
                                  Standard deviation
                                </th>
                                <td>105.77</td>
                                <td>615.00</td>
                                <td>615.00</td>
                              </tr>
                              <tr>
                                <th className="emptycell">
                                  10% - 90% interval
                                </th>
                                <td>55.01</td>
                                <td>615.00</td>
                                <td>615.00</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>{" "}
                      </div>
                    </div>
                    <div className="simulation-table without-s">
                      <div className="title">
                        <h4>Total Assets/V </h4>
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
                                <th className="emptycell">Mean</th>
                                <td>105.77</td>
                                <td>615.00</td>
                                <td>615.00</td>
                              </tr>
                              <tr>
                                <th className="emptycell">Median</th>
                                <td>105.77</td>
                                <td>615.00</td>
                                <td>615.00</td>
                              </tr>
                              <tr>
                                <th className="emptycell">
                                  Standard deviation
                                </th>
                                <td>105.77</td>
                                <td>615.00</td>
                                <td>615.00</td>
                              </tr>
                              <tr>
                                <th className="emptycell">
                                  10% - 90% interval
                                </th>
                                <td>55.01</td>
                                <td>615.00</td>
                                <td>615.00</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>{" "}
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
