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
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [key, setKey] = useState();
  const [templateData, setTemplateData] = useState([
    {
      scenario_name: "",
      temp_name: "",
      created_timestamp: "",
      exe_id: "",
      is_public: 0,
    },
  ]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [s_type, setSType] = useState("");

  const [tempname, setTempName] = useState("");
  const [loading, setLoading] = useState(false);
  const [creatorName, setCreatorName] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [offset, setOffSet] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [viewData, setViewData] = useState({});

  const handlegetAllTemplateDetails = async () => {
    let body = {
      temp_name: tempname,
      admin_id: "1",
      scenario: s_type,
      datefrom:
        fromDate == "" ? "" : moment(fromDate).format("YYYY-MM-DD HH:mm:ss"),
      dateto: toDate == "" ? "" : moment(toDate).format("YYYY-MM-DD HH:mm:ss"),
      resultPerPage: perPage,
      pgNo: pageNo,
      showPrivate: true,
    };
    console.log(body);

    const result = await API_Auth.getAllTemplates(body);
    console.log(result);
    if (result.status == 200) {
      setTemplateData(result.templates);
      setTotalCount(result.count);
      setPageCount(Math.ceil(result.count / perPage));
    }
  };
  useEffect(() => {
    getSimulations(
      tempname,
      creatorName,
      s_type,
      fromDate,
      toDate,
      perPage,
      pageNo
    );
  }, []);
  const getSimulations = async (
    tempname: any,
    creatorName: any,
    s_type: any,
    fromDate: any,
    toDate: any,
    perPage: any,
    pageNo: any
  ) => {
    let body = {
      temp_name: tempname,
      creator: creatorName,
      scenario: s_type,
      datefrom: fromDate,
      dateto: toDate,
      resultPerPage: perPage,
      pgNo: pageNo,
    };
    const result = await API_Auth.getSimulationHistory(body);
    console.log(result);
    if (result.status == 200) {
      setTemplateData(result.simulations);
      setTotalCount(result.count);
      setPageCount(Math.ceil(result.count / perPage));
    }
  };
  const viewDetails = (data: any) => {
    console.log(data);
    setViewData(data);

    router.push({
      pathname: "/simulation_history_info",
      query: { temp_name: data.temp_name, exe_id: data.exe_id },
    });
  };
  const handleButtonClick = async (data: any) => {
    console.log(data);
    let body = {
      template_name: data.temp_name,
      make_public: data.is_public == 1 ? false : true,
    };
    const result = await API_Auth.getChangeVisiblityTemplate(body);
    console.log("visibilityresult", result);
    if (result.status == 400) {
      toast.error(result.error);
    } else {
      toast.success(result.message);
      handlegetAllTemplateDetails();
    }
  };
  const handleInput = async (e: any) => {};
  return (
    <div className="container-fluid">
      <div className="template details">
        <div className="template-header">
          <div className="back-option"></div>
          <div className="main-header">
            <h1>Simulation History</h1>

            {/* <p>({totalCount} )</p> */}
          </div>
          <div className="head"></div>
        </div>

        <div className="compare-banner">
          <label htmlFor="">Compare Templates :</label>
          <button className="templatename">
            Template1 <img src="imgs/close-black.svg" alt="" />
          </button>
          <button className="templatename">
            Template2 <img src="imgs/close-black.svg" alt="" />
          </button>
          <button className="compare-button">
            <a href="templatedetails_excel">Compare Templates</a>
          </button>
          <button className="clear">Clear All</button>
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
                  {/* <select name="filter" id="searchtype">
                        <option value="template">Template</option>
                        <option value="creator">Creator</option>
                      </select> */}
                  <input
                    type="text"
                    placeholder="Search by template name"
                    onChange={handleInput}
                    value={tempname}
                    name="tempname"
                  />
                  <div className="search-icon">
                    <img src="imgs/search-icon.svg" alt="" />
                  </div>
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
                      <th>Compare Templates</th>
                      <th>Scenario Type</th>
                      <th>Template Name</th>
                      <th>Visibility</th>
                      <th>Simulation Date</th>
                      <th>Execution Details</th>
                      <th>
                        <img src=" imgs/download-white.svg" alt="" /> Download
                        Report
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {templateData.map((data) => (
                      <tr key={data.exe_id}>
                        <td id="checkbox">
                          {" "}
                          <input type="checkbox" className="checkbox" />
                        </td>
                        <td>{data.scenario_name}</td>
                        <td>{data.temp_name}</td>
                        <td id="privacy">
                          <div className="btn-group privacy">
                            <button
                              className={
                                data.is_public === 1 ? "btn active" : "btn"
                              }
                              onClick={() => handleButtonClick(data)}
                            >
                              Public
                            </button>
                            <button
                              className={
                                data.is_public === 0 ? "btn active" : "btn"
                              }
                              onClick={() => handleButtonClick(data)}
                            >
                              Private
                            </button>
                          </div>
                        </td>
                        <td>
                          {moment(data.created_timestamp).format(
                            "MM/DD/YYYY h:mm:ss A"
                          )}
                        </td>

                        <td
                          className="actions execution
                  "
                        >
                          <a>
                            <button
                              className="details-button"
                              onClick={() => viewDetails(data)}
                            >
                              View Details
                            </button>
                          </a>
                        </td>
                        <td id="file">
                          <Link href="pdf">PDF</Link>
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
        <div className="pagging-area mt-2">
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
