"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "react-tabs/style/react-tabs.css";
import API_Auth from "./api/API_Auth";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from "@/components/layout/Loader";

export default function Home() {
  const router = useRouter();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [adminData, setAdminData] = useState([
    { id: "", email: "", display_name: "", created_timestamp: "" },
  ]);
  const [key, setKey] = useState();
  const [searchKey, setSearchKey] = useState("");
  //const [count, setCount] = useState(10);
  const [perPage, setPerPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [useremail, setUserEmail] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffSet] = useState(0);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");



  const handleDeleteClick = (data: any) => {
    console.log(data);
    setUserEmail(data.email);
    setKey(data.id);
    setTooltipVisible(!tooltipVisible);
  };

  useEffect(() => {
    handlegetAllAdmins(searchKey, perPage, 1);
  }, []);

  const handlegetAllAdmins = async (
    searchKey: any,
    perPage: any,
    pageNo: any
  ) => {
    let body = {
      text: searchKey,
      resultPerPage: perPage,
      pgNo: pageNo,
    };

    setLoading(true)
    const result = await API_Auth.getAdmins(body);
    console.log(result);
    setLoading(false)

    setAdminData(result.admins);
    setTotalCount(result.count);

    setPageCount(Math.ceil(result.count / perPage));
  };

  const handleDeleteConfirm = async () => {
    let body = {
      email: useremail,
    };
    const result = await API_Auth.getdeleteAdmin(body);
    console.log(result);
    if (result.status == 200) {
      toast.success("Admin Deleted Successfully");
      setCurrentPage(0)
      setTimeout(() => {
        handlegetAllAdmins("", perPage, 1);
      }, 2000);
    }
    setTooltipVisible(false);
  };

  const handleCancelClick = () => {
    setTooltipVisible(false);
  };

  const handleSearchChange = (event: any) => {
    setSearchKey(event.target.value);

    setCurrentPage(0)

    handlegetAllAdmins(event.target.value, perPage, 1);
  };
  const handlePageClick = async (e: any) => {
    const selectedPage = e.selected;
    let page = selectedPage * perPage;
    setOffSet(page);
    console.log("selectedPage", selectedPage);
    let data = e.selected + 1;
    console.log("asdakl", data, page)
    setPageNo(data);
    setCurrentPage(e.selected);
    handlegetAllAdmins(searchKey, perPage, data);

  };
  const handleInput = async (e: any) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    console.log(name, value);

    if (name == "perPage") {
      setPerPage(Number(value));
      setPageNo(1);
      setCurrentPage(0);

      handlegetAllAdmins(searchKey, Number(value), 1);
    }
    if (name == "fromDate") {
      setFromDate(value);
      setCurrentPage(0)

      //handlegetAllTemplateDetails(tempname, s_type, value, toDate, perPage, 1);
    }
    if (name == "toDate") {
      setToDate(value);
      setCurrentPage(0)

      //handlegetAllTemplateDetails(tempname, s_type, fromDate, value, perPage, 1);
    }
  };

  const handleFirstRecord = () => {
    handlegetAllAdmins(searchKey, perPage, 1);
    setCurrentPage(0)


  }
  const handlelastRecord = () => {
    handlegetAllAdmins(searchKey, perPage, pageCount);
    setCurrentPage(pageCount - 1)


  }


  return (

    <div className="container-fluid">


      <div className="template admin">
        {/* <div className="head"> */}
        <div className="template-header">
          <div className="back-option"></div>
          <div className="main-header">
            <h1>Admins Details</h1>
            <p> ({totalCount} Templates)</p>
          </div>

          <div className="head">
            <button>
              <Link href="/createadmin">
                <img src="/imgs/plus.svg" alt="" />
                Add Admin
              </Link>
            </button>
          </div>
        </div>


        <div className="filterArea">
          <div className="searchArea">
            <div className="searchFilter options">
              <div className="selectsearch">
                <select name="filter" id="searchtype">
                  <option value="template">Name</option>
                  <option value="creator">Email Address</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Search by"
                onChange={handleSearchChange}
                // value={tempname}
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
            </div>  */}
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

            {/*     <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update: any) => {
                setDateRange(update);
              }}
              isClearable={true}
            /> */}
          </div>
        </div>
        {loading == true && <Loader />}

        <div className="table-responsive">
          <div className="template-content">
            <table
              className="table"
              style={{ borderSpacing: 0, width: "100%" }}
            >
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "50%" }} />
              </colgroup>

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email Address</th>
                  <th>Created On</th>
                  <th>Delete Account</th>
                </tr>
              </thead>
              {adminData.length == 0 && <tbody>
                <tr >
                  <td colSpan={12}>
                    <p className="no_Data_table">No Data Found</p>
                  </td>
                </tr>
              </tbody>
              }
              <tbody>
                {adminData.map((data) => (
                  <tr key={data.id}>
                    <td>{data.display_name}</td>
                    <td>{data.email}</td>
                    <td>
                      {moment(data.created_timestamp).format(
                        "MM/DD/YYYY h:mm:ss A"
                      )}
                    </td>
                    <td
                      className="actions
                  "
                    >
                      <button
                        className="delete-icon"
                        onClick={() => handleDeleteClick(data)}
                      >
                        <img src="imgs/recycle-bin.svg" alt="" title="Delete" />
                        {tooltipVisible && key == data.id && (
                          <div className="delete-tooltip">
                            <span className="tooltip">
                              <div className="tool-info">
                                <p>
                                  Are you sure you want to delete this account?
                                </p>
                                <div className="tool-buttons">
                                  <button
                                    className="delete-button"
                                    type="button"
                                    onClick={handleDeleteConfirm}
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
        <div className="pagging-area" style={{ marginTop: "20px" }}>
          <div className="toolbar">
            <label htmlFor="">Results per page :</label>
            <div className="tooldrop">
              <select value={perPage} name="perPage" onChange={handleInput}>
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
            {/* <ReactPaginate
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
              forcePage={currentPage}
            /> */}

            {currentPage == 0 && <div className="leftaction disable-pointer" >
              <img src="imgs/left-doublearrowg.svg" alt="" />
            </div>}
            {currentPage != 0 && <div className="leftaction disable-pointer" onClick={() => handleFirstRecord()}>
              <img src="imgs/left-doublearrow.svg" alt="" />
            </div>}
            {/*  <div className="leftaction-single">
              <img src="imgs/left-paging.svg" alt="" />
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
            {/*  <ul className="paging-count">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
            </ul> 
            <div className="rightaction-single">
              <img src="imgs/right-paging.svg" alt="" />
            </div>*/}
             {currentPage != pageCount - 1 && <div className="rightaction" onClick={() => handlelastRecord()} >
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
  );
}
