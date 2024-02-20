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

const data = [
  {
    id: 0,
    scenario_type: "Crash",
    template_name: "Template1",
    created_on: "Tue, 9 Jan 2024",
    template_description:
      "   Lorem ipsum dolor sit amet, consectetuer adipiscingelit. Aenean commodo ligula eget dolor.",
  },
  {
    id: 1,
    scenario_type: "Bubble",
    template_name: "Template1",
    created_on: "Tue, 9 Jan 2024",
    template_description:
      "   Lorem ipsum dolor sit amet, consectetuer adipiscingelit. Aenean commodo ligula eget dolor.",
  },
];
export default function Home() {
  const router = useRouter();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const handleDeleteClick = (id: any) => {
    setTooltipVisible(!tooltipVisible);
    setKey(id);
  };

  const handleDeleteConfirm = () => {
    setTooltipVisible(false);
  };

  const handleCancelClick = () => {
    setTooltipVisible(false);
  };
  const handleEdit = () => {
    router.push("/runSimulation");
  };
  const [showModal, setShowModal] = useState(false);
  const [key, setKey] = useState();

  const [templateData, setTemplateData] = useState(data);
  const viewDetails = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <div className="container-fluid">
      <div className="template run-simulation">
        <div className="head">
          <h1>Run Simulation</h1>
        </div>
        <div className="template-type">
          <div className="tabs">
            <Tabs
              selectedIndex={tabIndex}
              onSelect={(tabIndex: SetStateAction<number>) =>
                setTabIndex(tabIndex)
              }
            >
              <TabList>
                <Tab>My Template</Tab>
                <Tab>Global Templates</Tab>
              </TabList>
              <TabPanel>
                <div className="filter">
                  <label htmlFor="filterBy">Filter by:</label>
                  <span>Scenario Type</span>
                </div>

                <div className="filterArea">
                  <div className="filterLeft">
                    <div className="tabs">
                      {" "}
                      <Tabs>
                        <TabList>
                          <Tab>All</Tab>
                          <Tab>Crash</Tab>
                          <Tab>Bubble</Tab>
                        </TabList>{" "}
                      </Tabs>
                    </div>
                  </div>
                  <div className="searchArea">
                    <div className="searchFilter">
                      <img src="imgs/search-icon.svg" alt="" />
                      <input
                        type="text"
                        placeholder="Search by template name"
                      />
                    </div>
                    <div className="calendar">
                      <img src="imgs/calendar.svg" alt="" />
                      <select name="" id="calendar">
                        <option value="">From-to</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="template-content">
                  <div className=" table-responsive">
                    <table className="table" style={{ borderSpacing: 0 }}>
                      <thead>
                        <tr>
                          <th>Scenario Type</th>
                          <th>Template Name</th>
                          <th>Created On</th>
                          <th>Comments</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {templateData.map((data) => (
                          <tr key={data.id}>
                            <td>{data.scenario_type}</td>
                            <td>{data.template_name}</td>
                            <td>{data.created_on}</td>
                            <td>{data.template_description}</td>
                            <td
                              className="actions
                  "
                            >
                              <button className="edit-icon">
                                <Link href="editTemplate">
                                  <img
                                    src="imgs/pencil.svg"
                                    alt=""
                                    title="Edit"
                                  />
                                </Link>
                              </button>
                              <button
                                className="delete-icon"
                                onClick={() => handleDeleteClick(data.id)}
                              >
                                <img
                                  src="imgs/recycle-bin.svg"
                                  alt=""
                                  title="Delete"
                                />
                                {tooltipVisible && key == data.id && (
                                  <span className="tooltip">
                                    <div className="tool-info">
                                      <p>
                                        Are you sure you want to delete this
                                        template?
                                      </p>
                                      <div className="tool-buttons">
                                        <button
                                          className="delete-button"
                                          onClick={handleDeleteConfirm}
                                          type="button"
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

                              <button
                                className="details-button"
                                onClick={() => viewDetails()}
                              >
                                View Details
                              </button>
                              <button className="btn btn-dark simulation-btn">
                                <Link href="runSimulation_infoPage">
                                  Run Simulation
                                </Link>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="filter">
                  <label htmlFor="filterBy">Filter by:</label>
                  <span>Scenario Type</span>
                </div>

                <div className="filterArea">
                  <div className="filterLeft">
                    <div className="tabs">
                      {" "}
                      <Tabs>
                        <TabList>
                          <Tab>All</Tab>
                          <Tab>Crash</Tab>
                          <Tab>Bubble</Tab>
                        </TabList>{" "}
                      </Tabs>
                    </div>
                  </div>
                  <div className="searchArea">
                    <div className="searchFilter options">
                      <select name="filter" id="searchtype">
                        <option value="template">Template</option>
                        <option value="creator">Creator</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Search by template name"
                      />
                      <img src="imgs/search-icon.svg" alt="" />
                    </div>
                    <div className="calendar">
                      <img src="imgs/calendar.svg" alt="" />
                      <select name="" id="calendar">
                        <option value="">From-to</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="template-content">
                  <div className=" table-responsive">
                    <table className="table" style={{ borderSpacing: 0 }}>
                      <thead>
                        <tr>
                          <th>Scenario Type</th>
                          <th>Template Name</th>
                          <th>Creator</th>

                          <th>Created On</th>
                          <th>Comments</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Crash</td>
                          <td>Template1</td>
                          <td>Name1</td>

                          <td>Tue, 9 Jan 2024</td>
                          <td>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing
                            elit. Aenean commodo ligula eget dolor.
                          </td>
                          <td
                            className="actions
                  "
                          >
                            <button className="edit-icon">
                              <Link href="editTemplate">
                                <img
                                  src="imgs/pencil.svg"
                                  alt=""
                                  title="edit"
                                />
                              </Link>
                            </button>

                            <button
                              className="details-button"
                              onClick={() => viewDetails()}
                            >
                              View Details
                            </button>
                            <Modal
                              show={showModal}
                              onHide={handleCloseModal}
                              className="template-modal"
                            >
                              <Modal.Header className="custom-header">
                                <img
                                  src="imgs/close-white.svg"
                                  alt=""
                                  onClick={handleClose}
                                />
                              </Modal.Header>
                              <Modal.Body>
                                {" "}
                                <div className="modal-details">
                                  <div className="head">
                                    <div className="left-head">
                                      Template Details
                                    </div>
                                    <div className="right-head">
                                      <img src="imgs/file.svg" alt="" />
                                      <Link href="#">
                                        Download Excel Template
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="bottom-head">
                                    <div className="title">Template1</div>
                                    <div className="date">
                                      <label htmlFor="create">Created on</label>
                                      <span>Mon, 1 Jan 2024</span>
                                    </div>
                                  </div>
                                  <div className="details-section">
                                    <div className="template-details">
                                      <table className="table">
                                        <thead>
                                          <tr>
                                            <th>Scenario Type</th>
                                            <th>Crash</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>Initial Market Price</td>
                                            <td>100</td>
                                          </tr>
                                          <tr>
                                            <td>Price Variance Limit</td>
                                            <td>0.6</td>
                                          </tr>
                                          <tr>
                                            <td>Base Quantity</td>
                                            <td>2500</td>
                                          </tr>
                                          <tr>
                                            <td>Quantity Variance Limit</td>
                                            <td>0.6</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <table className="table">
                                        <tbody>
                                          <tr>
                                            <td>Alpha 0</td>
                                            <td>0.05</td>
                                          </tr>
                                          <tr>
                                            <td>Alpha 1</td>
                                            <td>0.3</td>
                                          </tr>
                                          <tr>
                                            <td>Theta 0</td>
                                            <td>0.75</td>
                                          </tr>
                                          <tr>
                                            <td>Theta 1</td>
                                            <td>0.8</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <table className="table">
                                        <tbody>
                                          <tr>
                                            <td>Distribution</td>
                                            <td>Uniform</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <div className="modal-comment">
                                      <label htmlFor="comment">Comment</label>
                                      <p>
                                        Lorem ipsum dolor sit amet, consectetuer
                                        adipiscing elit. Aenean commodo ligula
                                        eget dolor.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </Modal.Body>
                            </Modal>
                            <button className="btn btn-dark simulation-btn">
                              <Link href="runSimulation_infoPage">
                                Run Simulation
                              </Link>
                            </button>
                          </td>
                        </tr>

                        <tr>
                          <td>Crash</td>
                          <td>Template1</td>
                          <td>Name1</td>

                          <td>Tue, 9 Jan 2024</td>
                          <td>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing
                            elit. Aenean commodo ligula eget dolor.
                          </td>
                          <td
                            className="actions
                  "
                          >
                            <button className="edit-icon">
                              <Link href="editTemplate">
                                <img
                                  src="imgs/pencil.svg"
                                  alt=""
                                  title="Edit"
                                />
                              </Link>
                            </button>

                            <button
                              className="details-button"
                              onClick={() => viewDetails()}
                            >
                              View Details
                            </button>
                            <button className="btn btn-dark simulation-btn">
                              <Link href="runSimulation_infoPage">
                                Run Simulation
                              </Link>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>

        <Modal
          show={showModal}
          onHide={handleCloseModal}
          className="template-modal"
        >
          <Modal.Header className="custom-header">
            <img src="imgs/close-white.svg" alt="" onClick={handleClose} />
          </Modal.Header>
          <Modal.Body>
            {" "}
            <div className="modal-details">
              <div className="head">
                <div className="left-head">Template Details</div>
                <div className="right-head">
                  <img src="imgs/file.svg" alt="" />
                  <Link href="#">Download Excel Template</Link>
                </div>
              </div>
              <div className="bottom-head">
                <div className="title">Template1</div>
                <div className="date">
                  <label htmlFor="create">Created on</label>
                  <span>Mon, 1 Jan 2024</span>
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
                            <th>Crash</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Initial Market Price</td>
                            <td>100</td>
                          </tr>
                          <tr>
                            <td>Price Variance Limit</td>
                            <td>0.6</td>
                          </tr>
                          <tr>
                            <td>Base Quantity</td>
                            <td>2500</td>
                          </tr>
                          <tr>
                            <td>Quantity Variance Limit</td>
                            <td>0.6</td>
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
                    </div>
                  </div>
                  <div className="table-responsive">
                    <div className="template-content">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td>Alpha 0</td>
                            <td>0.05</td>
                          </tr>
                          <tr>
                            <td>Alpha 1</td>
                            <td>0.3</td>
                          </tr>
                          <tr>
                            <td>Theta 0</td>
                            <td>0.75</td>
                          </tr>
                          <tr>
                            <td>Theta 1</td>
                            <td>0.8</td>
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
                            <td>Distribution</td>
                            <td>Uniform</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="modal-comment">
                  <label htmlFor="comment">Comment</label>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor.
                  </p>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

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
