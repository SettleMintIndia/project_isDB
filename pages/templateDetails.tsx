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
import API_Auth from './api/API_Auth'
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


export default function Home() {
  const router = useRouter();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [key, setKey] = useState();
  const [templateData, setTemplateData] = useState([{ scenario_name: '', temp_name: '', created_timestamp: '', comments: '' }])
  const [perPage, setPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [offset, setOffSet] = useState(0);

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [s_type, setSType] = useState('');
  const [finalScenarios, setFinalScenarios] = useState([{ scenario_name: '' }]);
  const [totalCount, setTotalCount] = useState(0)
  const [viewData, setViewData] = useState({
    temp_name: '', created_timestamp: '', scenario_name: '',
    initial_mkt_price: '', price_var: '', base_quant: '',
    quant_var: '', alpha0: '', alpha1: '',
    theta0: '', theta1: '', std_dev_price_buy: '',
    std_dev_price_sell: '', std_dev_quant: '', mean_quant: '',
    distribution: '', comments: '', mean_price_buy: '',
    mean_price_sell: ''
  })

  const [tempname, setTempName] = useState('');
  useEffect(() => {
    handlegetAllTemplateDetails();
    getScenarios();

  }, [tempname, s_type, fromDate, toDate])

  const getScenarios = async () => {
    const result = await API_Auth.getAllScenarios();
    console.log("scenarios", result)
    setFinalScenarios(result.scenarios);

  }
  const handlegetAllTemplateDetails = async () => {
    let body = {
      "temp_name": tempname,
      "admin_id": "1",
      "scenario": s_type,
      "datefrom": fromDate == "" ? "" : moment(fromDate).format("YYYY-MM-DD HH:mm:ss"),
      "dateto": toDate == "" ? "" : moment(toDate).format("YYYY-MM-DD HH:mm:ss"),
      "resultPerPage": perPage,
      "pgNo": pageNo,
      "showPrivate": false
    }

    console.log(body);

    const result = await API_Auth.getAllTemplates(body);
    console.log(result)
    if (result.status == 200) {
      setTemplateData(result.templates)
      setTotalCount(result.count)
      setPageCount(Math.ceil(result.count / perPage))

    }
  }

  const handlePageClick = async (e: any) => {


    const selectedPage = e.selected;
    let page = (selectedPage) * perPage;
    setOffSet(page);
    console.log("selectedPage", selectedPage)
    let pageData = selectedPage == 0 ? 1 : selectedPage + 1;
    setPageNo(pageData);

    handlegetAllTemplateDetails()


    setCurrentPage(page)

  }

  const handleInput = async (e: any) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    if (name === "scenarioType") {
      setSType(value);
      handlegetAllTemplateDetails()
    }
    if (name == "tempname") {
      setTempName(value)
      handlegetAllTemplateDetails()

    }
    if (name == "fromDate") {
      setFromDate(value)
      handlegetAllTemplateDetails()
    }
    if (name == "toDate") {
      setToDate(value)


      handlegetAllTemplateDetails()
    }

    if (name == "perPage") {

      setPerPage(Number(value))
      setPageNo(1);
      setCurrentPage(1);

      handlegetAllTemplateDetails()


    }
  }

  const handleDeleteClick = (data: any) => {
    setTooltipVisible(!tooltipVisible);
    setKey(data.temp_name)
    setViewData(data)
  };

  const handleDeleteConfirm = async () => {

    let body = {
      "template_name": viewData.temp_name
    }
    const result = await API_Auth.getDeleteTemplate(body)
    console.log(result);
    if (result.status == 200) {
      toast.success('Template Deleted Successfully')

      setTimeout(() => {
        handlegetAllTemplateDetails()
      }, 2000);
    }
    setTooltipVisible(false);
  };


  const handleCancelClick = () => {
    setTooltipVisible(false);
  };
  const handleEdit = () => {
    router.push("/templateDetails");
  };
  const [showModal, setShowModal] = useState(false);
  const viewDetails = (data: any) => {
    console.log(data);
    setShowModal(true);
    setViewData(data)
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const [tabIndex, setTabIndex] = useState(0);
  const handleEditTemplate = (data: any) => {
    console.log(data.temp_name)
    router.push({
      pathname: '/editTemplate',
      query: { temp_name: data.temp_name },
    });
  }
  const handleDownloadExel=()=>{
    console.log(viewData)
    let finalData=[];
    let finaldata=finalData.push(viewData)
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = viewData.temp_name

    const ws = XLSX.utils.json_to_sheet(finalData);

    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(data, fileName + fileExtension);
  }
  return (
    <div className="container-fluid">
      <div className="template details">
        <div className="head">
          <h1>Template Details</h1>
          <button>
            <Link href="createtemplate">
              <img src="/imgs/plus.svg" alt="" /> CREATE TEMPLATE
            </Link>
          </button>
        </div>
        <div className="template-type">
          <div className="tabs">
            <Tabs
              selectedIndex={tabIndex}
              onSelect={(tabIndex: SetStateAction<number>) =>
                setTabIndex(tabIndex)
              }
            >
              {/*  <TabList>
                <Tab>My Template</Tab>
                <Tab>Other Templates</Tab>
              </TabList> */}

              <TabPanel>
                <div className="total-template">
                  <p>{totalCount} Templates</p>
                </div>
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
                          {/* <Tab>Crash</Tab>
                          <Tab>Bubble</Tab> */}
                          <select
                            name="scenarioType"
                            id="type"
                            value={s_type}
                            onChange={handleInput}
                            style={{ width: "200px" }}
                          >
                            <option value="">Select Scenario Type</option>
                            {finalScenarios.map(item => (
                              <option key={item?.scenario_name} value={item?.scenario_name}>{item?.scenario_name}</option>
                            ))}


                          </select>
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
                      <input type="text" placeholder="Search by template name" onChange={handleInput}
                        value={tempname} name="tempname" />
                      <img src="imgs/search-icon.svg" alt="" />
                    </div>
                    {/*   <div className="calendar">
                      <img src="imgs/calendar.svg" alt="" />
                      <select name="" id="calendar">
                        <option value="">From-to</option>
                      </select>
                    </div> */}
                    <div className="dateFilter">
                      <input type="date" name="fromDate" value={fromDate} onChange={handleInput} />

                      <input type="date" name="toDate" value={toDate} onChange={handleInput} />
                    </div>
                  </div>
                </div>

                <div className=" table-responsive">
                  <div className="template-content">
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
                          <tr key={data.temp_name}>
                            <td>{data.scenario_name}</td>
                            <td>{data.temp_name}</td>
                            <td>{moment(data.created_timestamp).format("MM/DD/YYYY h:mm:ss A")}</td>
                            <td>{data.comments}</td>
                            <td
                              className="actions
                                         "
                            >
                              <button className="edit-icon" onClick={() => handleEditTemplate(data)}>
                                {/*  <Link href="editTemplate"> */}
                                <img src="imgs/pencil.svg" alt="" title="edit" />

                              </button>
                              <button className="delete-icon" onClick={() => handleDeleteClick(data)}>
                                <img src="imgs/recycle-bin.svg" alt="" title="Delete" />
                                {(tooltipVisible && key == data.temp_name) && (
                                  <span className="tooltip">
                                    <div className="tool-info">
                                      <p>
                                        Are you sure you want to delete this template?
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
            {/*   <TabPanel>
                <div className="total-template">
                  <p>20 Templates</p>
                </div>
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

                <div className="table-responsive">
                  <div className="template-content">
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
                          <tr key={data.temp_name}>
                            <td>{data.scenario_name}</td>
                            <td>{data.temp_name}</td>
                            <td>{moment(data.created_timestamp).format("MM/DD/YYYY h:mm:ss A")}</td>
                            <td>{data.comments}</td>
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
                                className="delete-icon"
                                onClick={() => handleDeleteClick(data)}
                              >
                                <img
                                  src="imgs/recycle-bin.svg"
                                  alt=""
                                  title="Delete"
                                />
                                {tooltipVisible && key == data.temp_name && (
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
                                onClick={() => viewDetails(data)}
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
                                        <label htmlFor="create">
                                          Created on
                                        </label>
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
                                          Lorem ipsum dolor sit amet,
                                          consectetuer adipiscing elit. Aenean
                                          commodo ligula eget dolor.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </Modal.Body>
                              </Modal>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabPanel> */}
            </Tabs>
          </div>
        </div>
        {/*   <div className="pagging-area">
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
        </div> */}

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
                    <div className="left-head">Template Details</div>
                    <div className="right-head">
                      <img src="imgs/file.svg" alt="" />
                      <a  onClick={()=>handleDownloadExel()}>Download Excel Template</a>
                    </div>
                  </div>
                  <div className="bottom-head">
                    <div className="title">{viewData.temp_name}</div>
                    <div className="date">
                      <label htmlFor="create">Created on</label>
                      <span>{moment(viewData.created_timestamp).format("MM/DD/YYYY h:mm:ss A")}</span>
                    </div>
                  </div>
                  <div className="details-section">
                    <div className="template-details">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Scenario Type</th>
                            <th>{viewData.scenario_name}</th>
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
                      <table className="table">
                        <tbody>
                          <tr>
                            <td>Standard Deviation Price Buy </td>
                            <td>{viewData.std_dev_price_buy}</td>
                          </tr>
                          <tr>
                            <td>Standard Deviation Price Sell </td>
                            <td>{viewData.std_dev_price_sell}</td>
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
                            <td>Standard Deviation Quantity</td>
                            <td>{viewData.std_dev_quant}</td>
                          </tr>
                          <tr>
                            <td>Mean Quantity</td>
                            <td>{viewData.mean_quant}</td>
                          </tr>
                        </tbody>
                      </table>
                      <table className="table">
                        <tbody>
                          <tr>
                            <td>Distribution</td>
                            <td>{viewData.distribution}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-comment">
                      <label htmlFor="comment">Comment</label>
                      <p>
                        {viewData.comments}
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
              <select value={perPage}
                name="perPage"
                onChange={handleInput}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>


              </select>
            </div>
            <span>of {totalCount}</span>
          </div>
          <div className="paging-list">

            {/*   <p className="pagination_total">Showing {offset + 1} to {totalCount < offset + perPage &&
            <span>{totalCount}</span>}
            {totalCount > offset + perPage &&
              <span>{offset + pageNo}</span>} of {totalCount} items</p> */}
            <ReactPaginate

              previousLabel={"<"}
              nextLabel={">"}

              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
              forcePage={currentPage} />

            {/*  <div className="leftaction disable-pointer">
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
            */}
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}