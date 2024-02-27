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
    router.push("/runSimulation_infoPage");
  };
  const [tabIndex, setTabIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
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
  };

  const handleCreateTemplate = () => {
    let error = 0;
    if (scenarioType === "") {
      setScenarioTypeErr("Please select scenario");
      error = error + 1;
    } else {
      setScenarioTypeErr("");
    }
    if (inititalmarketprice === "") {
      setinititalmarketpriceErr("Please Enter Initial Market Price");
      error = error + 1;
    } else {
      setinititalmarketpriceErr("");
    }
    if (basequantity === "") {
      setbasequantityErr("Please Enter Base Quantity");
      error = error + 1;
    } else {
      setbasequantityErr("");
    }
    if (alpha0 === "") {
      setalpha0Err("Please Enter Alpha 0");
      error = error + 1;
    } else {
      setalpha0Err("");
    }
    if (theta0 === "") {
      settheta0Err("Please Enter Theta 0");
      error = error + 1;
    } else {
      settheta0Err("");
    }
    if (distribution === "") {
      setdistributionErr("Please Enter Distribution");
      error = error + 1;
    } else {
      setdistributionErr("");
    }
    if (templatename === "") {
      settemplatenameErr("Please Enter Template Name");
      error = error + 1;
    } else {
      settemplatenameErr("");
    }
    if (pricelimit === "") {
      setpricelimitErr("Please Enter Price Variance Limit");
      error = error + 1;
    } else {
      setpricelimitErr("");
    }
    if (quantitylimit === "") {
      setquantitylimitErr("Please Enter Quantity Variance Limit");
      error = error + 1;
    } else {
      setquantitylimitErr("");
    }
    if (upperbound === "") {
      setupperboundErr("Please Enter Upper Bound");
      error = error + 1;
    } else {
      setupperboundErr("");
    }
    if (lowerbound === "") {
      setlowerboundErr("Please Enter Lower Bound");
      error = error + 1;
    } else {
      setlowerboundErr("");
    }
    if (alpha1 === "") {
      setalpha1Err("Please Enter Alpha 1");
      error = error + 1;
    } else {
      setalpha1Err("");
    }
    if (theta1 === "") {
      settheta1Err("Please Enter Theta 1");
      error = error + 1;
    } else {
      settheta1Err("");
    }
    if (comment === "") {
      setcommentErr("Please Enter Comment");
      error = error + 1;
    } else {
      setcommentErr("");
    }

    console.log(error);
    if (error == 0) {
    }
  };
  return (
    <div className="container-fluid">
      <div className="simulation-info">
        <div className="template-header">
          <div className="back-option">
            <img src="imgs/left-arrow.svg" alt="" />
            <p className="mb-0">Back</p>
          </div>
          <div className="main-header"></div>
          <div></div>
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
                    <div className="title">Template1</div>
                  </div>
                  <div className="details-section">
                    <div className="template-details">
                      <div className="table-responsive">
                        <div className="template-content">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Scenario Type*</th>
                                <th>Crash</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Initial Market Price*</td>
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
                                <td>Price Variance Limit*</td>
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
                                <td>Base Quantity*</td>
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
                                <td>Quantity Variance Limit*</td>
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
                                <td>Limit Order Upper Bound*</td>
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
                                <td>Limit Order Lower Bound*</td>
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
                                <td>Alpha 0*</td>
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
                                <td>Alpha 1*</td>
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
                                <td>Theta 0*</td>
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
                                <td>Theta 1*</td>
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
                                <td>Distribution*</td>
                                <td>
                                  <select
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
                                <td>Number Of Iterations*</td>
                                <td>
                                  <input type="text" />
                                </td>
                              </tr>
                              <tr>
                                <td>Number Of Rounds*</td>
                                <td>
                                  <input type="text" />
                                </td>
                              </tr>
                              <tr>
                                <td>Number Of Orders In Each Round*</td>
                                <td>
                                  <input type="text" />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="table-responsive">
                        <div className="template-content">
                          <div className="form-control visibility">
                            <label htmlFor="accessible">Visibility*</label>
                            <div className="radio-button">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio1"
                                  value="option1"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="inlineRadio1"
                                >
                                  Public
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio2"
                                  value="option2"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="inlineRadio2"
                                >
                                  Private
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-comment">
                      <div className="form-content comment">
                        <label htmlFor="comment">
                          Comment <span>(Optional)</span>
                        </label>
                        <textarea
                          class="form-control"
                          id="comment"
                          rows="2"
                          value={comment}
                          onChange={handleInput}
                        ></textarea>
                      </div>
                    </div>
                    <div className="modal-buttons">
                      <button className="run-simulation">Run Simulation</button>
                      <button
                        className="create-template"
                        onClick={() => editCreateTemplate()}
                      >
                        Save As New Template{" "}
                      </button>

                      <Modal
                        show={showModal}
                        onHide={handleCloseModal}
                        className="energy-efficiency"
                      >
                        <Modal.Header className="custom-header">
                          <img
                            src="imgs/close-black.svg"
                            alt=""
                            onClick={handleClose}
                          />
                        </Modal.Header>
                        <Modal.Body>
                          {" "}
                          <div className="modal-details">
                            <div className="save">
                              <label htmlFor="">Save As</label>
                              <input type="text" />
                            </div>
                            <div className="comment">
                              <label htmlFor="">Comment</label>
                              <input type="text" />
                            </div>
                          </div>
                        </Modal.Body>
                        <div className="modal-button">
                          <Button btn-close-black variant="dark">
                            SAVE CHANGES
                          </Button>
                          <Button classname="cancel">CANCEL</Button>
                        </div>
                      </Modal>
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
                      <Tab>Order Book</Tab>
                      <Tab>Trade History (WS)</Tab>
                      <Tab>Trade History (NS)</Tab>
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
                              <img src="imgs/last-previous.svg" alt="" />
                              <img src="imgs/previous.svg" alt="" />
                            </div>
                            <div className="iteration">
                              <div className="tooldrop">
                                <select name="" id="">
                                  <option value="5">1</option>
                                  <option value="10">10</option>
                                  <option value="20">20</option>
                                </select>
                              </div>
                              <span>of 20</span>
                            </div>
                            <div className="next">
                              <img src="imgs/next-arrow.svg" alt="" />
                              <img src="imgs/last-arrow.svg" alt="" />
                            </div>
                          </div>
                          <div className="round">
                            <h3>Round</h3>
                            <div className="previous">
                              <img src="imgs/last-previous.svg" alt="" />
                              <img src="imgs/previous.svg" alt="" />
                            </div>
                            <div className="iteration">
                              <div className="tooldrop">
                                <select name="" id="">
                                  <option value="5">3</option>
                                  <option value="10">10</option>
                                  <option value="20">20</option>
                                </select>
                              </div>
                              <span>of 30</span>
                            </div>
                            <div className="next">
                              <img src="imgs/next-arrow.svg" alt="" />
                              <img src="imgs/last-arrow.svg" alt="" />
                            </div>
                          </div>
                          <div className="search-controls">
                            <button className="search">SEARCH</button>
                          </div>
                        </div>
                        <div className="tabs">
                          <Tabs>
                            <TabList>
                              <Tab>TRADE HISTORY (WS)</Tab>
                              <Tab>TRADE HISTORY (NS)</Tab>
                            </TabList>
                            <TabPanel className="trade-history-ws">
                              {" "}
                              <div className="ws">
                                <div className="stabilization">
                                  <p>Stabilization Fund :</p>
                                  <ul className="stabilization-fund">
                                    <li className="token-issued">
                                      <label htmlFor="token">
                                        Token Issued
                                      </label>
                                      <span>100</span>
                                    </li>
                                    <li className="assets">
                                      <label htmlFor="asset">
                                        Assets (QTY)
                                      </label>
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
                                      <img
                                        src="imgs/last-previous.svg"
                                        alt=""
                                      />
                                      <img src="imgs/previous.svg" alt="" />
                                    </div>
                                    <div className="iteration">
                                      <div className="tooldrop">
                                        <select name="" id="">
                                          <option value="5">1</option>
                                          <option value="10">10</option>
                                          <option value="20">20</option>
                                        </select>
                                      </div>
                                      <span>of 20</span>
                                    </div>
                                    <div className="next">
                                      <img src="imgs/next-arrow.svg" alt="" />
                                      <img src="imgs/last-arrow.svg" alt="" />
                                    </div>
                                  </div>
                                  <div className="round">
                                    <h3>Round</h3>
                                    <div className="previous">
                                      <img
                                        src="imgs/last-previous.svg"
                                        alt=""
                                      />
                                      <img src="imgs/previous.svg" alt="" />
                                    </div>
                                    <div className="iteration">
                                      <div className="tooldrop">
                                        <select name="" id="">
                                          <option value="5">3</option>
                                          <option value="10">10</option>
                                          <option value="20">20</option>
                                        </select>
                                      </div>
                                      <span>of 30</span>
                                    </div>
                                    <div className="next">
                                      <img src="imgs/next-arrow.svg" alt="" />
                                      <img src="imgs/last-arrow.svg" alt="" />
                                    </div>
                                  </div>
                                  <div className="search-controls">
                                    <button className="search">SEARCH</button>
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
                                          <tr>
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
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>

                                  <div className="pagination">
                                    <div className="pagging-area">
                                      <div className="paging-list">
                                        <div className="iteration-para">
                                          <p>Iteration</p>
                                        </div>
                                        <div className="leftaction disable-pointer">
                                          <img
                                            src="imgs/left-doublearrow.svg"
                                            alt=""
                                          />
                                        </div>
                                        <div className="leftaction-single">
                                          <img
                                            src="imgs/left-paging.svg"
                                            alt=""
                                          />
                                        </div>
                                        <ul className="paging-count">
                                          <li>1</li>
                                          <li>2</li>
                                          <li>3</li>
                                          <li>4</li>
                                        </ul>
                                        <div className="rightaction-single">
                                          <img
                                            src="imgs/right-paging.svg"
                                            alt=""
                                          />
                                        </div>
                                        <div className="rightaction">
                                          <img
                                            src="imgs/right-doublearrow.svg"
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="pagging-area rounds">
                                      <div className="paging-list">
                                        <div className="rounds-para">
                                          <p>Round</p>
                                        </div>
                                        <div className="leftaction disable-pointer">
                                          <img
                                            src="imgs/left-doublearrow.svg"
                                            alt=""
                                          />
                                        </div>
                                        <div className="leftaction-single">
                                          <img
                                            src="imgs/left-paging.svg"
                                            alt=""
                                          />
                                        </div>
                                        <ul className="paging-count">
                                          <li>1</li>
                                          <li>2</li>
                                          <li>3</li>
                                          <li>4</li>
                                        </ul>
                                        <div className="rightaction-single">
                                          <img
                                            src="imgs/right-paging.svg"
                                            alt=""
                                          />
                                        </div>
                                        <div className="rightaction">
                                          <img
                                            src="imgs/right-doublearrow.svg"
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                    </div>
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
                                      <img
                                        src="imgs/last-previous.svg"
                                        alt=""
                                      />
                                      <img src="imgs/previous.svg" alt="" />
                                    </div>
                                    <div className="iteration">
                                      <div className="tooldrop">
                                        <select name="" id="">
                                          <option value="5">1</option>
                                          <option value="10">10</option>
                                          <option value="20">20</option>
                                        </select>
                                      </div>
                                      <span>of 20</span>
                                    </div>
                                    <div className="next">
                                      <img src="imgs/next-arrow.svg" alt="" />
                                      <img src="imgs/last-arrow.svg" alt="" />
                                    </div>
                                  </div>
                                  <div className="round">
                                    <h3>Round</h3>
                                    <div className="previous">
                                      <img
                                        src="imgs/last-previous.svg"
                                        alt=""
                                      />
                                      <img src="imgs/previous.svg" alt="" />
                                    </div>
                                    <div className="iteration">
                                      <div className="tooldrop">
                                        <select name="" id="">
                                          <option value="5">3</option>
                                          <option value="10">10</option>
                                          <option value="20">20</option>
                                        </select>
                                      </div>
                                      <span>of 30</span>
                                    </div>
                                    <div className="next">
                                      <img src="imgs/next-arrow.svg" alt="" />
                                      <img src="imgs/last-arrow.svg" alt="" />
                                    </div>
                                  </div>
                                  <div className="search-controls">
                                    <button className="search">SEARCH</button>
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
                                          <tr>
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
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  <div className="pagination">
                                    <div className="pagging-area">
                                      <div className="paging-list">
                                        <div className="iteration-para">
                                          <p>Iteration</p>
                                        </div>
                                        <div className="leftaction disable-pointer">
                                          <img
                                            src="imgs/left-doublearrow.svg"
                                            alt=""
                                          />
                                        </div>
                                        <div className="leftaction-single">
                                          <img
                                            src="imgs/left-paging.svg"
                                            alt=""
                                          />
                                        </div>
                                        <ul className="paging-count">
                                          <li>1</li>
                                          <li>2</li>
                                          <li>3</li>
                                          <li>4</li>
                                        </ul>
                                        <div className="rightaction-single">
                                          <img
                                            src="imgs/right-paging.svg"
                                            alt=""
                                          />
                                        </div>
                                        <div className="rightaction">
                                          <img
                                            src="imgs/right-doublearrow.svg"
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="pagging-area rounds">
                                      <div className="paging-list">
                                        <div className="rounds-para">
                                          <p>Round</p>
                                        </div>
                                        <div className="leftaction disable-pointer">
                                          <img
                                            src="imgs/left-doublearrow.svg"
                                            alt=""
                                          />
                                        </div>
                                        <div className="leftaction-single">
                                          <img
                                            src="imgs/left-paging.svg"
                                            alt=""
                                          />
                                        </div>
                                        <ul className="paging-count">
                                          <li>1</li>
                                          <li>2</li>
                                          <li>3</li>
                                          <li>4</li>
                                        </ul>
                                        <div className="rightaction-single">
                                          <img
                                            src="imgs/right-paging.svg"
                                            alt=""
                                          />
                                        </div>
                                        <div className="rightaction">
                                          <img
                                            src="imgs/right-doublearrow.svg"
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TabPanel>
                          </Tabs>
                        </div>
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
                        <div className="pagination">
                          <div className="pagging-area">
                            <div className="paging-list">
                              <div className="iteration-para">
                                <p>Iteration</p>
                              </div>
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
                          <div className="pagging-area rounds">
                            <div className="paging-list">
                              <div className="rounds-para">
                                <p>Round</p>
                              </div>
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
                              <img src="imgs/last-previous.svg" alt="" />
                              <img src="imgs/previous.svg" alt="" />
                            </div>
                            <div className="iteration">
                              <div className="tooldrop">
                                <select name="" id="">
                                  <option value="5">1</option>
                                  <option value="10">10</option>
                                  <option value="20">20</option>
                                </select>
                              </div>
                              <span>of 20</span>
                            </div>
                            <div className="next">
                              <img src="imgs/next-arrow.svg" alt="" />
                              <img src="imgs/last-arrow.svg" alt="" />
                            </div>
                          </div>
                          <div className="round">
                            <h3>Round</h3>
                            <div className="previous">
                              <img src="imgs/last-previous.svg" alt="" />
                              <img src="imgs/previous.svg" alt="" />
                            </div>
                            <div className="iteration">
                              <div className="tooldrop">
                                <select name="" id="">
                                  <option value="5">3</option>
                                  <option value="10">10</option>
                                  <option value="20">20</option>
                                </select>
                              </div>
                              <span>of 30</span>
                            </div>
                            <div className="next">
                              <img src="imgs/next-arrow.svg" alt="" />
                              <img src="imgs/last-arrow.svg" alt="" />
                            </div>
                          </div>
                          <div className="search-controls">
                            <button className="search">SEARCH</button>
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
                                  <tr>
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
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div className="pagination">
                            <div className="pagging-area">
                              <div className="paging-list">
                                <div className="iteration-para">
                                  <p>Iteration</p>
                                </div>
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
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="pagging-area rounds">
                              <div className="paging-list">
                                <div className="rounds-para">
                                  <p>Round</p>
                                </div>
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
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
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
                              <img src="imgs/last-previous.svg" alt="" />
                              <img src="imgs/previous.svg" alt="" />
                            </div>
                            <div className="iteration">
                              <div className="tooldrop">
                                <select name="" id="">
                                  <option value="5">1</option>
                                  <option value="10">10</option>
                                  <option value="20">20</option>
                                </select>
                              </div>
                              <span>of 20</span>
                            </div>
                            <div className="next">
                              <img src="imgs/next-arrow.svg" alt="" />
                              <img src="imgs/last-arrow.svg" alt="" />
                            </div>
                          </div>
                          <div className="round">
                            <h3>Round</h3>
                            <div className="previous">
                              <img src="imgs/last-previous.svg" alt="" />
                              <img src="imgs/previous.svg" alt="" />
                            </div>
                            <div className="iteration">
                              <div className="tooldrop">
                                <select name="" id="">
                                  <option value="5">3</option>
                                  <option value="10">10</option>
                                  <option value="20">20</option>
                                </select>
                              </div>
                              <span>of 30</span>
                            </div>
                            <div className="next">
                              <img src="imgs/next-arrow.svg" alt="" />
                              <img src="imgs/last-arrow.svg" alt="" />
                            </div>
                          </div>
                          <div className="search-controls">
                            <button className="search">SEARCH</button>
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
                                  <tr>
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
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="pagination">
                            <div className="pagging-area">
                              <div className="paging-list">
                                <div className="iteration-para">
                                  <p>Iteration</p>
                                </div>
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
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="pagging-area rounds">
                              <div className="paging-list">
                                <div className="rounds-para">
                                  <p>Round</p>
                                </div>
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
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
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
                              <div className="simulation-graph">vjh</div>
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
                              <div className="simulation-graph">vjh</div>
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
                              <div className="simulation-graph">vjh</div>
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
