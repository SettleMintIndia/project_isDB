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
  const [key, setKey] = useState();
  const [templateData, setTemplateData] = useState(data);
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
    router.push("/templateDetails");
  };
  const [showModal, setShowModal] = useState(false);
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
      <div className="template details">
        <div className="head">
          <h1>Simulation History</h1>
        </div>
        <div className="template-type">
          <div className="tabs">
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
                  <input type="text" placeholder="Search by template name" />
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

            <div className=" table-responsive">
              <div className="template-content">
                <table className="table" style={{ borderSpacing: 0 }}>
                  <thead>
                    <tr>
                      <th>Compare</th>
                      <th>Scenario Type</th>
                      <th>Template Name</th>
                      <th>Simulation Time</th>
                      <th>Simulation Type</th>
                      <th>Execution Details</th>
                      <th>
                        <img src=" imgs/download-white.svg" alt="" /> Download
                        Report
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {templateData.map((data) => (
                      <tr key={data.id}>
                        <td>
                          {" "}
                          <input type="checkbox" className="checkbox" />
                        </td>
                        <td>{data.scenario_type}</td>
                        <td>{data.template_name}</td>
                        <td>2024-01-05 15:31:40</td>
                        <td>Static</td>
                        <td
                          className="actions execution
                  "
                        >
                          <Link href="simulation_history_info">
                            <button className="details-button">
                              View Details
                            </button>
                          </Link>
                        </td>
                        <td id="file">
                          <Link href="#">PDF</Link>
                          <Link href="templatedetails_excel">EXCEL</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
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
