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
import Loader from "@/components/layout/Loader";
import AppLayout from "@/components/layout/AppLayout";
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [adminData, setAdminData] = useState([
    { id: "", email: "", display_name: "", created_timestamp: "" },
  ]);
  const [key, setKey] = useState();
  const [searchKey, setSearchKey] = useState("");
  //const [count, setCount] = useState(10);
  const [perPage, setPerPage] = useState(5);
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

  const [keyname, setKeyName] = useState('name')


  const handleDeleteClick = (data: any) => {
    console.log(data);
    setUserEmail(data.email);
    setKey(data.id);
    setTooltipVisible(!tooltipVisible);
  };

  useEffect(() => {
    handlegetAllAdmins(searchKey, fromDate, toDate, perPage, 1);
  }, [searchKey, fromDate, toDate, perPage]);

  const handlegetAllAdmins = async (
    searchKey: any,
    fromDate: any,
    toDate: any,
    perPage: any,
    pageNo: any
  ) => {
    let body = {
      name: keyname == "name" ? searchKey : "",
      email: keyname == "email" ? searchKey : "",
      datefrom:
        fromDate == "" ? "" : moment(fromDate).format("YYYY-MM-DD HH:mm:ss"),
      dateto: toDate == "" ? "" : moment(toDate).format("YYYY-MM-DD HH:mm:ss"),
      resultPerPage: perPage, pgNo: pageNo,
    };

    setLoading(true);
    const result = await API_Auth.getAdmins(body);
    console.log(result);
    setLoading(false);

    setAdminData(result.admins);
    setTotalCount(result.count);

    setPageCount(Math.ceil(result.count / perPage));
  };

  const handleDeleteConfirm = async () => {
    let body = {
      email: useremail,
    };
    setLoading(true)
    const result = await API_Auth.getdeleteAdmin(body);
    console.log(result);
    setLoading(false)

    if (result.status == 200) {
      toast.success("Admin Deleted Successfully");
      setCurrentPage(0);
      setTimeout(() => {
        handlegetAllAdmins("", "", "", perPage, 1);
      }, 2000);
    }
    setTooltipVisible(false);
  };

  const handleCancelClick = () => {
    setTooltipVisible(false);
  };

  const handleSearchChange = (event: any) => {
    setSearchKey(event.target.value);

    setCurrentPage(0);

    handlegetAllAdmins(event.target.value, fromDate, toDate, perPage, 1);
  };
  const handlePageClick = async (e: any) => {
    const selectedPage = e.selected;
    let page = selectedPage * perPage;
    setOffSet(page);
    console.log("selectedPage", selectedPage);
    let data = e.selected + 1;
    console.log("asdakl", data, page);
    setPageNo(data);
    setCurrentPage(e.selected);
    handlegetAllAdmins(searchKey, fromDate, toDate, perPage, data);
  };
  const handleInput = async (e: any) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    console.log(name, value);
    if (name == "keyname") {
      setKeyName(value);
    }

    if (name == "perPage") {
      setPerPage(Number(value));
      setPageNo(1);
      setCurrentPage(0);

      handlegetAllAdmins(searchKey, fromDate, toDate, Number(value), 1);
    }
    if (name == "fromDate") {
      setFromDate(value);
      setCurrentPage(0);

      handlegetAllAdmins(searchKey, value, toDate, perPage, 1);
    }
    if (name == "toDate") {
      setToDate(value);
      setCurrentPage(0);

      handlegetAllAdmins(searchKey, fromDate, value, perPage, 1);
    }
  };

  const handleFirstRecord = () => {
    handlegetAllAdmins(searchKey, fromDate, toDate, perPage, 1);
    setCurrentPage(0);
  };
  const handlelastRecord = () => {
    handlegetAllAdmins(searchKey, fromDate, toDate, perPage, pageCount);
    setCurrentPage(pageCount - 1);
  };

  return (
    <AppLayout>
      <div className="container-fluid">
        <div className="template admin">
          {/* <div className="head"> */}
          <div className="template-header">
            <div className="back-option"></div>
            <div className="main-header">
              <h1>Admins Details</h1>
              <p> ({totalCount})</p>
            </div>

            <div className="head">
              <button>
                <Link href="/createadmin">
                  <Image src="/imgs/plus.svg" alt="" width={24} height={24} />
                  Add Admin
                </Link>
              </button>
            </div>
          </div>

          <div className="filterArea">
            <div className="searchArea">
              <div className="searchFilter options">
                <div className="selectsearch">
                  <select name="keyname"  id="searchtype"
                    value={keyname} onChange={handleInput}>
                    <option value="name">Name</option>
                    <option value="email">Email Address</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder={keyname == "name" ? "Search by Name" : "Search by Email"}
                  onChange={handleSearchChange}
                  // value={tempname}
                  name="tempname"
                />
                <div className="search-icon">
                  <Image src="imgs/search-icon.svg" alt=""
                    width={15.9} height={15.9} />
                </div>
              </div>
              {/*   <div className="calendar">
              <Image src="imgs/calendar.svg" alt="" />
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
                {adminData.length == 0 && (
                  <tbody>
                    <tr>
                      <td colSpan={12}>
                        <p className="no_Data_table">No Data Found</p>
                      </td>
                    </tr>
                  </tbody>
                )}
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
                          <Image
                            src="imgs/recycle-bin.svg"
                            alt=""
                            title="Delete"
                            width={19.059}
                            height={21.391}

                          />
                          {tooltipVisible && key == data.id && (
                            <div className="delete-tooltip">
                              <span className="tooltip">
                                <div className="tool-info">
                                  <p>
                                    Are you sure you want to delete this
                                    account?
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
              <Image src="imgs/left-doublearrow.svg" alt="" />
            </div>
            <div className="leftaction-single">
              <Image src="imgs/left-paging.svg" alt="" />
            </div>
            <ul className="paging-count">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
            </ul>
            <div className="rightaction-single">
              <Image src="imgs/right-paging.svg" alt="" />
            </div>
            <div className="rightaction">
              <Image src="imgs/right-doublearrow.svg" alt="" />
            </div>
          </div>
        </div> */}
          {adminData.length != 0 && <div className="pagging-area" style={{ marginTop: "20px" }}>
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

              {currentPage == 0 && (
                <div className="leftaction disable-pointer">
                  <Image src="imgs/left-doublearrowg.svg" alt="" width={11} height={11} />
                </div>
              )}
              {currentPage != 0 && (
                <div
                  className="leftaction disable-pointer"
                  onClick={() => handleFirstRecord()}
                >
                  <Image src="imgs/left-doublearrow.svg" alt="" />
                </div>
              )}
              {/*  <div className="leftaction-single">
              <Image src="imgs/left-paging.svg" alt="" />
            </div> */}
              <ReactPaginate
                previousLabel={
                  currentPage == 0 ? (
                    <Image src="imgs/leftpaginggray.svg" alt=""
                      width={6.219} height={11.002} />
                  ) : (
                    <Image src="imgs/left-paging.svg" alt=""
                      width={6.219} height={11.002}
                    />
                  )
                }
                nextLabel={
                  currentPage == pageCount - 1 ? (
                    <Image src="imgs/right-paging-gray.svg" alt=""
                      width={6.219} height={11.002} />
                  ) : (
                    <Image src="imgs/right-paging.svg" alt=""
                      width={6.219} height={11.002} />
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
              {/*  <ul className="paging-count">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
            </ul> 
            <div className="rightaction-single">
              <Image src="imgs/right-paging.svg" alt="" />
            </div>*/}
              {currentPage != pageCount - 1 && (
                <div className="rightaction" onClick={() => handlelastRecord()}>
                  <Image src="imgs/right-doublearrow.svg" alt=""
                    height={11} width={11} />
                </div>
              )}
              {currentPage == pageCount - 1 && (
                <div className="rightaction">
                  <Image src="imgs/right-doublearrowg.svg" alt=""
                    height={11} width={11} />
                </div>
              )}
            </div>
          </div>}
        </div>
        <ToastContainer />
      </div>
    </AppLayout>
  );
}