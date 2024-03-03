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
import ReactPaginate from "react-paginate";
import Loader from "@/components/layout/Loader";
import "react-toastify/dist/ReactToastify.css";
import AppLayout from "@/components/layout/AppLayout";

export default function Home() {
  const router = useRouter();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [key, setKey] = useState();
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [dataRecords, setDataRecords] = useState([])

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
  const [perPage, setPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [offset, setOffSet] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [viewData, setViewData] = useState({});


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
    setLoading(true)
    const result = await API_Auth.getSimulationHistory(body);
    console.log(result);
    setLoading(false)
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
      getSimulations(
        tempname,
        creatorName,
        s_type,
        fromDate,
        toDate,
        perPage,
        1)
    }
  };
  const handleInput = async (e: any) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    if (name === "scenarioType") {
      setSType(value);
      setCurrentPage(0)
      getSimulations(
        tempname,
        creatorName,
        value,
        fromDate,
        toDate,
        perPage,
        1)
    }
    if (name == "tempname") {
      setTempName(value);
      setCurrentPage(0)


      getSimulations(
        value,
        creatorName,
        s_type,
        fromDate,
        toDate,
        perPage,
        1)
      //handlegetAllTemplateDetails();
    }
    if (name == "fromDate") {
      setFromDate(value);
      setCurrentPage(0)

      getSimulations(
        tempname,
        creatorName,
        s_type,
        value,
        toDate,
        perPage,
        1)
    }
    if (name == "toDate") {
      setToDate(value);
      setCurrentPage(0)

      getSimulations(
        tempname,
        creatorName,
        s_type,
        fromDate,
        value,
        perPage,
        1)
    }

    if (name == "perPage") {
      setPerPage(Number(value));
      setPageNo(1);
      setCurrentPage(0)


      getSimulations(
        tempname,
        creatorName,
        s_type,
        fromDate,
        toDate,
        value,
        1)
    }
  };

  const handlePageClick = async (e: any) => {
    const selectedPage = e.selected;
    let page = selectedPage * perPage;
    setOffSet(page);
    console.log("selectedPage", selectedPage);
    //let pageData = selectedPage == 0 ? 1 : selectedPage + 1;
    //setPageNo(pageData);
    let data = e.selected + 1;
    console.log("asdakl", data, page)
    setPageNo(data);
    setCurrentPage(e.selected);


    getSimulations(
      tempname,
      creatorName,
      s_type,
      fromDate,
      toDate,
      perPage,
      data)
  };

  const handleCheckboxChange = async (id: any) => {
    console.log(id)
    // Check if the record is already in the array
    const index = selectedRecords.indexOf(id);
    console.log(selectedRecords)

    const filteredArray = templateData.filter((item) => item.exe_id === id);
    console.log("filteredArray", filteredArray, dataRecords)

    if (dataRecords.length < 3) {


      // If the record is checked, add it to the array
      if (index === -1) {
        setSelectedRecords([...selectedRecords, id]);
        setDataRecords([...dataRecords, filteredArray[0]])
      } else {
        // If the record is unchecked, remove it from the array
        const updatedRecords = [...selectedRecords];
        const updateDataRecords = [...dataRecords]
        updatedRecords.splice(index, 1);
        //updateDataRecords.splice(index, 1);
        const updatedData = updateDataRecords.filter((item) => item.exe_id === id);

        setDataRecords([...updatedData])
        setSelectedRecords(updatedRecords);
      }
    } else {
      toast.error("Template Records should not more than 3")
    }
  };
  const handleClear = () => {
    setDataRecords([])
    setSelectedRecords([])
  }

  const handleCompareClick = () => {
    if (dataRecords.length != 3) {
      toast.error("Template Records length should be 3")

    } else {
      //router.push("/templatedetails_excel")

      router.push({
        pathname: "/templatedetails_excel",
        query: {
          temp_name1: dataRecords[0]?.temp_name,
          temp_name2: dataRecords[1]?.temp_name,
          temp_name3: dataRecords[2]?.temp_name
        },
      });
    }
  }
  const handleClose = (id: any) => {
    console.log("Exid", id);
    const updatedRecords = [...selectedRecords];
    const index = selectedRecords.indexOf(id);

    const updateDataRecords = [...dataRecords]
    updatedRecords.splice(index, 1);
    //updateDataRecords.splice(index, 1);
    const updatedData = updateDataRecords.filter((item) => item.exe_id != id);
    console.log("updatedData", updatedData, updateDataRecords)

    setDataRecords([...updatedData])
    setSelectedRecords(updatedRecords);

  }

  const handleFirstRecord = () => {
    setCurrentPage(0)
    getSimulations(
      tempname,
      creatorName,
      s_type,
      fromDate,
      toDate,
      perPage,
      1)


  }
  const handlelastRecord = () => {
    getSimulations(
      tempname,
      creatorName,
      s_type,
      fromDate,
      toDate,
      perPage,
      pageCount)   
       setCurrentPage(pageCount - 1)


  }
  return (
    <AppLayout>
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
          {dataRecords.map((item: any) => (
            <button className="templatename">
              {item.temp_name} <img src="imgs/close-black.svg" alt="" onClick={() => handleClose(item.exe_id)} />
            </button>
          ))}

          {/*  <button className="templatename">
            Template1 <img src="imgs/close-black.svg" alt="" />
          </button> */}

          <button className="compare-button">
            <a onClick={() => handleCompareClick()}>Compare Templates</a>
          </button>
          <button className="clear" onClick={() => handleClear()}>Clear All</button>
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
                {/*   <div className="calendar">
                  <img src="imgs/calendar.svg" alt="" />
                  <select name="" id="calendar">
                    <option value="">From-to</option>
                  </select>
                </div> */}
                <div className="dateFilter">
                  <input
                    type="date"
                    name="fromDate"
                    value={fromDate}
                    onChange={handleInput}
                    placeholder="Start Date"
                  />

                  <input
                    type="date"
                    name="toDate"
                    value={toDate}
                    onChange={handleInput}
                    placeholder="End Date"
                  />
                </div>
              </div>
            </div>

            {loading == true && <Loader />}
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
                  {templateData.length == 0 && <tbody>
                    <tr >
                      <td colSpan={12}>
                        <p className="no_Data_table">No Data Found</p>
                      </td>
                    </tr>
                  </tbody>
                  }
                  <tbody>
                    {templateData.map((data) => (
                      <tr key={data.exe_id}>
                        <td id="checkbox">
                          {" "}
                          <input type="checkbox" className="checkbox"
                            checked={selectedRecords.includes(data.exe_id)}
                            onChange={() => handleCheckboxChange(data.exe_id)} />
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
            <span>of {totalCount}</span>
          </div>
          <div className="paging-list">
            {currentPage == 0 && <div className="leftaction disable-pointer" >
              <img src="imgs/left-doublearrowg.svg" alt="" />
            </div>}
            {currentPage != 0 && <div className="leftaction disable-pointer" onClick={() => handleFirstRecord()}>
              <img src="imgs/left-doublearrow.svg" alt="" />
            </div>}
            {/*   <div className="leftaction-single">
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
            </div> */}
            <ReactPaginate
              previousLabel={currentPage == 0 ? <img src="imgs/leftpaginggray.svg" /> : <img src="imgs/left-paging.svg" alt="" />}
              nextLabel={currentPage == pageCount - 1 ? <img src="imgs/right-paging-gray.svg" /> : <img src="imgs/right-paging.svg" alt="" />}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
              forcePage={currentPage}
              disabledClassName="disabled"
              disableInitialCallback
            />
             {currentPage != pageCount - 1 && <div className="rightaction" onClick={() => handlelastRecord()}>
              <img src="imgs/right-doublearrow.svg" alt="" />
            </div>
            }
             {currentPage == pageCount - 1 && <div className="rightaction" >
              <img src="imgs/right-doublearrowg.svg" alt="" />
            </div>
            }
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    </AppLayout>
  );
}
