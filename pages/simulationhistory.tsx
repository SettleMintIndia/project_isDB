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
import * as XLSX from "xlsx";
import * as React from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Home() {
  const router = useRouter();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [key, setKey] = useState();
  const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
  const [dataRecords, setDataRecords] = useState<any[]>([]);
  const [finalScenarios, setFinalScenarios] = useState([{ scenario_name: "" }]);

  const [templateData, setTemplateData] = useState([
    {
      scenario_name: "",
      temp_name: "",
      created_timestamp: "",
      exe_id: "",
      is_public: 0,
    },
  ]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
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
  const [viewData, setViewData] = useState({
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
    Iteartions: "",
    Orders: "",
    rounds: "",
    oder_variance: "",
  });
  const pdfExportComponent = React.useRef<PDFExport>(null);
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);

  const [meanPriceSimulation, setMeanPriceSimulation] = useState({
    inter_10_price_ns: 0,
    inter_10_price_ws: 0,
    inter_90_price_ns: 0,
    inter_90_price_ws: 0,
    max_price_ns: 0,
    max_price_ws: 0,
    mean_price_ns: 0,
    mean_price_ws: 0,
    median_price_ns: 0,
    median_price_ws: 0,
    min_price_ns: 0,
    min_price_ws: 0,
    std_price_ns: 0,
    std_price_ws: 0,
  });
  const [meanVolumeSimulation, setMeanVolumeSimulation] = useState({
    inter_10_amt_ns: 0,
    inter_10_amt_ws: 0,
    inter_90_amt_ns: 0,
    inter_90_amt_ws: 0,
    max_amt_ns: 0,
    max_amt_ws: 0,
    mean_amt_ns: 0,
    mean_amt_ws: 0,
    median_amt_ns: 0,
    median_amt_ws: 0,
    min_amt_ns: 0,
    min_amt_ws: 0,
    std_amt_ns: 0,
    std_amt_ws: 0,
  });

  const [meanQuantitySimulation, setMeanQuantitySimulation] = useState({
    inter_10_quant_ns: 0,
    inter_10_quant_ws: 0,
    inter_90_quant_ns: 0,
    inter_90_quant_ws: 0,
    max_quant_ns: 0,
    max_quant_ws: 0,
    mean_quant_ns: 0,
    mean_quant_ws: 0,
    median_quant_ns: 0,
    median_quant_ws: 0,
    min_quant_ns: 0,
    min_quant_ws: 0,
    std_quant_ns: 0,
    std_quant_ws: 0,
  });

  const [StablizationFundData, setStablizationFundData] = useState({
    inter_10_asset_stab: 0,
    inter_10_cash_stab: 0,
    inter_10_total_stab: 0,
    inter_10_total_v_stab: 0,
    inter_90_asset_stab: 0,
    inter_90_cash_stab: 0,
    inter_90_total_stab: 0,
    inter_90_total_v_stab: 0,
    max_asset_stab: 0,
    max_cash_stab: 0,
    max_total_stab: 0,
    max_total_v_stab: 0,
    mean_asset_stab: 0,
    mean_cash_stab: 0,
    mean_total_stab: 0,
    mean_total_v_stab: 0,
    median_asset_stab: 0,
    median_cash_stab: 0,
    median_total_stab: 0,
    median_total_v_stab: 0,
    min_asset_stab: 0,
    min_cash_stab: 0,
    min_total_stab: 0,
    min_total_v_stab: 0,
    std_asset_stab: 0,
    std_cash_stab: 0,
    std_total_stab: 0,
    std_total_v_stab: 0,
  });

  const [StablizationTotal, setStablizationTotal] = useState({
    round_assets: 0,
    round_cash: 0,
    round_tk: 0,
  });

  useEffect(() => {
    setMounted(true);
    getSimulations(
      tempname,
      creatorName,
      s_type,
      fromDate,
      toDate,
      perPage,
      pageNo
    );
    getScenarios();
  }, [viewData]);

  const getScenarios = async () => {
    const result = await API_Auth.getAllScenarios();
    console.log("scenarios", result);
    setFinalScenarios(result.scenarios);
  };
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
      datefrom:
        (fromDate == null || fromDate == "") ? "" : moment(fromDate).format("YYYY-MM-DD HH:mm:ss"),
      dateto: (toDate == null || toDate == "") ? "" : moment(toDate).format("YYYY-MM-DD HH:mm:ss"),

      resultPerPage: perPage,
      pgNo: pageNo,
      execution_id: "",
    };
    setLoading(true);
    const result = await API_Auth.getSimulationHistory(body);
    console.log(result);
    setLoading(false);
    if (result.status == 200) {
      setTemplateData(result.simulations);
      setTotalCount(result.count);
      setPageCount(Math.ceil(result.count / perPage));
      console.log(Math.ceil(result.count / perPage));
    }
  };
  const viewDetails = (data: any) => {
    console.log(data);

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
        1
      );
    }
  };
  const handleInput = async (e: any) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    if (name === "scenarioType") {
      setSType(value);
      setCurrentPage(0);
      getSimulations(
        tempname,
        creatorName,
        value,
        fromDate,
        toDate,
        perPage,
        1
      );
    }
    if (name == "tempname") {
      setTempName(value);
      setCurrentPage(0);

      getSimulations(value, creatorName, s_type, fromDate, toDate, perPage, 1);
      //handlegetAllTemplateDetails();
    }
    if (name == "fromDate") {
      setFromDate(value);
      setCurrentPage(0);

      getSimulations(tempname, creatorName, s_type, value, toDate, perPage, 1);
    }
    if (name == "toDate") {
      setToDate(value);
      setCurrentPage(0);

      getSimulations(
        tempname,
        creatorName,
        s_type,
        fromDate,
        value,
        perPage,
        1
      );
    }

    if (name == "perPage") {
      setPerPage(Number(value));
      setPageNo(1);
      setCurrentPage(0);

      getSimulations(tempname, creatorName, s_type, fromDate, toDate, Number(value), 1);
    }
  };

  const handleAllData = () => {
    setTempName("");
    setCreatorName("");
    setSType("");
    setFromDate(null);
    setToDate(null);
    setCurrentPage(0);

    getSimulations("", "", "", "", "", perPage, 1);
  };
  const handlePageClick = async (e: any) => {
    const selectedPage = e.selected;
    let page = selectedPage * perPage;
    setOffSet(page);
    console.log("selectedPage", selectedPage);
    //let pageData = selectedPage == 0 ? 1 : selectedPage + 1;
    //setPageNo(pageData);
    let data = e.selected + 1;
    console.log("asdakl", data, page);
    setPageNo(data);
    setCurrentPage(e.selected);

    getSimulations(
      tempname,
      creatorName,
      s_type,
      fromDate,
      toDate,
      perPage,
      data
    );
  };

  const handleCheckboxChange = async (id: never) => {
    console.log(id);
    // Check if the record is already in the array
    const index = selectedRecords.indexOf(id);
    console.log(selectedRecords);

    const filteredArray = templateData.filter((item) => item.exe_id === id);
    console.log("filteredArray", filteredArray, dataRecords);

    if (dataRecords.length < 3) {
      // If the record is checked, add it to the array
      if (index === -1) {
        setSelectedRecords([...selectedRecords, id]);
        setDataRecords([...dataRecords, filteredArray[0]]);
      } else {
        // If the record is unchecked, remove it from the array
        const updatedRecords = [...selectedRecords];
        const updateDataRecords = [...dataRecords];
        updatedRecords.splice(index, 1);
        //updateDataRecords.splice(index, 1);
        const updatedData = updateDataRecords.filter(
          (item) => item.exe_id === id
        );

        setDataRecords([...updatedData]);
        setSelectedRecords(updatedRecords);
      }
    } else {
      toast.error("Template Records should not more than 3");
    }
  };
  const handleClear = () => {
    setDataRecords([]);
    setSelectedRecords([]);
  };

  const handleCompareClick = () => {
    console.log(dataRecords);
    if (dataRecords.length != 3) {
      toast.error("Template Records length should be 3");
    } else {
      //router.push("/templatedetails_excel")

      router.push({
        pathname: "/templatedetails_excel",
        query: {
          temp_name1: dataRecords[0]?.temp_name,
          exe_id1: dataRecords[0]?.exe_id,
          temp_name2: dataRecords[1]?.temp_name,
          exe_id2: dataRecords[1]?.exe_id,
          temp_name3: dataRecords[2]?.temp_name,
          exe_id3: dataRecords[2]?.exe_id,
        },
      });
    }
  };
  const handleClose = (id: any) => {
    console.log("Exid", id);
    const updatedRecords = [...selectedRecords];
    const index = selectedRecords.indexOf(id);

    const updateDataRecords = [...dataRecords];
    updatedRecords.splice(index, 1);
    //updateDataRecords.splice(index, 1);
    const updatedData = updateDataRecords.filter((item) => item.exe_id != id);
    console.log("updatedData", updatedData, updateDataRecords);

    setDataRecords([...updatedData]);
    setSelectedRecords(updatedRecords);
  };

  const handleFirstRecord = () => {
    setCurrentPage(0);
    getSimulations(tempname, creatorName, s_type, fromDate, toDate, perPage, 1);
  };
  const handlelastRecord = () => {
    getSimulations(
      tempname,
      creatorName,
      s_type,
      fromDate,
      toDate,
      perPage,
      pageCount
    );
    setCurrentPage(pageCount - 1);
  };

  const handleDownloadExcel = async (data: any) => {
    console.log(data);
    setCount(0);

    let body = {
      temp_name: data.temp_name,
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
    console.log(result.templates[0]);
    var keydata = result.templates[0];
    keydata["Iteartions"] = data.iterations;
    keydata["Orders"] = data.nb_orders;
    keydata["rounds"] = data.nb_rounds;
    keydata["oder variance"] = data.nb_orders_var;
    keydata["created_timestamp"] = moment(keydata.created_timestamp).format(
      "MM/DD/YYYY h:mm:ss A"
    );
    let finalData: any[] = [];

    const wb = XLSX.utils.book_new();

    Object.keys(keydata).forEach(function (key) {
      var value = keydata[key];
      let obj = { key: key, Value: value };
      finalData.push(obj);
    });
    console.log("finalData", finalData);

    const tempData = XLSX.utils.json_to_sheet(finalData);
    XLSX.utils.book_append_sheet(wb, tempData, "Template");

    /*  price*/

    const meanPrice = await API_Auth.getSimulationResult(data.exe_id, "price");
    console.log("meanPrice", meanPrice.sim);
    const MeanPriceSimulation =
      meanPrice.sim == undefined ? meanPriceSimulation : meanPrice.sim;

    const withStabilizationData: any = {
      Template: data.temp_name,
      Mean: MeanPriceSimulation.mean_price_ws,
      Median: MeanPriceSimulation.median_price_ws,
      "Standard deviation": MeanPriceSimulation.std_price_ws,
      "10%-90% Interval":
        MeanPriceSimulation.inter_10_price_ws +
        "-" +
        MeanPriceSimulation.inter_90_price_ws,
    };
    const withoutStabilizationData: any = {
      Template: data.temp_name,
      Mean: MeanPriceSimulation.mean_price_ns,
      Median: MeanPriceSimulation.median_price_ns,
      "Standard deviation": MeanPriceSimulation.std_price_ns,
      "10%-90% Interval":
        MeanPriceSimulation.inter_10_price_ns +
        "-" +
        MeanPriceSimulation.inter_90_price_ns,
    };

    const wsData = [["", "With Stabilization", "Without Stabilization"]];
    Object.keys(withStabilizationData).forEach((key) => {
      wsData.push([
        key,
        withStabilizationData[key],
        withoutStabilizationData[key],
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    XLSX.utils.book_append_sheet(wb, ws, "Price");
    /* volume */

    const meanVolume = await API_Auth.getSimulationResult(
      data.exe_id,
      "volume"
    );
    console.log("meanVolume", meanVolume.sim);
    const MeanVolumeSimulation =
      meanVolume.sim == undefined ? meanVolumeSimulation : meanVolume.sim;

    const withStabilizationDataVOlume: any = {
      Template: data.temp_name,
      Mean: MeanVolumeSimulation.mean_amt_ws,
      Median: MeanVolumeSimulation.median_amt_ws,
      "Standard deviation": MeanVolumeSimulation.std_amt_ws,
      "10%-90% interval":
        MeanVolumeSimulation.inter_10_amt_ws +
        "-" +
        MeanVolumeSimulation.inter_90_amt_ws,
    };
    const withoutStabilizationDataVolume: any = {
      Template: data.temp_name,
      Mean: MeanVolumeSimulation.mean_amt_ns,
      Median: MeanVolumeSimulation.median_amt_ns,
      "Standard deviation": MeanVolumeSimulation.std_amt_ns,
      "10%-90% interval":
        MeanVolumeSimulation.inter_10_amt_ns +
        "-" +
        MeanVolumeSimulation.inter_90_amt_ns,
    };

    const wsDataVolume = [["", "With Stabilization", "Without Stabilization"]];
    Object.keys(withStabilizationDataVOlume).forEach((key) => {
      wsDataVolume.push([
        key,
        withStabilizationDataVOlume[key],
        withoutStabilizationDataVolume[key],
      ]);
    });

    const wsVolume = XLSX.utils.aoa_to_sheet(wsDataVolume);
    XLSX.utils.book_append_sheet(wb, wsVolume, "Volume");

    /* Quantity */

    const meanqty = await API_Auth.getSimulationResult(data.exe_id, "quantity");
    console.log("meanqty", meanqty.sim);
    const meanqtysimulation =
      meanqty.sim == undefined ? meanQuantitySimulation : meanqty.sim;

    const withStabilizationDataQty: any = {
      Template: data.temp_name,
      Mean: meanqtysimulation.mean_quant_ws,
      Median: meanqtysimulation.median_quant_ws,
      "Standard deviation": meanqtysimulation.std_quant_ws,
      "10%-90% interval":
        meanqtysimulation.inter_10_quant_ws +
        "-" +
        meanqtysimulation.inter_90_quant_ws,
    };
    const withoutStabilizationDataQty: any = {
      Template: data.temp_name,
      Mean: meanqtysimulation.mean_quant_nsn,
      Median: meanqtysimulation.median_quant_ns,
      "Standard deviation": meanqtysimulation.std_quant_ns,
      "10%-90% interval":
        meanqtysimulation.inter_10_quant_ns +
        "-" +
        meanQuantitySimulation.inter_90_quant_ns,
    };

    const wsDataQty = [["", "With Stabilization", "Without Stabilization"]];
    Object.keys(withStabilizationDataQty).forEach((key) => {
      wsDataQty.push([
        key,
        withStabilizationDataQty[key],
        withoutStabilizationDataQty[key],
      ]);
    });

    const wsQty = XLSX.utils.aoa_to_sheet(wsDataQty);
    XLSX.utils.book_append_sheet(wb, wsQty, "Quantity");

    /* stablizationfund */

    const stabresult = await API_Auth.getStablizationFundDetails(data.exe_id);
    console.log("StablizationFund", stabresult);
    const totalfundata =
      stabresult.stab == undefined ? StablizationFundData : stabresult.stab;

    const withCash: any = {
      temp_name: data.temp_name,
      mean: totalfundata.mean_cash_stab,
      median: totalfundata.median_cash_stab,
      "Standard Deviation": totalfundata.std_cash_stab,
      "10%-90% Interval":
        totalfundata.inter_10_cash_stab + "-" + totalfundata.inter_90_cash_stab,
    };
    const withArrayQuantity: any = {
      temp_name: data.temp_name,
      mean: totalfundata.mean_cash_stab,
      median: totalfundata.median_cash_stab,
      "Standard Deviation": totalfundata.std_cash_stab,
      "10%-90% Interval":
        totalfundata.inter_10_cash_stab + "-" + totalfundata.inter_90_cash_stab,
    };
    const withTotalAssetV: any = {
      temp_name: data.temp_name,
      mean: totalfundata.mean_cash_stab,
      median: totalfundata.median_cash_stab,
      "Standard Deviation": totalfundata.std_cash_stab,
      "10%-90% Interval":
        totalfundata.inter_10_cash_stab + "-" + totalfundata.inter_90_cash_stab,
    };
    const withTotalAssetDollar: any = {
      temp_name: data.temp_name,
      mean: totalfundata.mean_cash_stab,
      median: totalfundata.median_cash_stab,
      "Standard Deviation": totalfundata.std_cash_stab,
      "10%-90% Interval":
        totalfundata.inter_10_cash_stab + "-" + totalfundata.inter_90_cash_stab,
    };

    const wsDataStablization = [
      ["", "Cash", "Asset(Quantity)", "Total Asset $", "Total Asset/v"],
    ];
    Object.keys(withCash).forEach((key) => {
      wsDataStablization.push([
        key,
        withCash[key],
        withArrayQuantity[key],
        withTotalAssetV[key],
        withTotalAssetDollar[key],
      ]);
    });

    const wssdata = XLSX.utils.aoa_to_sheet(wsDataStablization);
    XLSX.utils.book_append_sheet(wb, wssdata, "Stablization");

    XLSX.writeFile(wb, data.temp_name + "Report.xlsx");
  };

  const handleDownloadPDF = async (data: any) => {
    console.log(data);
    console.log(data.temp_name);
    router.push({
      pathname: "/reportpdf",
      query: { temp_name: data.temp_name, exe_id: data.exe_id },
    });

    /* setCount(0)

    let body = {
      temp_name: data.temp_name,
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
    var keydata = result.templates[0];
    keydata['Iteartions'] = data.iterations;
    keydata['Orders'] = data.nb_orders
    keydata['rounds'] = data.nb_rounds
    keydata['oder_variance'] = data.nb_orders_var;

    console.log("keydata", keydata,result.templates.length)
    setViewData(keydata)
    setCount(result.templates.length);
    if (result.templates.length > 0) {
      if (pdfExportComponent.current) {
        pdfExportComponent.current.save();
      }
    } */
  };
  //console.log("viewData---------->",viewData)

  const handleDates = (date: any, key: any) => {
    console.log(date, key)
    if (key == "startdate") {
      setFromDate(date)
      getSimulations(tempname, creatorName, s_type, date, toDate, perPage, 1);
    } else {
      console.log("enddate")
      setToDate(date)
      getSimulations(tempname, creatorName, s_type, fromDate, date, perPage, 1);
    }
  }
  const handleDelete = (key: any) => {
    if (key == "startdate") {
      setFromDate(null)
      getSimulations(tempname, creatorName, s_type, "", toDate, perPage, 1);
    } else {
      console.log("enddate")
      setToDate(null)
      getSimulations(tempname, creatorName, s_type, fromDate, "", perPage, 1);
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
                <h1>Simulation History</h1>

                {/* <p>({totalCount} )</p> */}
              </div>
              <div className="head"></div>
            </div>

            <div className="compare-banner">
              <label htmlFor="">Compare Templates :</label>
              {dataRecords.map((item: any) => (
                <button className="templatename">
                  {item.temp_name}{" "}
                  <img
                    src="imgs/close-black.svg"
                    alt=""
                    onClick={() => handleClose(item.exe_id)}
                  />
                </button>
              ))}

              <button className="compare-button">
                <a onClick={() => handleCompareClick()}>Compare Templates</a>
              </button>
              <button className="clear" onClick={() => handleClear()}>
                Clear All
              </button>
            </div>
            <div className="template-type">
              <div className="tabs">
                <div className="filterArea">
                  <div className="filterLeft">
                    <div className="tabs">
                      {" "}
                      <Tabs>
                        {/*  <TabList>
                        <Tab>All</Tab>
                        <Tab>Crash</Tab>
                        <Tab>Bubble</Tab>
                      </TabList>{" "} */}
                        <TabList>
                          {/* <Tab>
                            <div onClick={() => handleAllData()}>All</div>
                          </Tab> */}
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
                                  <option value="">Select Scenario Type</option>
                                  <option onSelect={() => handleAllData()}>
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
                    {/*  <div className="dateFilter">
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
                    </div> */}
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
                          <span className="icon-container" onClick={() => handleDelete("startdate")}>
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
                          <span className="icon-container" onClick={() => handleDelete("enddate")}>
                            <img src="imgs/close.svg" alt="Close Icon" className="close-icon" />
                          </span>
                        )}
                      </div>
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
                          {/* <th>Visibility</th> */}
                          <th>Simulation Date</th>
                          <th>Execution Details</th>
                          <th>
                            <img src=" imgs/download-white.svg" alt="" />{" "}
                            Download Report
                          </th>
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
                          <tr key={data.exe_id}>
                            <td id="checkbox">
                              {" "}
                              <input
                                type="checkbox"
                                className="checkbox"
                                checked={selectedRecords.includes(data.exe_id)}
                                onChange={() =>
                                  handleCheckboxChange(data.exe_id)
                                }
                              />
                            </td>
                            <td>{data.scenario_name}</td>
                            <td>{data.temp_name}</td>
                            {/* <td id="privacy">
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
                            </td> */}
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
                              <a onClick={() => handleDownloadPDF(data)}>PDF</a>

                              <a onClick={() => handleDownloadExcel(data)}>
                                EXCEL
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {templateData.length != 0 && (
              <div className="pagging-area mt-2">
                <div className="toolbar">
                  <label htmlFor="">Results per page :</label>
                  <div className="tooldrop">
                    <select value={perPage}
                      name="perPage"
                      onChange={handleInput}>
                      <option value="5">5</option>
                      <option value="10">10</option>

                      <option value="15">15</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                    </select>
                  </div>
                  <span>of {totalCount}</span>
                </div>
                <div className="paging-list">
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

          {/* report pdf  */}
        </div>
      </AppLayout>
    );
}
