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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

export default function Home() {
  const router = useRouter();
  const [totalTempName, setTotalTempName] = useState(router.query.temp_name);
  const [ex_id, setExid] = useState(router.query.exe_id);

  const [tabIndex, setTabIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [inititalmarketprice, setinititalmarketprice] = useState("");
  const [inititalmarketpriceErr, setinititalmarketpriceErr] = useState("");
  const [basequantityErr, setbasequantityErr] = useState("");
  const [basequantity, setbasequantity] = useState("");
  const [alpha0, setalpha0] = useState("");
  const [alpha0Err, setalpha0Err] = useState("");
  const [theta0, settheta0] = useState("");
  const [theta0Err, settheta0Err] = useState("");
  const [distribution, setDistribution] = useState("");
  const [distributionErr, setdistributionErr] = useState("");
  const [templatename, settemplatename] = useState("");
  const [templatenameErr, settemplatenameErr] = useState("");
  const [pricelimit, setpricelimit] = useState("");
  const [pricelimitErr, setpricelimitErr] = useState("");
  const [quantitylimit, setquantitylimit] = useState("");
  const [quantitylimitErr, setquantitylimitErr] = useState("");
  const [alpha1, setalpha1] = useState("");
  const [alpha1Err, setalpha1Err] = useState("");
  const [theta1, settheta1] = useState("");
  const [theta1Err, settheta1Err] = useState("");
  const [comment, setcomment] = useState("");
  const [commentErr, setcommentErr] = useState("");
  const [lowerbound, setlowerbound] = useState("");
  const [lowerboundErr, setlowerboundErr] = useState("");
  const [upperbound, setupperbound] = useState("");
  const [upperboundErr, setupperboundErr] = useState("");
  const [singleTemplate, setSingleTemplate] = useState({});
  const [scenarioType, setScenarioType] = useState("");
  const [devpricebuy, setDevPricebuy] = useState("");
  const [devpricebuyErr, setDevPricebuyErr] = useState("");
  const [devpricesell, setDevPricesell] = useState("");
  const [devpricesellErr, setDevPricesellErr] = useState("");
  const [devqty, setDevqty] = useState("");
  const [devqtyErr, setDevqtyErr] = useState("");

  const [meanpricebuy, setMeanPricebuy] = useState("");
  const [meanpricebuyErr, setMeanPricebuyErr] = useState("");
  const [meanpricesell, setMeanPricesell] = useState("");
  const [meanpricesellErr, setMeanPricesellErr] = useState("");
  const [meanqty, setMeanqty] = useState("");
  const [meanqtyErr, setMeanqtyErr] = useState("");
  const [tradeHistoryWS, setTradeHistoryWS] = useState([
    { price: "", quantity: "", timestamp: "" },
  ]);
  const [tradeHistoryNS, setTradeHistoryNS] = useState([
    { price: "", quantity: "", timestamp: "" },
  ]);

  const [executionData, setExecutionData] = useState({
    created_timestamp: "",
    iterations: 0,
    nb_orders: 0,
    nb_orders_var: 0,
    nb_rounds: 0,
  });
  const [siteration, setSIteration] = useState(1);
  const [siterationErr, setSIterationErr] = useState("");
  const [sroundErr, setSRoundErr] = useState("");
  const [type, setType] = useState("price");

  const [sround, setSRound] = useState(1);
  const [orderWs, setorderWs] = useState([]);
  const [orderNs, setorderNs] = useState([]);
  const handleEdit = () => {
    router.push("/simulation_history_info");
  };

  useEffect(() => {
    console.log(totalTempName);

    getTemplateDetails(totalTempName);
    getExecutionDetails(totalTempName, ex_id);
    if (tabIndex == 1) {
      setSIteration(1);
      setSRound(1);
      getOrderBook(ex_id, 1, 1);
    }
    if (tabIndex == 2) {
      setSIteration(1);
      setSRound(1);
      getOrderBook(ex_id, 1, 1);
    }

    if (tabIndex == 3) {
      setSIteration(1);
      setSRound(1);
      getTradeHistoryWS(ex_id, 1, 1);
    }
    if (tabIndex == 4) {
      setSIteration(1);
      setSRound(1);
      getTradeHistoryNS(ex_id, 1, 1);
    }
    if (tabIndex == 5) {
      getSimulationResultDetails(ex_id);
    }

    if (tabIndex == 6) {
      getStablizationFund(ex_id);
    }
    console.log("tabIndex", tabIndex);
  }, [totalTempName, tabIndex, ex_id]);
  const getStablizationFund = async (id: any) => {
    const result = await API_Auth.getStablizationFundDetails(id);
    console.log("StablizationFund", result);
  };
  const getSimulationResultDetails = async (id: any) => {
    const result = await API_Auth.getSimulationResult(id, type);
    console.log("simulationresult", result);
  };

  const getOrderBook = async (id: any, siteration: any, sround: any) => {
    const result = await API_Auth.getOrderDetails(id, siteration, sround);
    console.log("orderresult", result);
    setorderNs(result.ordersNS);
    setorderWs(result.ordersWS);
  };
  const getTradeHistoryWS = async (id: any, siteration: any, sround: any) => {
    const result = await API_Auth.getTradeHistoryWithStablization(
      id,
      siteration,
      sround
    );
    console.log("tadingws", result.trades);
    setTradeHistoryWS(result.trades);
  };
  const getTradeHistoryNS = async (id: any, siteration: any, sround: any) => {
    const result = await API_Auth.getTradeHistoryWithoutStablization(
      id,
      siteration,
      sround
    );
    console.log("tadingws", result.trade);
    setTradeHistoryNS(result.trade);
  };

  const getExecutionDetails = async (name: any, id: any) => {
    let body = {
      temp_name: name,
      creator: "",
      scenario: "",
      datefrom: "",
      dateto: "",
      resultPerPage: 1,
      pgNo: 1,
    };
    const result = await API_Auth.getSimulationHistory(body);
    console.log(
      "execution",
      result,
      parseInt(result.simulations[0].iterations)
    );

    // setExecutionData(result.simulations[0]);

    setExecutionData({
      created_timestamp: result.simulations[0].created_timestamp,
      iterations: parseInt(result.simulations[0].iterations),
      nb_orders: parseInt(result.simulations[0].nb_orders),
      nb_orders_var: result.simulations[0].nb_orders_var,
      nb_rounds: parseInt(result.simulations[0].nb_rounds),
    });
  };

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
      settemplatename(data.temp_name);
      setSingleTemplate(result.templates[0]);
      setScenarioType(data.scenario_name);
      setinititalmarketprice(data.initial_mkt_price);
      setpricelimit(data.price_var);
      setbasequantity(data.base_quant);
      setquantitylimit(data.quant_var);
      setalpha0(data.alpha0);
      setalpha1(data.alpha1);
      settheta0(data.theta0);
      settheta1(data.theta1);
      setDevPricebuy(data.std_dev_price_buy);
      setDevPricesell(data.std_dev_price_sell);
      setMeanPricebuy(data.mean_price_buy);
      setMeanPricesell(data.mean_price_sell);
      setDevqty(data.std_dev_quant);
      setMeanqty(data.mean_quant);
      setDistribution(data.distribution);
      setcomment(data.comments);
      setlowerbound(data.limit_order_lower_bound);
      setupperbound(data.limit_order_upper_bound);
    }
  };

  const editCreateTemplate = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const [activeButton, setActiveButton] = useState("Static");

  const handleButtonClick = (buttonName: SetStateAction<string>) => {
    setActiveButton(buttonName);
  };
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleColumn = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInput = (e: any) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    if (name === "scenarioType") {
      setScenarioType(value);
    }
    if (name == "inititalmarketprice") {
      setinititalmarketprice(value);
    }
    if (name == "basequantity") {
      setbasequantity(value);
    }
    if (name == "alpha0") {
      setalpha0(value);
    }
    if (name == "theta0") {
      settheta0(value);
    }
    if (name == "distribution") {
      setDistribution(value);
    }
    if (name == "templatename") {
      settemplatename(value);
    }
    if (name == "pricelimit") {
      setpricelimit(value);
    }
    if (name == "quantitylimit") {
      setquantitylimit(value);
    }
    if (name == "upperbonds") {
      setupperbound(value);
    }
    if (name == "lowerbonds") {
      setlowerbound(value);
    }
    if (name == "alpha1") {
      setalpha1(value);
    }
    if (name == "theta1") {
      settheta1(value);
    }
    if (name == "comment") {
      setcomment(value);
    }
    if (name == "siteration") {
      setSIteration(value);
    }
    if (name == "sround") {
      setSRound(value);
    }
  };

  const handleSearch = () => {
    let error = 0;

    if (siteration == "") {
      error = error + 1;
      setSIterationErr("Please Enter Iteration");
    } else if (Number(siteration) > Number(executionData.iterations)) {
      error = error + 1;
      toast.error(
        "Iteration should not be greater than " + executionData.iterations
      );
    } else {
      setSIterationErr("");
    }
    if (sround == "") {
      error = error + 1;
      setSRoundErr("Please Enter Round");
    } else if (Number(sround) > Number(executionData.nb_rounds)) {
      error = error + 1;
      toast.error(
        "Round should not be greater than " + executionData.nb_rounds
      );
    } else {
      setSRoundErr("");
    }

    if (error == 0) {
      if (tabIndex == 1) {
        getOrderBook(ex_id, siteration, sround);
      }
      if (tabIndex == 2) {
        getOrderBook(ex_id, siteration, sround);
      }

      if (tabIndex == 3) {
        getTradeHistoryWS(ex_id, siteration, sround);
      }
      if (tabIndex == 4) {
        getTradeHistoryNS(ex_id, siteration, sround);
      }
      if (tabIndex == 5) {
        getSimulationResultDetails(ex_id);
      }

      if (tabIndex == 6) {
        getStablizationFund(ex_id);
      }
      console.log("tabIndex", tabIndex);
    }
  };
  const handleFirstIteration = () => {
    setSIteration(1)
  }
  const handleLastIteration = () => {
    setSIteration(executionData.iterations)

  }
  const handleIncrementIteration = () => {
    if (Number(siteration) > Number(executionData.iterations)) {
      toast.error(
        "Iteration should not be greater than " + executionData.iterations
      );
    } else {
      let x = siteration + 1;
      setSIteration(x)
    }
  }
  const handleDecrementIteration = () => {
    if (Number(siteration) < 1) { } else {
      let x = Number(siteration) - 1;
      setSIteration(x)
    }
  }

  const handleFirstRound = () => {
    setSRound(1)
  }
  const handleLastRound = () => {
    setSRound(executionData.nb_rounds)

  }
  const handleIncrementRound = () => {
    if (Number(sround) > Number(executionData.nb_rounds)) {
      toast.error(
        "Rounds should not be greater than " + executionData.nb_rounds
      );
    } else {
      let x = sround + 1;
      setSRound(x)
    }
  }
  const handleDecrementRound = () => {
    if (Number(sround) < 1) { } else {
      let x = Number(sround) - 1;
      setSRound(x)
    }
  }


  return (
    <div className="container-fluid">
      <div className="simulation-info history">
        <div
          className="template-header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="back-option">
            <img src="imgs/left-arrow.svg" alt="" />
            <p className="mb-0">Back</p>
          </div>
          <div className="main-header"></div>
          <div className="right-head info">
            {/* <div className="format"> */}
            <p>Download Report :</p>
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

        <div className="simulation-section">
          <div className="row">
            <div
              className={
                isExpanded ? "col-md-4 expanded" : "col-sm-1 compressed"
              }
            >
              <div className="template-modal">
                <div className="modal-header">
                  <img
                    src={isExpanded ? "imgs/compress.svg" : "imgs/expand.svg"}
                    alt=""
                    onClick={toggleColumn}
                  />
                </div>
                <div className="modal-details">
                  <div className="head">
                    <div className="left-head">Template Details</div>
                  </div>
                  <div className="bottom-head">
                    <div className="title">{templatename}</div>
                    <div className="simulation-time">
                      <div className="time">
                        <label htmlFor="simulationtime">Simulation Time</label>
                        <span>
                          {" "}
                          {moment(executionData.created_timestamp).format(
                            "MM/DD/YYYY h:mm:ss A"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="details-section">
                    <div className="template-details">
                      <div className="table-responsive">
                        <div className="template-content">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Scenario Type</th>
                                <th>{scenarioType}</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Initial Market Price</td>
                                <td>
                                  <input
                                    type="text"
                                    id="price"
                                    name="inititalmarketprice"
                                    required
                                    value={inititalmarketprice}
                                    onChange={handleInput}
                                  />
                                  {inititalmarketpriceErr != "" && (
                                    <p className="alert-message">
                                      {inititalmarketpriceErr}
                                    </p>
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>Price Variance Limit</td>
                                <td>
                                  <input
                                    type="text"
                                    id="pricelimit"
                                    name="pricelimit"
                                    required
                                    value={pricelimit}
                                    onChange={handleInput}
                                  />
                                  {pricelimitErr != "" && (
                                    <p className="alert-message">
                                      {pricelimitErr}
                                    </p>
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>Base Quantity</td>
                                <td>
                                  <input
                                    type="text"
                                    id="quantity"
                                    name="basequantity"
                                    required
                                    value={basequantity}
                                    onChange={handleInput}
                                  />
                                  {basequantityErr != "" && (
                                    <p className="alert-message">
                                      {basequantityErr}
                                    </p>
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>Quantity Variance Limit</td>
                                <td>
                                  <input
                                    type="text"
                                    id="quantitylimit"
                                    name="quantitylimit"
                                    required
                                    value={quantitylimit}
                                    onChange={handleInput}
                                  />
                                  {quantitylimitErr != "" && (
                                    <p className="alert-message">
                                      {quantitylimitErr}
                                    </p>
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>Limit Order Upper Bound</td>
                                <td>
                                  <input
                                    type="text"
                                    id="upperbonds"
                                    name="upperbonds"
                                    required
                                    value={upperbound}
                                    onChange={handleInput}
                                  />
                                  {upperboundErr != "" && (
                                    <p className="alert-message">
                                      {upperboundErr}
                                    </p>
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>Limit Order Lower Bound</td>
                                <td>
                                  <input
                                    type="text"
                                    id="lowerbonds"
                                    name="lowerbonds"
                                    required
                                    value={lowerbound}
                                    onChange={handleInput}
                                  />
                                  {lowerboundErr != "" && (
                                    <p className="alert-message">
                                      {lowerboundErr}
                                    </p>
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="table-responsive">
                        <div className="template-content">
                          <table className="table">
                            <tbody>
                              <tr>
                                <td>Alpha 0</td>
                                <td>
                                  <input
                                    type="text"
                                    id="alpha0"
                                    name="alpha0"
                                    required
                                    value={alpha0}
                                    onChange={handleInput}
                                  />
                                  {alpha0Err != "" && (
                                    <p className="alert-message">{alpha0Err}</p>
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>Alpha 1</td>
                                <td>
                                  <input
                                    type="text"
                                    id="alpha1"
                                    name="alpha1"
                                    required
                                    value={alpha1}
                                    onChange={handleInput}
                                  />
                                  {alpha1Err != "" && (
                                    <p className="alert-message">{alpha1Err}</p>
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>Theta 0</td>
                                <td>
                                  <input
                                    type="text"
                                    id="theta0"
                                    name="theta0"
                                    required
                                    value={theta0}
                                    onChange={handleInput}
                                  />
                                  {theta0Err != "" && (
                                    <p className="alert-message">{theta0Err}</p>
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>Theta 1</td>
                                <td>
                                  <input
                                    type="text"
                                    id="theta1"
                                    name="theta1"
                                    required
                                    value={theta1}
                                    onChange={handleInput}
                                  />
                                  {theta1Err != "" && (
                                    <p className="alert-message">{theta1Err}</p>
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>Distribution</td>
                                <td>
                                  <input
                                    type="text"
                                    id="distribution"
                                    name="distribution"
                                    required
                                    value={distribution}
                                  />
                                  {/*  <select
                                    name="distribution"
                                    id="distribution"
                                    value={distribution}
                                    onChange={handleInput}
                                    required
                                  >
                                    <option value="volvo">
                                      Select Distribution Type
                                    </option>

                                    <option value="volvo">Poisonous</option>
                                    <option value="Crash">Uniform</option>
                                    <option value="Bubble">Gaussian</option>
                                  </select>
                                  {distributionErr != "" && (
                                    <p className="alert-message">
                                      {distributionErr}
                                    </p>
                                  )} */}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="table-responsive">
                        <div className="template-content">
                          <table className="table">
                            <tbody>
                              <tr>
                                <td>Number Of Iterations</td>
                                <td>
                                  <input
                                    type="text"
                                    value={executionData.iterations}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Number Of Rounds</td>
                                <td>
                                  <input
                                    type="text"
                                    value={executionData.nb_rounds}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Number Of Orders In Each Round</td>
                                <td>
                                  <input
                                    type="text"
                                    value={executionData.nb_orders}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="modal-comment">
                      <label htmlFor="comment">Comment</label>
                      <p>{comment}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-md-8"
              style={{
                width: isExpanded ? "65%" : "94%",
                marginLeft: "15px",
                paddingTop: "10px",
              }}
            >
              <div className="details-section">
                {/* <div className="btn-group">
                  <button
                    className={activeButton === "Static" ? "btn active" : "btn"}
                    onClick={() => handleButtonClick("Static")}
                  >
                    Static
                  </button>
                  <button
                    className={
                      activeButton === "Dynamic" ? "btn active" : "btn"
                    }
                    onClick={() => handleButtonClick("Dynamic")}
                  >
                    Dynamic
                  </button>
                </div> */}
                <div className="tab-section">
                  <Tabs
                    selectedIndex={tabIndex}
                    onSelect={(tabIndex: SetStateAction<number>) =>
                      setTabIndex(tabIndex)
                    }
                  >
                    <TabList>
                      <Tab>Info</Tab>
                      <Tab>
                        Order Book <span> (Stabilization)</span>{" "}
                      </Tab>
                      <Tab>Order Book </Tab>
                      <Tab>
                        Trade History <span>(Stabilization)</span>{" "}
                      </Tab>
                      <Tab>Trade History </Tab>
                      <Tab>Simulation Result</Tab>
                      <Tab>Stabilization Fund</Tab>
                    </TabList>
                    <TabPanel className="info">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s
                    </TabPanel>
                    <TabPanel className="order-book">
                      <div className="orderbook-header">
                        <div className="search-round">
                          <div className="controls">
                            <h3>Iteration</h3>
                            <div className="previous">
                              {siteration == 1 && <img src="imgs/left-doublearrowg.svg" alt="" />}
                              {siteration != 1 && <img src="imgs/left-doublearrow.svg" alt="" onClick={() =>
                                handleFirstIteration()} />}

                              {siteration != 1 && <img src="imgs/left-paging.svg" alt="" onClick={() => handleDecrementIteration()} />}
                              {siteration == 1 && <img src="imgs/previous.svg" alt="" />}

                            </div>
                            <div className="iteration">
                              <div className="tooldrop">
                                <input
                                  value={siteration}
                                  name="siteration"
                                  onChange={handleInput}
                                />
                                {siterationErr != "" && (
                                  <p className="alert-message">
                                    {siterationErr}
                                  </p>
                                )}{" "}
                              </div>
                              <span>of {executionData.iterations}</span>
                            </div>
                            <div className="next">
                              {siteration != executionData.iterations && <img src="imgs/next-arrow.svg" alt="" onClick={() => handleIncrementIteration()} />}
                              {siteration == executionData.iterations && <img src="imgs/right-paging-gray.svg" alt="" />}

                              {siteration != executionData.iterations && <img src="imgs/right-doublearrow.svg" alt="" onClick={() => handleLastIteration()} />}
                              {siteration == executionData.iterations && <img src="imgs/right-doublearrowg.svg" alt="" />}

                            </div>
                          </div>
                          <div className="round">
                            <h3>Round</h3>
                            <div className="previous">
                              {sround == 1 && <img src="imgs/left-doublearrowg.svg" alt="" />}
                              {sround != 1 && <img src="imgs/left-doublearrow.svg" alt="" onClick={() =>
                                handleFirstRound()} />}

                              {sround != 1 && <img src="imgs/left-paging.svg" alt=""
                                onClick={() => handleDecrementRound()} />}
                              {sround == 1 && <img src="imgs/previous.svg" alt="" />}
                            </div>
                            <div className="iteration">
                              <div className="tooldrop">
                                <input
                                  value={sround}
                                  name="sround"
                                  onChange={handleInput}
                                />
                                {sroundErr != "" && (
                                  <p className="alert-message">{sroundErr}</p>
                                )}{" "}
                              </div>
                              <span>of {executionData.nb_rounds}</span>
                            </div>
                            <div className="next">
                              {sround != executionData.nb_rounds && <img src="imgs/next-arrow.svg" alt=""
                                onClick={() => handleIncrementRound()} />}
                              {sround == executionData.nb_rounds && <img src="imgs/right-paging-gray.svg" alt="" />}

                              {sround != executionData.nb_rounds && <img src="imgs/right-doublearrow.svg" alt=""
                                onClick={() => handleLastRound()} />}
                              {sround == executionData.nb_rounds && <img src="imgs/right-doublearrowg.svg" alt="" />}
                            </div>
                          </div>
                          <div className="search-controls">
                            <button
                              className="search"
                              onClick={() => handleSearch()}
                            >
                              Search
                            </button>
                          </div>
                        </div>
                        {/* <div className="tabs"></div> */}
                      </div>
                      <div className="row">
                        <div className="col sell">
                          <div className="orderNo">
                            <label htmlFor="order">Total Orders:</label>
                            <span>{executionData.nb_orders}</span>
                          </div>
                          <div className="table-responsive">
                            <div className="table-content">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Quantity</th>
                                    <th>Buy Price</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>153</td>
                                    <td>8.94</td>
                                  </tr>
                                  <tr>
                                    <td>153</td>
                                    <td>8.94</td>
                                  </tr>
                                  <tr>
                                    <td>153</td>
                                    <td>8.94</td>
                                  </tr>
                                </tbody>
                              </table>{" "}
                            </div>
                          </div>
                        </div>

                        <div className="col buy">
                          <div className="orderNo">
                            <label htmlFor="order">Total Orders:</label>
                            <span>{executionData.nb_orders}</span>
                          </div>
                          <div className="table-responsive">
                            <div className="table-content">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Sell Price</th>
                                    <th>Quantity</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>9.87</td>
                                    <td>54</td>
                                  </tr>
                                  <tr>
                                    <td>9.87</td>
                                    <td>54</td>
                                  </tr>
                                  <tr>
                                    <td>9.87</td>
                                    <td>54</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="footer">
                          <div className="orderbook-header">
                            <div className="search-round">
                              <div className="controls">
                                <h3>Iteration</h3>
                                <div className="previous">
                                  {siteration == 1 && <img src="imgs/left-doublearrowg.svg" alt="" />}
                                  {siteration != 1 && <img src="imgs/left-doublearrow.svg" alt="" onClick={() =>
                                    handleFirstIteration()} />}

                                  {siteration != 1 && <img src="imgs/left-paging.svg" alt="" onClick={() => handleDecrementIteration()} />}
                                  {siteration == 1 && <img src="imgs/previous.svg" alt="" />}
                                </div>
                                <div className="iteration">
                                  <div className="tooldrop">
                                    <input
                                      value={siteration}
                                      name="siteration"
                                      onChange={handleInput}
                                    />
                                    {siterationErr != "" && (
                                      <p className="alert-message">
                                        {siterationErr}
                                      </p>
                                    )}{" "}
                                  </div>
                                  <span>of {executionData.iterations}</span>
                                </div>
                                <div className="next">
                                  {siteration != executionData.iterations && <img src="imgs/next-arrow.svg" alt="" onClick={() => handleIncrementIteration()} />}
                                  {siteration == executionData.iterations && <img src="imgs/right-paging-gray.svg" alt="" />}

                                  {siteration != executionData.iterations && <img src="imgs/right-doublearrow.svg" alt="" onClick={() => handleLastIteration()} />}
                                  {siteration == executionData.iterations && <img src="imgs/right-doublearrowg.svg" alt="" />}

                                </div>
                              </div>
                              <div className="round">
                                <h3>Round</h3>
                                <div className="previous">
                                  {sround == 1 && <img src="imgs/left-doublearrowg.svg" alt="" />}
                                  {sround != 1 && <img src="imgs/left-doublearrow.svg" alt="" onClick={() =>
                                    handleFirstRound()} />}

                                  {sround != 1 && <img src="imgs/left-paging.svg" alt=""
                                    onClick={() => handleDecrementRound()} />}
                                  {sround == 1 && <img src="imgs/previous.svg" alt="" />}
                                </div>
                                <div className="iteration">
                                  <div className="tooldrop">
                                    <input
                                      value={sround}
                                      name="sround"
                                      onChange={handleInput}
                                    />
                                    {sroundErr != "" && (
                                      <p className="alert-message">
                                        {sroundErr}
                                      </p>
                                    )}{" "}
                                  </div>
                                  <span>of {executionData.nb_rounds}</span>
                                </div>
                                <div className="next">
                                  {sround != executionData.nb_rounds && <img src="imgs/next-arrow.svg" alt=""
                                    onClick={() => handleIncrementRound()} />}
                                  {sround == executionData.nb_rounds && <img src="imgs/right-paging-gray.svg" alt="" />}

                                  {sround != executionData.nb_rounds && <img src="imgs/right-doublearrow.svg" alt=""
                                    onClick={() => handleLastRound()} />}
                                  {sround == executionData.nb_rounds && <img src="imgs/right-doublearrowg.svg" alt="" />}

                                </div>
                              </div>
                              <div className="search-controls">
                                <button
                                  className="search"
                                  onClick={() => handleSearch()}
                                >
                                  Search
                                </button>
                              </div>
                            </div>
                            {/* <div className="tabs"></div> */}
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel className="order-book">
                      <div className="orderbook-header">
                        <div className="search-round">
                          <div className="controls">
                            <h3>Iteration</h3>
                            <div className="previous">
                              {siteration == 1 && <img src="imgs/left-doublearrowg.svg" alt="" />}
                              {siteration != 1 && <img src="imgs/left-doublearrow.svg" alt="" onClick={() =>
                                handleFirstIteration()} />}

                              {siteration != 1 && <img src="imgs/left-paging.svg" alt="" onClick={() => handleDecrementIteration()} />}
                              {siteration == 1 && <img src="imgs/previous.svg" alt="" />}

                            </div>
                            <div className="iteration">
                              <div className="tooldrop">
                                <input
                                  value={siteration}
                                  name="siteration"
                                  onChange={handleInput}
                                />
                                {siterationErr != "" && (
                                  <p className="alert-message">
                                    {siterationErr}
                                  </p>
                                )}{" "}
                              </div>
                              <span>of {executionData.iterations}</span>
                            </div>
                            <div className="next">
                              {siteration != executionData.iterations && <img src="imgs/next-arrow.svg" alt="" onClick={() => handleIncrementIteration()} />}
                              {siteration == executionData.iterations && <img src="imgs/right-paging-gray.svg" alt="" />}

                              {siteration != executionData.iterations && <img src="imgs/right-doublearrow.svg" alt="" onClick={() => handleLastIteration()} />}
                              {siteration == executionData.iterations && <img src="imgs/right-doublearrowg.svg" alt="" />}

                            </div>
                          </div>
                          <div className="round">
                            <h3>Round</h3>
                            <div className="previous">
                              {sround == 1 && <img src="imgs/left-doublearrowg.svg" alt="" />}
                              {sround != 1 && <img src="imgs/left-doublearrow.svg" alt="" onClick={() =>
                                handleFirstRound()} />}

                              {sround != 1 && <img src="imgs/left-paging.svg" alt=""
                                onClick={() => handleDecrementRound()} />}
                              {sround == 1 && <img src="imgs/previous.svg" alt="" />}
                            </div>
                            <div className="iteration">
                              <div className="tooldrop">
                                <input
                                  value={sround}
                                  name="sround"
                                  onChange={handleInput}
                                />
                                {sroundErr != "" && (
                                  <p className="alert-message">{sroundErr}</p>
                                )}{" "}
                              </div>
                              <span>of {executionData.nb_rounds}</span>
                            </div>
                            <div className="next">
                              {sround != executionData.nb_rounds && <img src="imgs/next-arrow.svg" alt=""
                                onClick={() => handleIncrementRound()} />}
                              {sround == executionData.nb_rounds && <img src="imgs/right-paging-gray.svg" alt="" />}

                              {sround != executionData.nb_rounds && <img src="imgs/right-doublearrow.svg" alt=""
                                onClick={() => handleLastRound()} />}
                              {sround == executionData.nb_rounds && <img src="imgs/right-doublearrowg.svg" alt="" />}
                            </div>
                          </div>
                          <div className="search-controls">
                            <button
                              className="search"
                              onClick={() => handleSearch()}
                            >
                              Search
                            </button>
                          </div>
                        </div>
                        {/* <div className="tabs"></div> */}
                      </div>
                      <div className="row">
                        <div className="col sell">
                          <div className="orderNo">
                            <label htmlFor="order">Total Orders:</label>
                            <span>30</span>
                          </div>
                          <div className="table-responsive">
                            <div className="table-content">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Quantity</th>
                                    <th>Buy Price</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>153</td>
                                    <td>8.94</td>
                                  </tr>
                                  <tr>
                                    <td>153</td>
                                    <td>8.94</td>
                                  </tr>
                                  <tr>
                                    <td>153</td>
                                    <td>8.94</td>
                                  </tr>
                                </tbody>
                              </table>{" "}
                            </div>
                          </div>
                        </div>

                        <div className="col buy">
                          <div className="orderNo">
                            <label htmlFor="order">Total Orders:</label>
                            <span>25</span>
                          </div>
                          <div className="table-responsive">
                            <div className="table-content">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Sell Price</th>
                                    <th>Quantity</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>9.87</td>
                                    <td>54</td>
                                  </tr>
                                  <tr>
                                    <td>9.87</td>
                                    <td>54</td>
                                  </tr>
                                  <tr>
                                    <td>9.87</td>
                                    <td>54</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="footer">
                          <div className="orderbook-header">
                            <div className="search-round">
                              <div className="controls">
                                <h3>Iteration</h3>
                                <div className="previous">
                                  {siteration == 1 && <img src="imgs/left-doublearrowg.svg" alt="" />}
                                  {siteration != 1 && <img src="imgs/left-doublearrow.svg" alt="" onClick={() =>
                                    handleFirstIteration()} />}

                                  {siteration != 1 && <img src="imgs/left-paging.svg" alt="" onClick={() => handleDecrementIteration()} />}
                                  {siteration == 1 && <img src="imgs/previous.svg" alt="" />}

                                </div>
                                <div className="iteration">
                                  <div className="tooldrop">
                                    <input
                                      value={siteration}
                                      name="siteration"
                                      onChange={handleInput}
                                    />
                                    {siterationErr != "" && (
                                      <p className="alert-message">
                                        {siterationErr}
                                      </p>
                                    )}{" "}
                                  </div>
                                  <span>of {executionData.iterations}</span>
                                </div>
                                <div className="next">
                                  {siteration != executionData.iterations && <img src="imgs/next-arrow.svg" alt="" onClick={() => handleIncrementIteration()} />}
                                  {siteration == executionData.iterations && <img src="imgs/right-paging-gray.svg" alt="" />}

                                  {siteration != executionData.iterations && <img src="imgs/right-doublearrow.svg" alt="" onClick={() => handleLastIteration()} />}
                                  {siteration == executionData.iterations && <img src="imgs/right-doublearrowg.svg" alt="" />}

                                </div>
                              </div>
                              <div className="round">
                                <h3>Round</h3>
                                <div className="previous">
                                  {sround == 1 && <img src="imgs/left-doublearrowg.svg" alt="" />}
                                  {sround != 1 && <img src="imgs/left-doublearrow.svg" alt="" onClick={() =>
                                    handleFirstRound()} />}

                                  {sround != 1 && <img src="imgs/left-paging.svg" alt=""
                                    onClick={() => handleDecrementRound()} />}
                                  {sround == 1 && <img src="imgs/previous.svg" alt="" />}
                                </div>
                                <div className="iteration">
                                  <div className="tooldrop">
                                    <input
                                      value={sround}
                                      name="sround"
                                      onChange={handleInput}
                                    />
                                    {sroundErr != "" && (
                                      <p className="alert-message">
                                        {sroundErr}
                                      </p>
                                    )}{" "}
                                  </div>
                                  <span>of {executionData.nb_rounds}</span>
                                </div>
                                <div className="next">
                                  {sround != executionData.nb_rounds && <img src="imgs/next-arrow.svg" alt=""
                                    onClick={() => handleIncrementRound()} />}
                                  {sround == executionData.nb_rounds && <img src="imgs/right-paging-gray.svg" alt="" />}

                                  {sround != executionData.nb_rounds && <img src="imgs/right-doublearrow.svg" alt=""
                                    onClick={() => handleLastRound()} />}
                                  {sround == executionData.nb_rounds && <img src="imgs/right-doublearrowg.svg" alt="" />}
                                </div>
                              </div>
                              <div className="search-controls">
                                <button
                                  className="search"
                                  onClick={() => handleSearch()}
                                >
                                  Search
                                </button>
                              </div>
                            </div>
                            {/* <div className="tabs"></div> */}
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel className="trade-history-ws">
                      <div className="ws">
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
                        <div className="search-round">
                          <div className="controls">
                            <h3>Iteration</h3>
                            <div className="previous">
                              {siteration == 1 && <img src="imgs/left-doublearrowg.svg" alt="" />}
                              {siteration != 1 && <img src="imgs/left-doublearrow.svg" alt="" onClick={() =>
                                handleFirstIteration()} />}

                              {siteration != 1 && <img src="imgs/left-paging.svg" alt="" onClick={() => handleDecrementIteration()} />}
                              {siteration == 1 && <img src="imgs/previous.svg" alt="" />}

                            </div>
                            <div className="iteration">
                              <div className="tooldrop">
                                {/*   <select name="" id="">
                                  <option value="5">1</option>
                                  <option value="10">10</option>
                                  <option value="20">20</option>
                                </select> */}
                                <input
                                  value={siteration}
                                  name="siteration"
                                  onChange={handleInput}
                                />
                                {siterationErr != "" && (
                                  <p className="alert-message">
                                    {siterationErr}
                                  </p>
                                )}
                              </div>
                              <span>of {executionData.iterations}</span>
                            </div>
                            <div className="next">
                              {siteration != executionData.iterations && <img src="imgs/next-arrow.svg" alt="" onClick={() => handleIncrementIteration()} />}
                              {siteration == executionData.iterations && <img src="imgs/right-paging-gray.svg" alt="" />}

                              {siteration != executionData.iterations && <img src="imgs/right-doublearrow.svg" alt="" onClick={() => handleLastIteration()} />}
                              {siteration == executionData.iterations && <img src="imgs/right-doublearrowg.svg" alt="" />}

                            </div>
                          </div>
                          <div className="round">
                            <h3>Round</h3>
                            <div className="previous">
                              {sround == 1 && <img src="imgs/left-doublearrowg.svg" alt="" />}
                              {sround != 1 && <img src="imgs/left-doublearrow.svg" alt="" onClick={() =>
                                handleFirstRound()} />}

                              {sround != 1 && <img src="imgs/left-paging.svg" alt=""
                                onClick={() => handleDecrementRound()} />}
                              {sround == 1 && <img src="imgs/previous.svg" alt="" />}
                            </div>
                            <div className="iteration">
                              <div className="tooldrop">
                                <input
                                  value={sround}
                                  name="sround"
                                  onChange={handleInput}
                                />
                                {sroundErr != "" && (
                                  <p className="alert-message">{sroundErr}</p>
                                )}
                              </div>
                              <span>of {executionData.nb_rounds}</span>
                            </div>
                            <div className="next">
                              {sround != executionData.nb_rounds && <img src="imgs/next-arrow.svg" alt=""
                                onClick={() => handleIncrementRound()} />}
                              {sround == executionData.nb_rounds && <img src="imgs/right-paging-gray.svg" alt="" />}

                              {sround != executionData.nb_rounds && <img src="imgs/right-doublearrow.svg" alt=""
                                onClick={() => handleLastRound()} />}
                              {sround == executionData.nb_rounds && <img src="imgs/right-doublearrowg.svg" alt="" />}
                            </div>
                          </div>
                          <div className="search-controls">
                            <button
                              className="search"
                              onClick={() => handleSearch()}
                            >
                              Search
                            </button>
                          </div>
                        </div>
                        <div className="ws-table">
                          <div className="table-responsive">
                            <div className="template-content">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Time</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {tradeHistoryWS.map((item) => (
                                    <tr>
                                      <td>
                                        {moment(item.timestamp).format(
                                          "MM/DD/YYYY h:mm:ss A"
                                        )}
                                      </td>
                                      <td>{item.price}</td>
                                      <td>{item.quantity}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="search-round">
                          <div className="controls">
                            <h3>Iteration</h3>
                            <div className="previous">
                              {siteration == 1 && <img src="imgs/left-doublearrowg.svg" alt="" />}
                              {siteration != 1 && <img src="imgs/left-doublearrow.svg" alt="" onClick={() =>
                                handleFirstIteration()} />}

                              {siteration != 1 && <img src="imgs/left-paging.svg" alt="" onClick={() => handleDecrementIteration()} />}
                              {siteration == 1 && <img src="imgs/previous.svg" alt="" />}

                            </div>
                            <div className="iteration">
                              <div className="tooldrop">
                                {/*   <select name="" id="">
                                  <option value="5">1</option>
                                  <option value="10">10</option>
                                  <option value="20">20</option>
                                </select> */}
                                <input
                                  value={siteration}
                                  name="siteration"
                                  onChange={handleInput}
                                />
                                {siterationErr != "" && (
                                  <p className="alert-message">
                                    {siterationErr}
                                  </p>
                                )}
                              </div>
                              <span>of {executionData.iterations}</span>
                            </div>
                            <div className="next">
                              {siteration != executionData.iterations && <img src="imgs/next-arrow.svg" alt="" onClick={() => handleIncrementIteration()} />}
                              {siteration == executionData.iterations && <img src="imgs/right-paging-gray.svg" alt="" />}

                              {siteration != executionData.iterations && <img src="imgs/right-doublearrow.svg" alt="" onClick={() => handleLastIteration()} />}
                              {siteration == executionData.iterations && <img src="imgs/right-doublearrowg.svg" alt="" />}

                            </div>
                          </div>
                          <div className="round">
                            <h3>Round</h3>
                            <div className="previous">
                              {sround == 1 && <img src="imgs/left-doublearrowg.svg" alt="" />}
                              {sround != 1 && <img src="imgs/left-doublearrow.svg" alt="" onClick={() =>
                                handleFirstRound()} />}

                              {sround != 1 && <img src="imgs/left-paging.svg" alt=""
                                onClick={() => handleDecrementRound()} />}
                              {sround == 1 && <img src="imgs/previous.svg" alt="" />}
                            </div>
                            <div className="iteration">
                              <div className="tooldrop">
                                <input
                                  value={sround}
                                  name="sround"
                                  onChange={handleInput}
                                />
                                {sroundErr != "" && (
                                  <p className="alert-message">{sroundErr}</p>
                                )}
                              </div>
                              <span>of {executionData.nb_rounds}</span>
                            </div>
                            <div className="next">
                              {sround != executionData.nb_rounds && <img src="imgs/next-arrow.svg" alt=""
                                onClick={() => handleIncrementRound()} />}
                              {sround == executionData.nb_rounds && <img src="imgs/right-paging-gray.svg" alt="" />}

                              {sround != executionData.nb_rounds && <img src="imgs/right-doublearrow.svg" alt=""
                                onClick={() => handleLastRound()} />}
                              {sround == executionData.nb_rounds && <img src="imgs/right-doublearrowg.svg" alt="" />}
                            </div>
                          </div>
                          <div className="search-controls">
                            <button
                              className="search"
                              onClick={() => handleSearch()}
                            >
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel className="trade-history-ns">
                      <div className="ns">
                        <div className="search-round">
                          <div className="controls">
                            <h3>Iteration</h3>
                            <div className="previous">
                              {siteration == 1 && <img src="imgs/left-doublearrowg.svg" alt="" />}
                              {siteration != 1 && <img src="imgs/left-doublearrow.svg" alt="" onClick={() =>
                                handleFirstIteration()} />}

                              {siteration != 1 && <img src="imgs/left-paging.svg" alt="" onClick={() => handleDecrementIteration()} />}
                              {siteration == 1 && <img src="imgs/previous.svg" alt="" />}

                            </div>
                            <div className="iteration">
                              <div className="tooldrop">
                                {/*   <select name="" id="">
                                  <option value="5">1</option>
                                  <option value="10">10</option>
                                  <option value="20">20</option>
                                </select> */}
                                <input
                                  value={siteration}
                                  name="siteration"
                                  onChange={handleInput}
                                />
                                {siterationErr != "" && (
                                  <p className="alert-message">
                                    {siterationErr}
                                  </p>
                                )}
                              </div>
                              <span>of {executionData.iterations}</span>
                            </div>
                            <div className="next">
                              {siteration != executionData.iterations && <img src="imgs/next-arrow.svg" alt="" onClick={() => handleIncrementIteration()} />}
                              {siteration == executionData.iterations && <img src="imgs/right-paging-gray.svg" alt="" />}

                              {siteration != executionData.iterations && <img src="imgs/right-doublearrow.svg" alt="" onClick={() => handleLastIteration()} />}
                              {siteration == executionData.iterations && <img src="imgs/right-doublearrowg.svg" alt="" />}

                            </div>
                          </div>
                          <div className="round">
                            <h3>Round</h3>
                            <div className="previous">
                              {sround == 1 && <img src="imgs/left-doublearrowg.svg" alt="" />}
                              {sround != 1 && <img src="imgs/left-doublearrow.svg" alt="" onClick={() =>
                                handleFirstRound()} />}

                              {sround != 1 && <img src="imgs/left-paging.svg" alt=""
                                onClick={() => handleDecrementRound()} />}
                              {sround == 1 && <img src="imgs/previous.svg" alt="" />}
                            </div>
                            <div className="iteration">
                              <div className="tooldrop">
                                {/*  <select name="" id="">
                                  <option value="5">3</option>
                                  <option value="10">10</option>
                                  <option value="20">20</option>
                                </select> */}
                                <input
                                  value={sround}
                                  name="sround"
                                  onChange={handleInput}
                                />
                                {sroundErr != "" && (
                                  <p className="alert-message">{sroundErr}</p>
                                )}
                              </div>
                              <span>of {executionData.nb_rounds}</span>
                            </div>
                            <div className="next">
                              {sround != executionData.nb_rounds && <img src="imgs/next-arrow.svg" alt=""
                                onClick={() => handleIncrementRound()} />}
                              {sround == executionData.nb_rounds && <img src="imgs/right-paging-gray.svg" alt="" />}

                              {sround != executionData.nb_rounds && <img src="imgs/right-doublearrow.svg" alt=""
                                onClick={() => handleLastRound()} />}
                              {sround == executionData.nb_rounds && <img src="imgs/right-doublearrowg.svg" alt="" />}
                            </div>
                          </div>
                          <div className="search-controls">
                            <button
                              className="search"
                              onClick={() => handleSearch()}
                            >
                              Search
                            </button>
                          </div>
                        </div>
                        <div className="ns-table">
                          <div className="table-responsive">
                            <div className="table-content">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Time</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {/*  <tr>
                                    <td>2024-01-05 15:31:40</td>
                                    <td>615.00</td>
                                    <td>141.45</td>
                                  </tr>
                                  <tr>
                                    <td>2024-01-05 15:31:40</td>
                                    <td>615.00</td>
                                    <td>141.45</td>
                                  </tr>
                                  <tr> 
                                    <td>2024-01-05 15:31:40</td>
                                    <td>615.00</td>
                                    <td>141.45</td>
                                  </tr>*/}
                                  {tradeHistoryNS.map((item) => (
                                    <tr>
                                      <td>
                                        {moment(item.timestamp).format(
                                          "MM/DD/YYYY h:mm:ss A"
                                        )}
                                      </td>
                                      <td>{item.price}</td>
                                      <td>{item.quantity}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="search-round">
                          <div className="controls">
                            <h3>Iteration</h3>
                            <div className="previous">
                              {siteration == 1 && <img src="imgs/left-doublearrowg.svg" alt="" />}
                              {siteration != 1 && <img src="imgs/left-doublearrow.svg" alt="" onClick={() =>
                                handleFirstIteration()} />}

                              {siteration != 1 && <img src="imgs/left-paging.svg" alt="" onClick={() => handleDecrementIteration()} />}
                              {siteration == 1 && <img src="imgs/previous.svg" alt="" />}

                            </div>
                            <div className="iteration">
                              <div className="tooldrop">
                                <input
                                  value={siteration}
                                  name="siteration"
                                  onChange={handleInput}
                                />
                                {siterationErr != "" && (
                                  <p className="alert-message">
                                    {siterationErr}
                                  </p>
                                )}
                              </div>
                              <span>of {executionData.iterations}</span>
                            </div>
                            <div className="next">
                              {siteration != executionData.iterations && <img src="imgs/next-arrow.svg" alt="" onClick={() => handleIncrementIteration()} />}
                              {siteration == executionData.iterations && <img src="imgs/right-paging-gray.svg" alt="" />}

                              {siteration != executionData.iterations && <img src="imgs/right-doublearrow.svg" alt="" onClick={() => handleLastIteration()} />}
                              {siteration == executionData.iterations && <img src="imgs/right-doublearrowg.svg" alt="" />}

                            </div>
                          </div>
                          <div className="round">
                            <h3>Round</h3>
                            <div className="previous">
                              {sround == 1 && <img src="imgs/left-doublearrowg.svg" alt="" />}
                              {sround != 1 && <img src="imgs/left-doublearrow.svg" alt="" onClick={() =>
                                handleFirstRound()} />}

                              {sround != 1 && <img src="imgs/left-paging.svg" alt=""
                                onClick={() => handleDecrementRound()} />}
                              {sround == 1 && <img src="imgs/previous.svg" alt="" />}
                            </div>
                            <div className="iteration">
                              <div className="tooldrop">
                                <input
                                  value={sround}
                                  name="sround"
                                  onChange={handleInput}
                                />
                                {sroundErr != "" && (
                                  <p className="alert-message">{sroundErr}</p>
                                )}
                              </div>
                              <span>of {executionData.nb_rounds}</span>
                            </div>
                            <div className="next">
                              {sround != executionData.nb_rounds && <img src="imgs/next-arrow.svg" alt=""
                                onClick={() => handleIncrementRound()} />}
                              {sround == executionData.nb_rounds && <img src="imgs/right-paging-gray.svg" alt="" />}

                              {sround != executionData.nb_rounds && <img src="imgs/right-doublearrow.svg" alt=""
                                onClick={() => handleLastRound()} />}
                              {sround == executionData.nb_rounds && <img src="imgs/right-doublearrowg.svg" alt="" />}
                            </div>
                          </div>
                          <div className="search-controls">
                            <button
                              className="search"
                              onClick={() => handleSearch()}
                            >
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel className="simulation-result">
                      <div className="simulation">
                        <div className="tabs">
                          {" "}
                          <Tabs>
                            <TabList>
                              <Tab>Price</Tab>
                              <Tab>Volume</Tab>
                              <Tab>Quantity</Tab>
                            </TabList>{" "}
                            <TabPanel>
                              {" "}
                              <div className="simulation-graph">
                                MARKET PRICE UPDATES
                              </div>
                              <div className="simulation-table">
                                <div className="table-responsive">
                                  <div className="template-content">
                                    <table className="table">
                                      <thead>
                                        <tr>
                                          <th className="emptycell"></th>
                                          <th className="with">
                                            With Stabilization
                                          </th>
                                          <th className="without">
                                            Without Stabilization
                                          </th>
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
                                          <th className="emptycell">
                                            Standard deviation
                                          </th>
                                          <td>105.77</td>
                                          <td>615.00</td>
                                        </tr>
                                        <tr>
                                          <th className="emptycell">
                                            10% - 90% interval
                                          </th>
                                          <td>55.01</td>
                                          <td>615.00</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>{" "}
                                </div>
                              </div>
                            </TabPanel>
                            <TabPanel>
                              {" "}
                              <div className="simulation-graph">
                                VOLUME UPDATES
                              </div>
                              <div className="simulation-table">
                                <div className="table-responsive">
                                  <div className="template-content">
                                    <table className="table">
                                      <thead>
                                        <tr>
                                          <th className="emptycell"></th>
                                          <th className="with">
                                            With Stabilization
                                          </th>
                                          <th className="without">
                                            Without Stabilization
                                          </th>
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
                                          <th className="emptycell">
                                            Standard deviation
                                          </th>
                                          <td>105.77</td>
                                          <td>615.00</td>
                                        </tr>
                                        <tr>
                                          <th className="emptycell">
                                            10% - 90% interval
                                          </th>
                                          <td>55.01</td>
                                          <td>615.00</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </TabPanel>
                            <TabPanel>
                              {" "}
                              <div className="simulation-graph">
                                QUANTITY UPDATES
                              </div>
                              <div className="simulation-table">
                                <div className="table-responsive">
                                  <div className="template-content">
                                    <table className="table">
                                      <thead>
                                        <tr>
                                          <th className="emptycell"></th>
                                          <th className="with">
                                            With Stabilization
                                          </th>
                                          <th className="without">
                                            Without Stabilization
                                          </th>
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
                                          <th className="emptycell">
                                            Standard deviation
                                          </th>
                                          <td>105.77</td>
                                          <td>615.00</td>
                                        </tr>
                                        <tr>
                                          <th className="emptycell">
                                            10% - 90% interval
                                          </th>
                                          <td>55.01</td>
                                          <td>615.00</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </TabPanel>
                          </Tabs>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel className="stabilization-fund">
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
                                    <th className="emptycell">
                                      Standard deviation
                                    </th>
                                    <td>44963.09</td>
                                    <td>635.46</td>
                                    <td>53901.14</td>
                                    <td>0.26</td>
                                  </tr>
                                  <tr>
                                    <th className="emptycell">
                                      10% - 90% interval
                                    </th>
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
                    </TabPanel>
                  </Tabs>
                  <ToastContainer />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
