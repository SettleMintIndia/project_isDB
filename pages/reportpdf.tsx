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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PDFExport } from '@progress/kendo-react-pdf'
import * as React from 'react';


export default function Home() {
  const router = useRouter();
  const [totalTempName, setTotalTempName] = useState(router.query.temp_name);
  const [mounted, setMounted] = useState(false);
  const pdfExportComponent = React.useRef<PDFExport>(null);
  const [buttonshow, setButtonshow] = useState(true);

  const [viewData, setViewData] = useState({
    limit_order_upper_bound: '',
    limit_order_lower_bound: '',
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
    Iteartions: "",
    Orders: "",
    rounds: "",
    oder_variance: "",
  });

  const [ex_id, setExid] = useState(router.query.exe_id);


  const [meanPriceSimulation, setMeanPriceSimulation] = useState({
    inter_10_price_ns: '', inter_10_price_ws: '',
    inter_90_price_ns: '', inter_90_price_ws: '',
    max_price_ns: 0, max_price_ws: 0,
    mean_price_ns: 0, mean_price_ws: 0,
    median_price_ns: 0, median_price_ws: 0,
    min_price_ns: 0, min_price_ws: 0,
    std_price_ns: 0, std_price_ws: 0
  })
  const [meanVolumeSimulation, setMeanVolumeSimulation] = useState({
    inter_10_amt_ns: '', inter_10_amt_ws: '',
    inter_90_amt_ns: '', inter_90_amt_ws: '',
    max_amt_ns: 0, max_amt_ws: 0,
    mean_amt_ns: 0, mean_amt_ws: 0,
    median_amt_ns: 0, median_amt_ws: 0,
    min_amt_ns: 0, min_amt_ws: 0,
    std_amt_ns: 0, std_amt_ws: 0
  })

  const [meanQuantitySimulation, setMeanQuantitySimulation] = useState({
    inter_10_quant_ns: '', inter_10_quant_ws: '',
    inter_90_quant_ns: '', inter_90_quant_ws: '',
    max_quant_ns: 0, max_quant_ws: 0,
    mean_quant_ns: 0, mean_quant_ws: 0,
    median_quant_ns: 0, median_quant_ws: 0,
    min_quant_ns: 0, min_quant_ws: 0,
    std_quant_ns: 0, std_quant_ws: 0
  })

  const [StablizationFundData, setStablizationFundData] = useState({
    inter_10_asset_stab: '', inter_10_cash_stab: '',
    inter_10_total_stab: '', inter_10_total_v_stab: '',
    inter_90_asset_stab: '', inter_90_cash_stab: '',
    inter_90_total_stab: '', inter_90_total_v_stab: '',
    max_asset_stab: 0, max_cash_stab: 0,
    max_total_stab: 0, max_total_v_stab: 0,
    mean_asset_stab: 0, mean_cash_stab: 0,
    mean_total_stab: 0, mean_total_v_stab: 0,
    median_asset_stab: 0, median_cash_stab: 0,
    median_total_stab: 0, median_total_v_stab: 0,
    min_asset_stab: 0, min_cash_stab: 0,
    min_total_stab: 0, min_total_v_stab: 0,
    std_asset_stab: 0, std_cash_stab: 0,
    std_total_stab: 0, std_total_v_stab: 0

  })

  const [StablizationTotal, setStablizationTotal] = useState({
    round_assets: 0, round_cash: 0, round_tk: 0
  })



  useEffect(() => {
    setMounted(true);

    console.log(totalTempName);

    getTemplateDetails(totalTempName);
    getSimulationResultDetails(ex_id);
    getSimulationVolumeResultDetails(ex_id);

    getSimulationQuantityResultDetails(ex_id);
    getStablizationFund(ex_id);


  }, [totalTempName, ex_id]);


  const getStablizationFund = async (id: any) => {

    const result = await API_Auth.getStablizationFundDetails(id);
    console.log("StablizationFund", result);
    setStablizationFundData(result.stab)

    setStablizationFundData(result.stab == undefined ? StablizationFundData : result.stab)

    setStablizationTotal(result.stab_totals == undefined ? StablizationTotal : result.stab_totals.stab_totals)

  };
  const getSimulationResultDetails = async (id: any) => {
    const result = await API_Auth.getSimulationResult(id, "price");
    console.log("simulationresult", result);

    setMeanPriceSimulation(result.sim == undefined ? meanPriceSimulation : result.sim)


  };
  const getSimulationQuantityResultDetails = async (executionId: any) => {
    const result = await API_Auth.getSimulationResult(executionId, "quantity");
    console.log("quantityresult", result);
    console.log("quantity--------------------------->")

    setMeanQuantitySimulation(result.sim == undefined ? meanQuantitySimulation : result.sim)



  };

  const getSimulationVolumeResultDetails = async (executionId: any) => {
    const result = await API_Auth.getSimulationResult(executionId, "volume");
    console.log("volumeresult", result);
    console.log("volume--------------------------->")
    setMeanVolumeSimulation(result.sim)

    setMeanVolumeSimulation(result.sim == undefined ? meanVolumeSimulation : result.sim)




  };

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


      let body = {
        temp_name: name,
        creator: "",
        scenario: "",
        datefrom: "",
        dateto: "",
        limit: 1,
        offset: 0,
        execution_id: ex_id
      };
      const simulationresult = await API_Auth.getSimulationHistory(body);
      console.log(
        "simulationresult",
        simulationresult,
      );



      data['Iteartions'] = simulationresult.simulations[0].iterations;
      data['Orders'] = simulationresult.simulations[0].nb_orders
      data['rounds'] = simulationresult.simulations[0].nb_rounds
      data['oder_variance'] = simulationresult.simulations[0].nb_orders_var;

      setViewData(data);

      console.log("keydata", data, result.templates.length)
      setViewData(data)
    }
  };
  const handleDownloadPdf = () => {
    /*  const input = document.getElementById('page');
 
     html2canvas(input)
       .then((canvas) => {
         const imgData = canvas.toDataURL('image/png');
         const pdf = new jsPDF('p', 'px', 'a2');
         var width = pdf.internal.pageSize.getWidth();
         var height = pdf.internal.pageSize.getHeight() - 50;
 
         pdf.addImage(imgData, 'JPEG', 0, 20, width, height);
         pdf.save(totalTempName + ".pdf");
       }); */

    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }


  }
  if (mounted)
    return (
      <AppLayout>
        <div className="action-points" style={{ marginRight: 30 }}>
          <div className="file-type">
             <Button onClick={() => handleDownloadPdf()} data-html2canvas-ignore="true">
              <img src="imgs/download-white.svg" alt="" />
              PDF
            </Button>
          </div></div>
        <PDFExport
          paperSize="A2"
          margin="1cm"
          landscape
          fileName={viewData.temp_name + ".pdf"}
          ref={pdfExportComponent}
        >
          <div className="container-fluid pdf report mt-2" id="page">
            <div className="header">
              <div className="left-head">
                <img
                  src="/imgs/isdb-logo-signin.svg"
                  className="isDB-logo"
                  alt=""
                />
              </div>


              <div className="right-head">
                <div className="action-points">
                  <div className="file-type">

                  </div></div>

                <div className="pdf-title">Report</div>
                <div className="pdf info">
                  <div className="pdf-time">
                    <label htmlFor="">Report Downloaded Date & Time </label>
                    <span>
                      {" "}
                      {moment(new Date()).format(
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
                            <td>{viewData.limit_order_upper_bound}</td>
                          </tr>
                          <tr>
                            <td>Limit Order Lower Bound</td>
                            <td>{viewData.limit_order_lower_bound}</td>
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
                            <td>{viewData.Iteartions}</td>
                          </tr>
                          <tr>
                            <td>Number Of Rounds</td>
                            <td>{viewData.rounds}</td>
                          </tr>
                          <tr>
                            <td>Number Of Orders In Each Round</td>
                            <td>{viewData.Orders}</td>
                          </tr>
                          <tr>
                            <td>Order Variance</td>
                            <td>{viewData.oder_variance}</td>
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
                                <td>{meanVolumeSimulation.mean_amt_ws}</td>
                                <td>{meanVolumeSimulation.mean_amt_ns}</td>
                              </tr>
                              <tr>
                                <th className="emptycell">Median</th>
                                <td>{meanVolumeSimulation.median_amt_ws}</td>
                                <td>{meanVolumeSimulation.median_amt_ns}</td>
                              </tr>
                              <tr>
                                <th className="emptycell">Standard deviation</th>
                                <td>{meanVolumeSimulation.std_amt_ws}</td>
                                <td>{meanVolumeSimulation.std_amt_ns}</td>
                              </tr>
                              <tr>
                                <th className="emptycell">10% - 90% interval</th>
                                <td>
                                  {
                                    parseFloat(meanVolumeSimulation.inter_10_amt_ws).toFixed(3)
                                  }
                                  -
                                  {
                                    parseFloat(meanVolumeSimulation.inter_90_amt_ws).toFixed(3)
                                  }
                                </td>
                                <td>
                                  {
                                    parseFloat(meanVolumeSimulation.inter_10_amt_ns).toFixed(3)
                                  }
                                  -
                                  {
                                    parseFloat(meanVolumeSimulation.inter_90_amt_ns).toFixed(3)
                                  }
                                </td></tr>
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
                                <td>{meanPriceSimulation.mean_price_ws}</td>
                                <td>{meanPriceSimulation.mean_price_ns}</td>
                              </tr>
                              <tr>
                                <th className="emptycell">Median</th>
                                <td>{meanPriceSimulation.median_price_ws}</td>
                                <td>{meanPriceSimulation.median_price_ns}</td>
                              </tr>
                              <tr>
                                <th className="emptycell">Standard deviation</th>
                                <td>{meanPriceSimulation.std_price_ws}</td>
                                <td>{meanPriceSimulation.std_price_ws}</td>
                              </tr>
                              <tr>
                                <th className="emptycell">10% - 90% interval</th>
                                <td>
                                  {
                                    parseFloat(meanPriceSimulation.inter_10_price_ws).toFixed(3)
                                  }
                                  -
                                  {
                                    parseFloat(meanPriceSimulation.inter_90_price_ws).toFixed(3)
                                  }
                                </td>
                                <td>
                                  {
                                    parseFloat(meanPriceSimulation.inter_10_price_ns).toFixed(3)
                                  }
                                  -
                                  {
                                    parseFloat(meanPriceSimulation.inter_90_price_ns).toFixed(3)
                                  }
                                </td>

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
                                <td>{meanQuantitySimulation.mean_quant_ws}</td>
                                <td>{meanQuantitySimulation.mean_quant_ns}</td>
                              </tr>
                              <tr>
                                <th className="emptycell">Median</th>
                                <td>{meanQuantitySimulation.median_quant_ws}</td>
                                <td>{meanQuantitySimulation.median_quant_ns}</td>
                              </tr>
                              <tr>
                                <th className="emptycell">Standard deviation</th>
                                <td>{meanQuantitySimulation.std_quant_ws}</td>
                                <td>{meanQuantitySimulation.std_quant_ws}</td>
                              </tr>
                              <tr>
                                <th className="emptycell">10% - 90% interval</th>
                                <td>
                                  {
                                    parseFloat(meanQuantitySimulation.inter_10_quant_ws).toFixed(3)
                                  }
                                  -
                                  {
                                    parseFloat(meanQuantitySimulation.inter_90_quant_ws).toFixed(3)
                                  }
                                </td>
                                <td>
                                  {
                                    parseFloat(meanQuantitySimulation.inter_10_quant_ns).toFixed(3)
                                  }
                                  -
                                  {
                                    parseFloat(meanQuantitySimulation.inter_90_quant_ns).toFixed(3)
                                  }
                                </td>
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
                          <span>{StablizationTotal.round_tk}</span>
                        </li>
                        <li className="assets">
                          <label htmlFor="asset">Assets (QTY)</label>
                          <span>{StablizationTotal.round_assets}</span>
                        </li>
                        <li className="cash">
                          <label htmlFor="cash">Cash</label>
                          <span>{StablizationTotal.round_cash}</span>
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
                                <td>{StablizationFundData.mean_cash_stab}</td>
                                <td>{StablizationFundData.mean_asset_stab}</td>
                                <td>{StablizationFundData.mean_total_stab}</td>
                                <td>{StablizationFundData.mean_total_v_stab}</td>

                              </tr>
                              <tr>
                                <th className="emptycell">Median</th>
                                <td>{StablizationFundData.median_cash_stab}</td>
                                <td>{StablizationFundData.median_asset_stab}</td>
                                <td>{StablizationFundData.median_total_stab}</td>
                                <td>{StablizationFundData.median_total_v_stab}</td>

                              </tr>
                              <tr>
                                <th className="emptycell">Standard deviation</th>
                                <td>{StablizationFundData.std_cash_stab}</td>
                                <td>{StablizationFundData.std_asset_stab}</td>
                                <td>{StablizationFundData.std_total_stab}</td>
                                <td>{StablizationFundData.std_total_v_stab}</td>

                              </tr>
                              <tr>
                                <th className="emptycell">10% - 90% interval</th>
                                <td>{parseFloat(StablizationFundData.inter_10_cash_stab).toFixed(3)}-{parseFloat(StablizationFundData.inter_90_cash_stab).toFixed(3)}</td>
                                <td>{parseFloat(StablizationFundData.inter_10_asset_stab).toFixed(3)}-{parseFloat(StablizationFundData.inter_90_asset_stab).toFixed(3)}</td>
                                <td>{parseFloat(StablizationFundData.inter_10_total_stab).toFixed(3)}-{parseFloat(StablizationFundData.inter_90_total_stab).toFixed(3)}</td>
                                <td>{parseFloat(StablizationFundData.inter_10_total_v_stab).toFixed(3)}-{parseFloat(StablizationFundData.inter_90_total_v_stab).toFixed(3)}</td>
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
        </PDFExport>
      </AppLayout>
    );
}
