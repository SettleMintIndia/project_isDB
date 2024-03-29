"use client";

import { useState, useEffect, SetStateAction } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import API_Auth from "./api/API_Auth";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Loader from "@/components/layout/Loader";
import AppLayout from "@/components/layout/AppLayout";
import * as React from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function TemplateDetails() {
  const router = useRouter();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [key, setKey] = useState();
  const pdfExportComponent = React.useRef<PDFExport>(null);
  const [mounted, setMounted] = useState(false);
  const [templateData, setTemplateData] = useState<any>([]);
  const [perPage, setPerPage] = useState(2);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [forcePage, setForcePage] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [offset, setOffSet] = useState(0);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [s_type, setSType] = useState("");
  const [finalScenarios, setFinalScenarios] = useState([{ scenario_name: "" }]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState('n')
  const [previousOffset, setPreviousoffset] = useState(0);
  const [previousPage, setPreviousPage] = useState(0);
  const [viewData, setViewData] = useState<any>({
    limit_order_upper_bound: "",
    limit_order_lower_bound: "",
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

  const [tempname, setTempName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    handlegetAllTemplateDetails(tempname,
      s_type,
      fromDate,
      toDate,
      perPage,
      offset);
    getScenarios();
  }, [offset, currentPage, searchKey, s_type, fromDate, toDate, tempname]);

  const getScenarios = async () => {
    const result = await API_Auth.getAllScenarios();
    console.log("scenarios", result);
    setFinalScenarios(result.scenarios);
  };
  const handlegetAllTemplateDetails = async (
    tempname: any,
    s_type: any,
    fromDate: any,
    toDate: any,
    perPage: any,
    offset: any
  ) => {
    setLoading(true);
    let user_id = localStorage.getItem("userid");
    console.log("user_id", user_id);
    console.log("offset", currentPage, offset);

    let body = {
      temp_name: tempname,
      admin_id: user_id,
      scenario: s_type == "all" ? "" : s_type,
      datefrom:
        (fromDate == null || fromDate == "") ? "" : moment(fromDate).format("YYYY-MM-DD HH:mm:ss"),
      dateto: (toDate == null || toDate == "") ? "" : moment(toDate).format("YYYY-MM-DD HH:mm:ss"),
      limit: perPage,
      offset: offset,

      showPrivate: true,
    };

    console.log(body);
    const result = await API_Auth.getAllTemplates(body);
    console.log(result);
    setLoading(false);

    if (result.status == 200) {
      setTemplateData(result.templates);
      setTotalCount(result.count);
      setPageCount(Math.ceil(result.count / perPage));
      console.log("count", Math.ceil(result.count / perPage));
    }
  };

  const handlePageClick = async (e: any) => {
    const selectedPage = e.selected;
    let page = selectedPage * perPage;
    setSearchKey('n');
    setOffSet(page);
    console.log("selectedPage", selectedPage, page);
    let data = e.selected + 1;
    setPageNo(data);
    setCurrentPage(e.selected);
    setForcePage(e.selected)
    setPreviousPage(e.selected);
    setPreviousoffset(page)
    /*  handlegetAllTemplateDetails(
       tempname,
       s_type,
       fromDate,
       toDate,
       perPage,
       page)
       ; */
  };

  const handleInput = async (e: any) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    if (name === "scenarioType") {
      setSearchKey('y');
      const x = (value == "all" || value == "") ? "" : value
      console.log(x)
      setSType(value);

      if (value == "all") {
        setCurrentPage(previousPage);
        setOffSet(previousOffset);
        setTempName("");
        setFromDate(null);
        setToDate(null)
      } else if (value == "") {
        setCurrentPage(previousPage);
        setOffSet(previousOffset);
      } else {

        setCurrentPage(0);
        setOffSet(0)
      }
      /*   handlegetAllTemplateDetails(
          tempname,
          x,
          fromDate,
          toDate,
          perPage,
          offset
        ); */
    }
    if (name == "tempname") {
      setTempName(value);
      if (value == "") {
        setCurrentPage(previousPage);
        setOffSet(previousOffset);
      } else {
        setCurrentPage(0);
        setOffSet(0)
      }

      //handlegetAllTemplateDetails(value, s_type, fromDate, toDate, perPage, offset);

    }
  };

  const handleDeleteClick = (data: any) => {
    setTooltipVisible(!tooltipVisible);
    setKey(data.temp_name);
    setViewData(data);
  };

  const handleDeleteConfirm = async () => {
    let body = {
      template_name: viewData.temp_name,
    };
    const result = await API_Auth.getDeleteTemplate(body);
    console.log(result);
    if (result.status == 200) {
      toast.success("Template Deleted Successfully");
      // setCurrentPage(0);
      setSearchKey('y');
      setOffSet(0);

      setTimeout(() => {
        handlegetAllTemplateDetails("", "", "", "", perPage, offset);
      }, 2000);
    }
    setTooltipVisible(false);
  };

  const handleCancelClick = () => {
    setTooltipVisible(false);
  };

  const viewDetails = (data: any) => {
    console.log(data);
    setShowModal(true);
    setViewData(data);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const handleEditTemplate = (data: any) => {
    console.log(data.temp_name);
    router.push({
      pathname: "/editTemplate",
      query: { temp_name: data.temp_name },
    });
  };

  const handleDownloadPDF = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };
  const handleDownloadExel = () => {
    let finalData: any[] = [];
    Object.keys(viewData).forEach(function (key) {
      var value = viewData[key];
      console.log("key", key);
      var obj;
      if (key == "created_timestamp") {
        obj = { key: key, Value: moment(value).format("MM/DD/YYYY h:mm:ss A") };
      } else {
        obj = { key: key, Value: value };
      }
      finalData.push(obj);
    });
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const fileName = viewData.temp_name;
    const ws = XLSX.utils.json_to_sheet(finalData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };


  const handleButtonClick = async (data: any, key: any) => {
    console.log(data);
    console.log("key", key);
    let body = {
      template_name: data.temp_name,
      makePublic: data.is_public == 1 ? false : true,
    };
    console.log(body);
    setLoading(true);
    const result = await API_Auth.getChangeVisiblityTemplate(body);
    console.log("visibilityresult", result);
    setLoading(false);
    if (result.status == 400) {
      toast.error(result.error);
    } else {
      toast.success(result.message);
      handlegetAllTemplateDetails("", "", "", "", perPage, offset);
    }
  };

  const handleFirstRecord = () => {
    // handlegetAllTemplateDetails("", "", "", "", perPage, 0);
    setCurrentPage(0);
    setOffSet(0);

  };
  const handlelastRecord = () => {
    let page = (pageCount - 1) * perPage;
    console.log("page", page);
    // handlegetAllTemplateDetails("", "", "", "", perPage, page);
    setCurrentPage(pageCount - 1);
    setOffSet(page)
  };
  const handleDates = (date: any, key: any) => {
    console.log(date, key)
    if (key == "startdate") {
      setFromDate(date);
      setOffSet(0);
      setCurrentPage(0)
      // handlegetAllTemplateDetails(tempname, s_type, date, toDate, perPage, offset);
    } else {
      console.log("enddate")
      setToDate(date);
      setOffSet(0);
      setCurrentPage(0);
      // handlegetAllTemplateDetails(tempname, s_type, fromDate, date, perPage, pageNo);
    }
  }
  const handleClear = (key: any) => {
    if (key == "startdate") {
      setFromDate(null);
      setOffSet(previousOffset)
      setCurrentPage(previousPage)      //handlegetAllTemplateDetails(tempname, s_type, "", toDate, perPage, 1);
    } else {
      console.log("enddate")
      setToDate(null)
      setOffSet(previousOffset)
      setCurrentPage(previousPage)
      // handlegetAllTemplateDetails(tempname, s_type, fromDate, "", perPage, 1);
    }
  }

  if (mounted)
    return (
      <AppLayout>
        <div className="container-fluid">
          <div className="template details">
            <div className="template-header">
              <div className="back-option"></div>
              <div className="main-header">
                <h1> Template Details </h1>
                <p>({totalCount})</p>
              </div>
              <div className="head">
                <button>
                  <Link href="createtemplate">
                    <img src="/imgs/plus.svg" alt="" /> Create Template
                  </Link>
                </button>
              </div>
            </div>
            <div className="template-type">
              <div className="tabs">
                <Tabs
                  selectedIndex={tabIndex}
                  onSelect={(tabIndex: SetStateAction<number>) =>
                    setTabIndex(tabIndex)
                  }
                >
                  <TabPanel>
                    <div className="filterArea">
                      <div className="filterLeft">
                        <div className="tabs">
                          {" "}
                          <Tabs>
                            <TabList>
                              <div className="filter">
                                <label htmlFor="filterBy">Filter by:</label>
                                <div className="searchScenario">
                                  <div className="searchScenarioArea options">
                                    <select
                                      name="scenarioType"
                                      id="type"
                                      value={s_type}
                                      onChange={handleInput}
                                    >
                                      <option value="">
                                        Select Scenario Type
                                      </option>
                                      <option value="all">
                                        All
                                      </option>
                                      {finalScenarios.map((item) => {
                                        return (
                                          <option
                                            key={item?.scenario_name}
                                            value={item?.scenario_name}
                                          >
                                            {item?.scenario_name}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </TabList>{" "}
                          </Tabs>
                        </div>
                      </div>
                      <div className="searchArea">
                        <div className="searchFilter options">
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
                        <div className="dateFilter">

                          <div className="date-picker-container">
                            <span className="icon-container">
                              <img src="imgs/calendar.svg" alt="Calendar Icon" className="calendar-icon" />
                            </span>
                            <DatePicker
                              selected={fromDate}
                              onChange={(date: any) => handleDates(date, "startdate")}
                              dateFormat="dd/MM/yyyy"
                              placeholderText="Start Date"
                              className="custom-datepicker"
                            />
                            {fromDate && (
                              <span className="icon-container" onClick={() => handleClear("startdate")}>
                                <img src="imgs/close.svg" alt="Close Icon" className="close-icon" />
                              </span>
                            )}
                          </div>


                          <div className="date-picker-container">
                            <span className="icon-container">
                              <img src="imgs/calendar.svg" alt="Calendar Icon" className="calendar-icon" />
                            </span>
                            <DatePicker
                              selected={toDate}
                              onChange={(date: any) => handleDates(date, "enddate")}
                              dateFormat="dd/MM/yyyy"
                              placeholderText="End Date"
                              className="custom-datepicker"
                            />
                            {toDate && (
                              <span className="icon-container" onClick={() => handleClear("enddate")}>
                                <img src="imgs/close.svg" alt="Close Icon" className="close-icon" />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {loading == true && <Loader />}
                    <div className="table-responsive">
                      <div className="template-content">
                        <table className="table" style={{ borderSpacing: 0 }}>
                          <thead>
                            <tr>
                              <th>Scenario Type</th>
                              <th>Template Name</th>
                              <th>Visibility</th>
                              <th>Created On</th>
                              <th>Comments</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          {templateData.length == 0 && (
                            <tbody>
                              <tr>
                                <td colSpan={12}>
                                  <p className="no_Data_table">No Data Found</p>
                                </td>
                              </tr>
                            </tbody>
                          )}
                          <tbody>
                            {templateData.map((data: any) => (
                              <tr key={data.temp_name}>
                                <td>{data.scenario_name}</td>
                                <td>{data.temp_name}</td>
                                <td id="privacy">
                                  <div className="btn-group privacy">
                                    <button
                                      className={
                                        data.is_public === 1
                                          ? "btn active"
                                          : "btn"
                                      }
                                      onClick={() =>
                                        handleButtonClick(data, "public")
                                      }
                                    >
                                      Public
                                    </button>
                                    <button
                                      className={
                                        data.is_public === 0
                                          ? "btn active"
                                          : "btn"
                                      }
                                      onClick={() =>
                                        handleButtonClick(data, "private")
                                      }
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
                                <td>{data.comments}</td>
                                <td
                                  className="actions
                                         "
                                >
                                  <button
                                    className="edit-icon"
                                    onClick={() => handleEditTemplate(data)}
                                  >
                                    <img
                                      src="imgs/pencil.svg"
                                      alt=""
                                      title="edit"
                                    />
                                  </button>
                                  <button
                                    className="delete-icon"
                                    onClick={() => handleDeleteClick(data)}
                                  >
                                    <img
                                      src="imgs/recycle-bin.svg"
                                      alt=""
                                      title="Delete"
                                    />
                                    {tooltipVisible &&
                                      key == data.temp_name && (
                                        <div className="delete-tooltip">
                                          <span className="tooltip">
                                            <div className="tool-info">
                                              <p>
                                                Are you sure you want to delete
                                                this template?
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
                                        </div>
                                      )}
                                  </button>

                                  <button
                                    className="details-button"
                                    onClick={() => viewDetails(data)}
                                  >
                                    View Details
                                  </button>
                                </td>
                              </tr>
                            ))}
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
                      <p>Download Template Details :</p>
                      <div className="file-type">
                        <Button onClick={() => handleDownloadPDF()}>
                          <img src="imgs/download-white.svg" alt="" />
                          PDF
                        </Button>
                        <Button onClick={() => handleDownloadExel()}>
                          <img src="imgs/download-white.svg" alt="" />
                          EXCEL
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bottom-head">
                    <div className="title">{viewData.temp_name}</div>
                    <div className="date">
                      <label htmlFor="create">Created on:</label>
                      <span>
                        {moment(viewData.created_timestamp).format(
                          "MM/DD/YYYY h:mm:ss A"
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="details-section">
                    <div className="template-details">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Scenario Type</th>
                            <th className="scenario-name">
                              {viewData.scenario_name}
                            </th>
                          </tr>
                        </thead>
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
                      <table className="table">
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
                        </tbody>
                      </table>
                      {viewData.distribution == "normal" && (
                        <table className="table">
                          <tbody>
                            <tr>
                              <td>Standard Deviation Price Buy</td>
                              <td>{viewData.std_dev_price_buy}</td>
                            </tr>
                            <tr>
                              <td>Standard Deviation Price Sell</td>
                              <td>{viewData.std_dev_price_sell}</td>
                            </tr>
                            <tr>
                              <td>Standard Deviation Quantity</td>
                              <td>{viewData.std_dev_quant}</td>
                            </tr>
                            <tr>
                              <td>Mean Price Buy</td>
                              <td>{viewData.mean_price_buy}</td>
                            </tr>
                            <tr>
                              <td>Mean Price Sell</td>
                              <td>{viewData.mean_price_sell}</td>
                            </tr>
                            <tr>
                              <td>Mean Price Quantity</td>
                              <td>{viewData.mean_quant}</td>
                            </tr>
                          </tbody>
                        </table>
                      )}

                      <table className="table">
                        <tbody>
                          <tr>
                            <td>Distribution</td>
                            <td>{viewData.distribution}</td>
                          </tr>
                        </tbody>
                      </table>
                      <table className="independant-table">
                        <tr>
                          <td>Visibility</td>
                          {viewData.is_public == 1 && <td>Public</td>}
                          {viewData.is_public == 0 && <td>Private</td>}{" "}
                        </tr>
                      </table>
                    </div>
                    <div className="modal-comment">
                      <label htmlFor="comment">Comment</label>
                      <p>{viewData.comments}</p>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
            {templateData.length != 0 && (
              <div className="pagging-area mt-2">
                <div className="toolbar">
                </div>
                <div className="paging-list">
                  <p className="pagination_total">Showing {offset + 1} to {totalCount < offset + perPage &&
                    <span>{totalCount}</span>}
                    {totalCount > offset + perPage &&
                      <span>{offset + perPage}</span>} of {totalCount} items</p>
                  {currentPage == 0 && (
                    <div className="leftaction disable-pointer">
                      <img src="imgs/left-doublearrowg.svg" alt="" />
                    </div>
                  )}
                  {currentPage != 0 && (
                    <div
                      className="leftaction disable-pointer"
                      onClick={() => handleFirstRecord()}
                    >
                      <img src="imgs/left-doublearrow.svg" alt="" />
                    </div>
                  )}

                  <ReactPaginate
                    previousLabel={
                      currentPage == 0 ? (
                        <img src="imgs/leftpaginggray.svg" />
                      ) : (
                        <img src="imgs/left-paging.svg" alt="" />
                      )
                    }
                    nextLabel={
                      currentPage == pageCount - 1 ? (
                        <img src="imgs/right-paging-gray.svg" />
                      ) : (
                        <img src="imgs/right-paging.svg" alt="" />
                      )
                    }
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
                  {currentPage != pageCount - 1 && (
                    <div
                      className="rightaction"
                      onClick={() => handlelastRecord()}
                    >
                      <img src="imgs/right-doublearrow.svg" alt="" />
                    </div>
                  )}
                  {currentPage == pageCount - 1 && (
                    <div className="rightaction">
                      <img src="imgs/right-doublearrowg.svg" alt="" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <ToastContainer />
        </div>
        <div>
          <div style={{ position: "absolute", left: "-2000px", top: 0 }}>
            <PDFExport
              paperSize="A3"
              margin="1cm"
              landscape
              fileName={viewData.temp_name + ".pdf"}
              ref={pdfExportComponent}
            >
              <div>
                <div className="container-fluid pdf mt-2">
                  <div className="header">
                    <div className="left-head">
                      <img
                        src="/imgs/isdb-logo-signin.svg"
                        className="isDB-logo"
                        alt=""
                      />
                    </div>
                    <div className="right-head">
                      <div className="pdf-title">{viewData.temp_name}</div>
                      <div className="pdf info">
                        <div className="pdf-time">
                          <label htmlFor="">Template Created On </label>
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
                            <table className="table">
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
                            <table className="table">
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
                            <div className="right-section">
                              <table className="independant-table">
                                <tr>
                                  <td>Visibility</td>
                                  {viewData.is_public == 1 && <td>Public</td>}
                                  {viewData.is_public == 0 && (
                                    <td>Private</td>
                                  )}{" "}
                                </tr>
                              </table>
                              <div className="modal-comment">
                                <label htmlFor="comment">Comment</label>
                                <p>{viewData.comments}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PDFExport>
          </div>
        </div>
      </AppLayout>
    );
}
