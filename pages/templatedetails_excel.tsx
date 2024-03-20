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
import AppLayout from "@/components/layout/AppLayout";
import * as React from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import * as XLSX from "xlsx";

export default function Home() {
  const router = useRouter();
  const pdfExportComponent = React.useRef<PDFExport>(null);

  const [tempname1, setTempName1] = useState(router.query.temp_name1);
  const [tempname2, setTempName2] = useState(router.query.temp_name2);
  const [tempname3, setTempName3] = useState(router.query.temp_name3);
  const [executionId1, setexecutionId1] = useState(router.query.exe_id1);
  const [executionId2, setexecutionId2] = useState(router.query.exe_id2);
  const [executionId3, setexecutionId3] = useState(router.query.exe_id13);

  const [tempData1, setTempData1] = useState({
    limit_order_lower_bound: "",
    limit_order_upper_bound: "",
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
  const [tempData2, settempData2] = useState({
    limit_order_lower_bound: "",
    limit_order_upper_bound: "",
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
  const [tempData3, settempData3] = useState({
    temp_name: "",
    limit_order_lower_bound: "",
    limit_order_upper_bound: "",
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

  const [meanPriceSimulation1, setMeanPriceSimulation1] = useState({
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
  const [meanVolumeSimulation1, setMeanVolumeSimulation1] = useState({
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

  const [meanQuantitySimulation1, setMeanQuantitySimulation1] = useState({
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

  const [StablizationFundData1, setStablizationFundData1] = useState({
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

  const [meanPriceSimulation2, setMeanPriceSimulation2] = useState({
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
  const [meanVolumeSimulation2, setMeanVolumeSimulation2] = useState({
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

  const [meanQuantitySimulation2, setMeanQuantitySimulation2] = useState({
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

  const [StablizationFundData2, setStablizationFundData2] = useState({
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

  const [meanPriceSimulation3, setMeanPriceSimulation3] = useState({
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
  const [meanVolumeSimulation3, setMeanVolumeSimulation3] = useState({
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

  const [meanQuantitySimulation3, setMeanQuantitySimulation3] = useState({
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

  const [StablizationFundData3, setStablizationFundData3] = useState({
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

  useEffect(() => {
    getTemplate1(tempname1);
    getTemplate2(tempname2);
    getTemplate3(tempname3);

    getSimulationResultDetails1(executionId1);
    getSimulationVolumeResultDetails1(executionId1);
    getSimulationQuantityResultDetails1(executionId1);
    getStablizationFund1(executionId1);

    getSimulationResultDetails2(executionId2);
    getSimulationVolumeResultDetails2(executionId2);
    getSimulationQuantityResultDetails2(executionId2);
    getStablizationFund2(executionId2);

    getSimulationResultDetails3(executionId3);
    getSimulationVolumeResultDetails3(executionId3);
    getSimulationQuantityResultDetails3(executionId3);
    getStablizationFund3(executionId3);
  }, [tempname1, tempname2, tempname3]);

  const getSimulationResultDetails1 = async (id: any) => {
    const result = await API_Auth.getSimulationResult(id, "price");
    console.log("simulationresult", result);
    setMeanPriceSimulation1(
      result.sim == undefined ? meanPriceSimulation1 : result.sim
    );
  };

  const getSimulationQuantityResultDetails1 = async (executionId: any) => {
    const result = await API_Auth.getSimulationResult(executionId, "quantity");
    console.log("quantityresult", result);
    console.log("quantity--------------------------->");
    setMeanQuantitySimulation1(
      result.sim == undefined ? meanQuantitySimulation1 : result.sim
    );
  };
  const getSimulationVolumeResultDetails1 = async (executionId: any) => {
    const result = await API_Auth.getSimulationResult(executionId, "volume");
    console.log("volumeresult", result);
    console.log("volume--------------------------->");
    setMeanVolumeSimulation1(
      result.sim == undefined ? meanVolumeSimulation1 : result.sim
    );
  };

  const getStablizationFund1 = async (id: any) => {
    const result = await API_Auth.getStablizationFundDetails(id);
    console.log("StablizationFund", result);
    setStablizationFundData1(
      result.stab == undefined ? StablizationFundData1 : result.stab
    );
  };

  /*  */
  const getSimulationResultDetails2 = async (id: any) => {
    const result = await API_Auth.getSimulationResult(id, "price");
    console.log("simulationresult", result);
    setMeanPriceSimulation2(
      result.sim == undefined ? meanPriceSimulation2 : result.sim
    );
  };

  const getSimulationQuantityResultDetails2 = async (executionId: any) => {
    const result = await API_Auth.getSimulationResult(executionId, "quantity");
    console.log("quantityresult", result);
    console.log("quantity--------------------------->");
    setMeanQuantitySimulation2(
      result.sim == undefined ? meanQuantitySimulation2 : result.sim
    );
  };
  const getSimulationVolumeResultDetails2 = async (executionId: any) => {
    const result = await API_Auth.getSimulationResult(executionId, "volume");
    console.log("volumeresult", result);
    console.log("volume--------------------------->");
    setMeanVolumeSimulation2(
      result.sim == undefined ? meanVolumeSimulation2 : result.sim
    );
  };

  const getStablizationFund2 = async (id: any) => {
    const result = await API_Auth.getStablizationFundDetails(id);
    console.log("StablizationFund", result);
    setStablizationFundData2(
      result.stab == undefined ? StablizationFundData2 : result.stab
    );
  };
  /*  */

  const getSimulationResultDetails3 = async (id: any) => {
    const result = await API_Auth.getSimulationResult(id, "price");
    console.log("simulationresult", result);
    setMeanPriceSimulation3(
      result.sim == undefined ? meanPriceSimulation3 : result.sim
    );
  };

  const getSimulationQuantityResultDetails3 = async (executionId: any) => {
    const result = await API_Auth.getSimulationResult(executionId, "quantity");
    console.log("quantityresult", result);
    console.log("quantity--------------------------->");
    setMeanQuantitySimulation3(
      result.sim == undefined ? meanQuantitySimulation3 : result.sim
    );
  };
  const getSimulationVolumeResultDetails3 = async (executionId: any) => {
    const result = await API_Auth.getSimulationResult(executionId, "volume");
    console.log("volumeresult", result);
    console.log("volume--------------------------->");
    setMeanVolumeSimulation3(
      result.sim == undefined ? meanVolumeSimulation3 : result.sim
    );
  };

  const getStablizationFund3 = async (id: any) => {
    const result = await API_Auth.getStablizationFundDetails(id);
    console.log("StablizationFund", result);
    setStablizationFundData3(
      result.stab == undefined ? StablizationFundData3 : result.stab
    );
  };

  const getTemplate1 = async (totalTempName: any) => {
    // const result=API_Auth.getTemplateDetails(totalTempName);

    let body = {
      temp_name: totalTempName,
      admin_id: "",
      scenario: "",
      datefrom: "",
      dateto: "",
      resultPerPage: 1,
      pgNo: 1,
      showPrivate: true,
    };
    const result = await API_Auth.getAllTemplates(body);
    console.log("result1", result);
    setTempData1(result.templates[0]);
  };
  const getTemplate2 = async (totalTempName: any) => {
    // const result=API_Auth.getTemplateDetails(totalTempName);

    let body = {
      temp_name: totalTempName,
      admin_id: "",
      scenario: "",
      datefrom: "",
      dateto: "",
      resultPerPage: 1,
      pgNo: 1,
      showPrivate: true,
    };
    const result = await API_Auth.getAllTemplates(body);
    console.log("result2", result);
    settempData2(result.templates[0]);
  };
  const getTemplate3 = async (totalTempName: any) => {
    // const result=API_Auth.getTemplateDetails(totalTempName);

    let body = {
      temp_name: totalTempName,
      admin_id: "",
      scenario: "",
      datefrom: "",
      dateto: "",
      resultPerPage: 1,
      pgNo: 1,
      showPrivate: true,
    };
    const result = await API_Auth.getAllTemplates(body);
    console.log("result3", result);
    settempData3(result.templates[0]);
  };
  const handleBack = () => {
    router.back();
  };
  const handleDownloadPDF = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  const handleDownloadExcel = () => {
    let totalResult: any[] = [];
    totalResult.push(tempData1, tempData2, tempData3);
    console.log(totalResult);
    for (var i = 0; i < totalResult.length; i++) {
      const date = moment(totalResult[i].created_timestamp).format(
        "MM/DD/YYYY h:mm:ss A"
      );
      totalResult[i].created_timestamp = date;
    }
    console.log("formattedData", totalResult);

    const wb = XLSX.utils.book_new();

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(totalResult);

    // Convert the worksheet to an array of arrays
    const aoa = XLSX.utils.sheet_to_json(ws, { header: 1 });

    // Extract unique keys (column names)
    const keys = Array.from(new Set(aoa[0]));

    console.log("keys", keys);

    // Create a new worksheet with the desired format
    const newWs = keys.map((key, index) => [
      key,
      ...aoa.slice(1).map((row) => row[index]),
    ]);
    console.log("newWs", newWs);

    // Create a new workbook
    const newWsName = "Template";
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(newWs), newWsName);

    /* simulation price */

    const withStabilization = [
      {
        temp_name: tempData1.temp_name,
        mean: meanPriceSimulation1.mean_price_ws,
        median: meanPriceSimulation1.median_price_ws,
        deviation: meanPriceSimulation1.std_price_ws,
        interval:
          meanPriceSimulation1.inter_10_price_ws +
          "-" +
          meanPriceSimulation1.inter_90_price_ns,
      },
      {
        temp_name: tempData2.temp_name,
        mean: meanPriceSimulation2.mean_price_ws,
        median: meanPriceSimulation1.median_price_ws,
        deviation: meanPriceSimulation1.std_price_ws,
        interval:
          meanPriceSimulation1.inter_10_price_ws +
          "-" +
          meanPriceSimulation1.inter_90_price_ns,
      },
      {
        temp_name: tempData3.temp_name,
        mean: meanPriceSimulation3.mean_price_ws,
        median: meanPriceSimulation1.median_price_ws,
        deviation: meanPriceSimulation1.std_price_ws,
        interval:
          meanPriceSimulation1.inter_10_price_ws +
          "-" +
          meanPriceSimulation1.inter_90_price_ns,
      },
    ];

    const withoutStabilization = [
      {
        temp_name: tempData1.temp_name,
        mean: meanPriceSimulation1.mean_price_ns,
        median: meanPriceSimulation1.median_price_ns,
        deviation: meanPriceSimulation1.std_price_ns,
        interval:
          meanPriceSimulation1.inter_10_price_ns +
          "-" +
          meanPriceSimulation1.inter_90_price_ns,
      },
      {
        temp_name: tempData2.temp_name,
        mean: meanPriceSimulation2.mean_price_ns,
        median: meanPriceSimulation1.median_price_ns,
        deviation: meanPriceSimulation1.std_price_ns,
        interval:
          meanPriceSimulation1.inter_10_price_ns +
          "-" +
          meanPriceSimulation1.inter_90_price_ns,
      },
      {
        temp_name: tempData3.temp_name,
        mean: meanPriceSimulation3.mean_price_ns,
        median: meanPriceSimulation1.median_price_ns,
        deviation: meanPriceSimulation1.std_price_ns,
        interval:
          meanPriceSimulation1.inter_10_price_ns +
          "-" +
          meanPriceSimulation1.inter_90_price_ns,
      },
    ];

    // Create combined array with headers
    const combinedData = [
      [
        "",
        "With Stabilization",
        "",
        "",
        "",
        "",
        "",
        "",
        "Without Stabilization",
        "",
        "",
      ],
      [
        "Template Name",
        "Mean",
        "Median",
        "Standard deviation",
        "10%-90% interval",
        "",
        "",
        "",
        "Template Name",
        "Mean",
        "Median",
        "Standard deviation",
        "10%-90% interval",
      ],
    ];

    // Merge both datasets
    for (let i = 0; i < withStabilization.length; i++) {
      const withStabilizationItem = withStabilization[i];
      const withoutStabilizationItem = withoutStabilization[i];
      console.log(
        "withStabilizationItem",
        withStabilizationItem,
        "withoutStabilizationItem",
        withoutStabilizationItem
      );
      combinedData.push([
        withStabilizationItem.temp_name,
        withStabilizationItem.mean.toString(),
        withStabilizationItem.median.toString(),
        withStabilizationItem.deviation.toString(),
        withStabilizationItem.interval.toString(),
        "",
        "",
        "",
        withoutStabilizationItem.temp_name.toString(),
        withoutStabilizationItem.mean.toString(),
        withoutStabilizationItem.median.toString(),
        withoutStabilizationItem.deviation.toString(),
        withoutStabilizationItem.interval.toString(),
      ]);
      console.log(combinedData);
    }

    // Create a new worksheet with the desired format
    const newWsData = XLSX.utils.aoa_to_sheet(combinedData);

    // Create a new workbook
    const wsName = "Price";

    XLSX.utils.book_append_sheet(wb, newWsData, wsName);

    /* quantity */

    const withStabilizationQuantity = [
      {
        temp_name: tempData1.temp_name,
        mean: meanQuantitySimulation1.mean_quant_ws,
        median: meanQuantitySimulation1.median_quant_ws,
        deviation: meanQuantitySimulation1.std_quant_ws,
        interval:
          meanQuantitySimulation1.inter_10_quant_ws +
          "-" +
          meanQuantitySimulation1.inter_90_quant_ws,
      },
      {
        temp_name: tempData2.temp_name,
        mean: meanQuantitySimulation2.mean_quant_ws,
        median: meanQuantitySimulation2.median_quant_ws,
        deviation: meanQuantitySimulation2.std_quant_ws,
        interval:
          meanQuantitySimulation2.inter_10_quant_ws +
          "-" +
          meanQuantitySimulation2.inter_90_quant_ws,
      },
      {
        temp_name: tempData3.temp_name,
        mean: meanQuantitySimulation3.mean_quant_ws,
        median: meanQuantitySimulation3.median_quant_ws,
        deviation: meanQuantitySimulation3.std_quant_ws,
        interval:
          meanQuantitySimulation3.inter_10_quant_ws +
          "-" +
          meanQuantitySimulation3.inter_90_quant_ws,
      },
    ];

    const withoutStabilizationQuantity = [
      {
        temp_name: tempData1.temp_name,
        mean: meanQuantitySimulation1.mean_quant_ns,
        median: meanQuantitySimulation1.median_quant_ns,
        deviation: meanQuantitySimulation1.std_quant_ns,
        interval:
          meanQuantitySimulation1.inter_10_quant_ns +
          "-" +
          meanQuantitySimulation1.inter_90_quant_ns,
      },
      {
        temp_name: tempData2.temp_name,
        mean: meanQuantitySimulation2.mean_quant_ns,
        median: meanQuantitySimulation2.median_quant_ns,
        deviation: meanQuantitySimulation2.std_quant_ns,
        interval:
          meanQuantitySimulation2.inter_10_quant_ns +
          "-" +
          meanQuantitySimulation2.inter_90_quant_ns,
      },
      {
        temp_name: tempData3.temp_name,
        mean: meanQuantitySimulation3.mean_quant_ns,
        median: meanQuantitySimulation3.median_quant_ns,
        deviation: meanQuantitySimulation3.std_quant_ns,
        interval:
          meanQuantitySimulation3.inter_10_quant_ns +
          "-" +
          meanQuantitySimulation3.inter_90_quant_ns,
      },
    ];

    // Create combined array with headers
    const combinedDataQuantity = [
      [
        "",
        "With Stabilization",
        "",
        "",
        "",
        "",
        "",
        "",
        "Without Stabilization",
        "",
        "",
      ],
      [
        "Template Name",
        "Mean",
        "Median",
        "Standard deviation",
        "10%-90% interval",
        "",
        "",
        "",
        "Template Name",
        "Mean",
        "Median",
        "Standard deviation",
        "10%-90% interval",
      ],
    ];

    // Merge both datasets
    for (let i = 0; i < withStabilizationQuantity.length; i++) {
      const withStabilizationItem = withStabilizationQuantity[i];
      const withoutStabilizationItem = withoutStabilizationQuantity[i];
      console.log(
        "withStabilizationItemQt",
        withStabilizationItem,
        "withoutStabilizationItemQt",
        withoutStabilizationItem
      );
      combinedDataQuantity.push([
        withStabilizationItem.temp_name,
        withStabilizationItem.mean.toString(),
        withStabilizationItem.median.toString(),
        withStabilizationItem.deviation.toString(),
        withStabilizationItem.interval.toString(),
        "",
        "",
        "",
        withoutStabilizationItem.temp_name.toString(),
        withoutStabilizationItem.mean.toString(),
        withoutStabilizationItem.median.toString(),
        withoutStabilizationItem.deviation.toString(),
        withoutStabilizationItem.interval.toString(),
      ]);
      console.log(combinedDataQuantity);
    }

    // Create a new worksheet with the desired format
    const newWsQuantityData = XLSX.utils.aoa_to_sheet(combinedDataQuantity);

    // Create a new workbook
    const wsNameQuantity = "Quanity";

    XLSX.utils.book_append_sheet(wb, newWsQuantityData, wsNameQuantity);

    /* volume */

    const withStabilizationVolume = [
      {
        temp_name: tempData1.temp_name,
        mean: meanVolumeSimulation1.mean_amt_ws,
        median: meanVolumeSimulation1.median_amt_ws,
        deviation: meanVolumeSimulation1.std_amt_ws,
        interval:
          meanVolumeSimulation1.inter_10_amt_ws +
          "-" +
          meanVolumeSimulation1.inter_90_amt_ws,
      },
      {
        temp_name: tempData2.temp_name,
        mean: meanVolumeSimulation2.mean_amt_ws,
        median: meanVolumeSimulation2.median_amt_ws,
        deviation: meanVolumeSimulation2.std_amt_ws,
        interval:
          meanVolumeSimulation2.inter_10_amt_ws +
          "-" +
          meanVolumeSimulation2.inter_90_amt_ws,
      },
      {
        temp_name: tempData3.temp_name,
        mean: meanVolumeSimulation3.mean_amt_ws,
        median: meanVolumeSimulation3.median_amt_ws,
        deviation: meanVolumeSimulation3.std_amt_ws,
        interval:
          meanVolumeSimulation3.inter_10_amt_ws +
          "-" +
          meanVolumeSimulation3.inter_90_amt_ws,
      },
    ];

    const withoutStabilizationVolume = [
      {
        temp_name: tempData1.temp_name,
        mean: meanVolumeSimulation1.mean_amt_ns,
        median: meanVolumeSimulation1.median_amt_ns,
        deviation: meanVolumeSimulation1.std_amt_ns,
        interval:
          meanVolumeSimulation1.inter_10_amt_ns +
          "-" +
          meanVolumeSimulation1.inter_90_amt_ns,
      },
      {
        temp_name: tempData2.temp_name,
        mean: meanVolumeSimulation2.mean_amt_ns,
        median: meanVolumeSimulation2.median_amt_ns,
        deviation: meanVolumeSimulation2.std_amt_ns,
        interval:
          meanVolumeSimulation2.inter_10_amt_ns +
          "-" +
          meanVolumeSimulation2.inter_90_amt_ns,
      },
      {
        temp_name: tempData3.temp_name,
        mean: meanVolumeSimulation3.mean_amt_ns,
        median: meanVolumeSimulation3.median_amt_ns,
        deviation: meanVolumeSimulation3.std_amt_ns,
        interval:
          meanVolumeSimulation3.inter_10_amt_ns +
          "-" +
          meanVolumeSimulation3.inter_90_amt_ns,
      },
    ];

    // Create combined array with headers
    const combinedDataVolume = [
      [
        "",
        "With Stabilization",
        "",
        "",
        "",
        "",
        "",
        "",
        "Without Stabilization",
        "",
        "",
      ],
      [
        "Template Name",
        "Mean",
        "Median",
        "Standard deviation",
        "10%-90% interval",
        "",
        "",
        "",
        "Template Name",
        "Mean",
        "Median",
        "Standard deviation",
        "10%-90% interval",
      ],
    ];

    // Merge both datasets
    for (let i = 0; i < withStabilizationVolume.length; i++) {
      const withStabilizationItem = withStabilizationVolume[i];
      const withoutStabilizationItem = withoutStabilizationVolume[i];
      console.log(
        "withStabilizationItemQt",
        withStabilizationItem,
        "withoutStabilizationItemQt",
        withoutStabilizationItem
      );
      combinedDataVolume.push([
        withStabilizationItem.temp_name,
        withStabilizationItem.mean.toString(),
        withStabilizationItem.median.toString(),
        withStabilizationItem.deviation.toString(),
        withStabilizationItem.interval.toString(),
        "",
        "",
        "",
        withoutStabilizationItem.temp_name.toString(),
        withoutStabilizationItem.mean.toString(),
        withoutStabilizationItem.median.toString(),
        withoutStabilizationItem.deviation.toString(),
        withoutStabilizationItem.interval.toString(),
      ]);
      console.log(combinedDataVolume);
    }

    // Create a new worksheet with the desired format
    const newWsVolumeData = XLSX.utils.aoa_to_sheet(combinedDataVolume);

    // Create a new workbook
    const wsNameVolume = "Volume";

    XLSX.utils.book_append_sheet(wb, newWsVolumeData, wsNameVolume);

    /* Stablization Fund */

    const withStabilizationCash = [
      {
        temp_name: tempData1.temp_name,
        mean: StablizationFundData1.mean_cash_stab,
        median: StablizationFundData1.median_cash_stab,
        deviation: StablizationFundData1.std_cash_stab,
        interval:
          StablizationFundData1.inter_10_cash_stab +
          "-" +
          StablizationFundData1.inter_90_cash_stab,
      },
      {
        temp_name: tempData2.temp_name,
        mean: StablizationFundData2.mean_cash_stab,
        median: StablizationFundData2.median_cash_stab,
        deviation: StablizationFundData2.std_cash_stab,
        interval:
          StablizationFundData2.inter_10_cash_stab +
          "-" +
          StablizationFundData2.inter_90_cash_stab,
      },
      {
        temp_name: tempData3.temp_name,
        mean: StablizationFundData3.mean_cash_stab,
        median: StablizationFundData3.median_cash_stab,
        deviation: StablizationFundData3.inter_10_cash_stab,
        interval:
          StablizationFundData3.inter_10_cash_stab +
          "-" +
          StablizationFundData3.inter_90_cash_stab,
      },
    ];

    const withStabilizationAssetQuantity = [
      {
        temp_name: tempData1.temp_name,
        mean: StablizationFundData1.mean_asset_stab,
        median: StablizationFundData1.median_asset_stab,
        deviation: StablizationFundData1.std_asset_stab,
        interval:
          StablizationFundData1.inter_10_asset_stab +
          "-" +
          StablizationFundData1.inter_90_asset_stab,
      },
      {
        temp_name: tempData2.temp_name,
        mean: StablizationFundData2.mean_asset_stab,
        median: StablizationFundData2.median_asset_stab,
        deviation: StablizationFundData2.std_asset_stab,
        interval:
          StablizationFundData2.inter_10_asset_stab +
          "-" +
          StablizationFundData2.inter_90_asset_stab,
      },
      {
        temp_name: tempData3.temp_name,
        mean: StablizationFundData3.mean_asset_stab,
        median: StablizationFundData3.median_asset_stab,
        deviation: StablizationFundData3.std_asset_stab,
        interval:
          StablizationFundData3.inter_10_asset_stab +
          "-" +
          StablizationFundData3.inter_90_asset_stab,
      },
    ];

    const withStabilizationTotalAssets = [
      {
        temp_name: tempData1.temp_name,
        mean: StablizationFundData1.mean_total_stab,
        median: StablizationFundData1.median_total_stab,
        deviation: StablizationFundData1.std_total_stab,
        interval:
          StablizationFundData1.inter_10_total_stab +
          "-" +
          StablizationFundData1.inter_90_total_stab,
      },
      {
        temp_name: tempData2.temp_name,
        mean: StablizationFundData2.mean_total_stab,
        median: StablizationFundData2.median_total_stab,
        deviation: StablizationFundData2.std_total_stab,
        interval:
          StablizationFundData2.inter_10_total_stab +
          "-" +
          StablizationFundData2.inter_90_total_stab,
      },
      {
        temp_name: tempData3.temp_name,
        mean: StablizationFundData3.mean_total_stab,
        median: StablizationFundData3.median_total_stab,
        deviation: StablizationFundData3.std_total_stab,
        interval:
          StablizationFundData3.inter_10_total_stab +
          "-" +
          StablizationFundData3.inter_90_total_stab,
      },
    ];

    const withStabilizationAssetTotalVAssets = [
      {
        temp_name: tempData1.temp_name,
        mean: StablizationFundData1.mean_total_v_stab,
        median: StablizationFundData1.median_total_v_stab,
        deviation: StablizationFundData1.std_total_v_stab,
        interval:
          StablizationFundData1.inter_10_total_v_stab +
          "-" +
          StablizationFundData1.inter_10_total_v_stab,
      },
      {
        temp_name: tempData2.temp_name,
        mean: StablizationFundData2.mean_total_v_stab,
        median: StablizationFundData2.median_total_v_stab,
        deviation: StablizationFundData2.std_total_v_stab,
        interval:
          StablizationFundData2.inter_10_total_v_stab +
          "-" +
          StablizationFundData2.inter_10_total_v_stab,
      },
      {
        temp_name: tempData3.temp_name,
        mean: StablizationFundData3.mean_total_v_stab,
        median: StablizationFundData3.median_total_v_stab,
        deviation: StablizationFundData3.std_total_v_stab,
        interval:
          StablizationFundData3.inter_10_total_v_stab +
          "-" +
          StablizationFundData3.inter_10_total_v_stab,
      },
    ];

    // Create combined array with headers
    const combinedStablization = [
      [
        "",
        "Cash",
        "",
        "",
        "",
        "",
        "",
        "Assets(Quantity)",
        "",
        "",
        "",
        "",
        "",
        "Total Assets ($)",
        "",
        "",
        "",
        "",
        "",
        "TotalAssets/v",
      ],
      [
        "Template Name",
        "Mean",
        "Median",
        "Standard deviation",
        "10%-90% interval",
        "",
        ,
        "Template Name",
        "Mean",
        "Median",
        "Standard deviation",
        "10%-90% interval",
        "",
        "Template Name",
        "Mean",
        "Median",
        "Standard deviation",
        "10%-90% interval",
        "",
        "Template Name",
        "Mean",
        "Median",
        "Standard deviation",
        "10%-90% interval",
      ],
    ];

    // Merge both datasets
    for (let i = 0; i < withStabilizationCash.length; i++) {
      const withStabilizationCashItem = withStabilizationCash[i];
      const withStabilizationAssetItem = withStabilizationAssetQuantity[i];

      const withStabilizationtotalassetItem = withStabilizationTotalAssets[i];
      const withStabilizationtotalassetVItem =
        withStabilizationAssetTotalVAssets[i];

      combinedStablization.push([
        withStabilizationCashItem.temp_name,
        withStabilizationCashItem.mean.toString(),
        withStabilizationCashItem.median.toString(),
        withStabilizationCashItem.deviation.toString(),
        withStabilizationCashItem.interval.toString(),
        "",
        "",
        withStabilizationAssetItem.temp_name.toString(),
        withStabilizationAssetItem.mean.toString(),
        withStabilizationAssetItem.median.toString(),
        withStabilizationAssetItem.deviation.toString(),
        withStabilizationAssetItem.interval.toString(),
        "",
        withStabilizationtotalassetItem.temp_name.toString(),
        withStabilizationtotalassetItem.mean.toString(),
        withStabilizationtotalassetItem.median.toString(),
        withStabilizationtotalassetItem.deviation.toString(),
        withStabilizationtotalassetItem.interval.toString(),
        "",
        withStabilizationtotalassetVItem.temp_name.toString(),
        withStabilizationtotalassetVItem.mean.toString(),
        withStabilizationtotalassetVItem.median.toString(),
        withStabilizationtotalassetVItem.deviation.toString(),
        withStabilizationtotalassetVItem.interval.toString(),
      ]);
      console.log(combinedDataVolume);
    }

    // Create a new worksheet with the desired format
    const newStablization = XLSX.utils.aoa_to_sheet(combinedStablization);

    // Create a new workbook
    const wsstablization = "Stablization Fund";

    XLSX.utils.book_append_sheet(wb, newStablization, wsstablization);

    /* Stablization Fund */

    // Save the workbook to a file
    XLSX.writeFile(wb, "CompareTemplates.xlsx");
  };

  return (
    <AppLayout>
      <div className="container-fluid">
        <div className="template simulation-info compare">
          <div className="template-header">
            <div className="back-option" onClick={() => handleBack()}>
              <img
                src="imgs/left-arrow.svg"
                alt=""
                width={27.443}
                height={25.767}
              />
              <p className="mb-0">Back</p>
            </div>
            <div className="main-header">
              <h1>Template Details</h1>
            </div>
            <div className="right-head">
              {/* <div className="format"> */}
              <p>Download Template Details :</p>
              <div className="file-type">
                <Button>
                  <a
                    /* href="/comparepdf" */ onClick={() => handleDownloadPDF()}
                  >
                    <img src="imgs/download-white.svg" alt="" />
                    PDF
                  </a>
                </Button>
                <Button onClick={() => handleDownloadExcel()}>
                  <img src="imgs/download-white.svg" alt="" />
                  EXCEL
                </Button>
              </div>
              {/* </div> */}
            </div>
          </div>

          <div className="template-details">
            <div className="table-responsive">
              <div className="template-content">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="emptycell"></th>
                      <th>{tempData1.temp_name}</th>
                      <th>{tempData2.temp_name}</th>
                      <th>{tempData3.temp_name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="emptycell">Created on</th>
                      <td>
                        {" "}
                        {moment(tempData1.created_timestamp).format(
                          "MM/DD/YYYY h:mm:ss A"
                        )}
                      </td>
                      <td>
                        {" "}
                        {moment(tempData2.created_timestamp).format(
                          "MM/DD/YYYY h:mm:ss A"
                        )}
                      </td>
                      <td>
                        {" "}
                        {moment(tempData3.created_timestamp).format(
                          "MM/DD/YYYY h:mm:ss A"
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th className="emptycell">Scenario Type</th>
                      <td>{tempData1.scenario_name}</td>
                      <td>{tempData2.scenario_name}</td>
                      <td>{tempData3.scenario_name}</td>
                    </tr>
                    <tr>
                      <th className="emptycell">Initial Market Price</th>
                      <td>{tempData1.initial_mkt_price}</td>
                      <td>{tempData2.initial_mkt_price}</td>
                      <td>{tempData3.initial_mkt_price}</td>
                    </tr>
                    <tr>
                      <th className="emptycell">Price Variance Limit</th>
                      <td>{tempData1.price_var}</td>
                      <td>{tempData2.price_var}</td>
                      <td>{tempData3.price_var}</td>
                    </tr>
                    <tr>
                      <th className="emptycell">Base Quantity</th>
                      <td>{tempData1.base_quant}</td>
                      <td>{tempData2.base_quant}</td>
                      <td>{tempData3.base_quant}</td>
                    </tr>
                    <tr>
                      <th className="emptycell">Quantity Variance Limit</th>
                      <td>{tempData1.quant_var}</td>
                      <td>{tempData2.quant_var}</td>
                      <td>{tempData3.quant_var}</td>
                    </tr>
                    <tr>
                      <th className="emptycell">Limit Order Upper Bound</th>
                      <td>{tempData1.limit_order_upper_bound}</td>
                      <td>{tempData2.limit_order_upper_bound}</td>
                      <td>{tempData3.limit_order_upper_bound}</td>
                    </tr>
                    <tr>
                      <th className="emptycell">Limit Order Lower Bound</th>
                      <td>{tempData1.limit_order_lower_bound}</td>
                      <td>{tempData2.limit_order_lower_bound}</td>
                      <td>{tempData3.limit_order_lower_bound}</td>
                    </tr>
                    <tr>
                      <th className="emptycell">Alpha 0</th>
                      <td>{tempData1.alpha0}</td>
                      <td>{tempData2.alpha0}</td>
                      <td>{tempData3.alpha0}</td>
                    </tr>
                    <tr>
                      <th className="emptycell">Alpha 1</th>
                      <td>{tempData1.alpha1}</td>
                      <td>{tempData2.alpha1}</td>
                      <td>{tempData3.alpha1}</td>
                    </tr>
                    <tr>
                      <th className="emptycell">Theta 0</th>
                      <td>{tempData1.theta0}</td>
                      <td>{tempData2.theta0}</td>
                      <td>{tempData3.theta0}</td>
                    </tr>
                    <tr>
                      <th className="emptycell">Theta 1</th>
                      <td>{tempData1.theta1}</td>
                      <td>{tempData2.theta1}</td>
                      <td>{tempData3.theta1}</td>
                    </tr>
                    <tr>
                      <th className="emptycell">Distribution</th>
                      <td>{tempData1.distribution}</td>
                      <td>{tempData2.distribution}</td>
                      <td>{tempData3.distribution}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* pdf */}

        <div>
          <div style={{ position: "absolute", left: "-6400px", top: 0 }}>
            <PDFExport
              paperSize="A2"
              margin="1cm"
              fileName={"comparetemplates.pdf"}
              ref={pdfExportComponent}
            >
              <div>
                <div className="container-fluid pdf report compared mt-2">
                  <div className="header">
                    <div className="left-head">
                      <img
                        src="/imgs/isdb-logo-signin.svg"
                        className="isDB-logo"
                        alt=""
                      />
                    </div>
                    <div className="right-head">
                      <div className="pdf-title">COMPARE RESULT REPORT</div>
                      <div className="pdf info">
                        <div className="pdf-time">
                          <label htmlFor="">
                            Report Downloaded Date & Time{" "}
                          </label>
                          <span>
                            {" "}
                            {/*  {moment(viewData.created_timestamp).format(
                      "MM/DD/YYYY h:mm:ss A"
                    )} */}
                          </span>
                        </div>
                        <div className="pdf-time"></div>
                        <div className="type"></div>
                      </div>
                    </div>
                  </div>
                  <div className="pdf-section">
                    <div className="pdf-name">
                      {tempData1.temp_name} , {tempData2.temp_name},{" "}
                      {tempData3.temp_name}
                    </div>
                    <div className="pdf-data">
                      <div className="simulation-data mb-4">
                        <div className="data-header">
                          <h1>Simulation Result</h1>
                        </div>
                        <div className="alltable">
                          <div className="price-table">
                            <div className="main-title">
                              <h3>PRICE</h3>
                            </div>
                            <div className="alltable">
                              <div className="simulation-table with">
                                <div className="title">
                                  <h4>With Stabilization</h4>
                                </div>
                                <div className="table-responsive">
                                  <div className="template-content">
                                    <table className="table">
                                      <thead>
                                        <tr>
                                          <th className="emptycell"></th>
                                          <th>{tempData1.temp_name}</th>
                                          <th>{tempData2.temp_name}</th>
                                          <th>{tempData3.temp_name}</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <th className="emptycell">Mean</th>
                                          <td>
                                            {meanPriceSimulation1.mean_price_ws}
                                          </td>
                                          <td>
                                            {meanPriceSimulation2.mean_price_ws}
                                          </td>
                                          <td>
                                            {meanPriceSimulation3.mean_price_ws}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="emptycell">Median</th>
                                          <td>
                                            {
                                              meanPriceSimulation1.median_price_ws
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanPriceSimulation2.median_price_ws
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanPriceSimulation3.median_price_ws
                                            }
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="emptycell">
                                            Standard deviation
                                          </th>
                                          <td>
                                            {meanPriceSimulation1.std_price_ws}
                                          </td>
                                          <td>
                                            {meanPriceSimulation2.std_price_ws}
                                          </td>
                                          <td>
                                            {meanPriceSimulation3.std_price_ws}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="emptycell">
                                            10% - 90% interval
                                          </th>
                                          <td>
                                            {
                                              meanPriceSimulation1.inter_10_price_ws
                                            }
                                            -
                                            {
                                              meanPriceSimulation1.inter_90_price_ws
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanPriceSimulation2.inter_10_price_ws
                                            }
                                            -
                                            {
                                              meanPriceSimulation2.inter_90_price_ws
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanPriceSimulation3.inter_10_price_ws
                                            }
                                            -
                                            {
                                              meanPriceSimulation3.inter_90_price_ws
                                            }
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>{" "}
                                </div>
                              </div>
                              <div className="simulation-table without-s">
                                <div className="title">
                                  <h4>Without Stabilization</h4>
                                </div>
                                <div className="table-responsive">
                                  <div className="template-content">
                                    <table className="table">
                                      <thead>
                                        <tr>
                                          <th className="emptycell"></th>
                                          <th>{tempData1.temp_name}</th>
                                          <th>{tempData2.temp_name}</th>
                                          <th>{tempData3.temp_name}</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <th className="emptycell">Mean</th>
                                          <td>
                                            {meanPriceSimulation1.mean_price_ns}
                                          </td>
                                          <td>
                                            {meanPriceSimulation2.mean_price_ns}
                                          </td>
                                          <td>
                                            {meanPriceSimulation3.mean_price_ns}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="emptycell">Median</th>
                                          <td>
                                            {
                                              meanPriceSimulation1.median_price_ns
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanPriceSimulation2.median_price_ns
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanPriceSimulation3.median_price_ns
                                            }
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="emptycell">
                                            Standard deviation
                                          </th>
                                          <td>
                                            {meanPriceSimulation1.std_price_ns}
                                          </td>
                                          <td>
                                            {meanPriceSimulation2.std_price_ns}
                                          </td>
                                          <td>
                                            {meanPriceSimulation3.std_price_ns}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="emptycell">
                                            10% - 90% interval
                                          </th>
                                          <td>
                                            {
                                              meanPriceSimulation1.inter_10_price_ns
                                            }
                                            -
                                            {
                                              meanPriceSimulation1.inter_90_price_ns
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanPriceSimulation2.inter_10_price_ns
                                            }
                                            -
                                            {
                                              meanPriceSimulation2.inter_90_price_ns
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanPriceSimulation3.inter_10_price_ns
                                            }
                                            -
                                            {
                                              meanPriceSimulation3.inter_90_price_ns
                                            }
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="price-table">
                            <div className="main-title">
                              <h3>VOLUME</h3>
                            </div>
                            <div className="alltable">
                              <div className="simulation-table with">
                                <div className="title">
                                  <h4>With Stabilization</h4>
                                </div>
                                <div className="table-responsive">
                                  <div className="template-content">
                                    <table className="table">
                                      <thead>
                                        <tr>
                                          <th className="emptycell"></th>
                                          <th>{tempData1.temp_name}</th>
                                          <th>{tempData2.temp_name}</th>
                                          <th>{tempData3.temp_name}</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <th className="emptycell">Mean</th>
                                          <td>
                                            {meanVolumeSimulation1.mean_amt_ws}
                                          </td>
                                          <td>
                                            {meanVolumeSimulation2.mean_amt_ws}
                                          </td>
                                          <td>
                                            {meanVolumeSimulation3.mean_amt_ws}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="emptycell">Median</th>
                                          <td>
                                            {
                                              meanVolumeSimulation1.median_amt_ws
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanVolumeSimulation2.median_amt_ws
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanVolumeSimulation3.median_amt_ws
                                            }
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="emptycell">
                                            Standard deviation
                                          </th>
                                          <td>
                                            {meanVolumeSimulation1.std_amt_ws}
                                          </td>
                                          <td>
                                            {meanVolumeSimulation2.std_amt_ws}
                                          </td>
                                          <td>
                                            {meanVolumeSimulation3.std_amt_ws}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="emptycell">
                                            10% - 90% interval
                                          </th>
                                          <td>
                                            {
                                              meanVolumeSimulation1.inter_10_amt_ws
                                            }
                                            -
                                            {
                                              meanVolumeSimulation1.inter_90_amt_ws
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanVolumeSimulation2.inter_10_amt_ws
                                            }
                                            -
                                            {
                                              meanVolumeSimulation2.inter_90_amt_ws
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanVolumeSimulation3.inter_10_amt_ws
                                            }
                                            -
                                            {
                                              meanVolumeSimulation3.inter_90_amt_ws
                                            }
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>{" "}
                                </div>
                              </div>
                              <div className="simulation-table without-s">
                                <div className="title">
                                  <h4>Without Stabilization</h4>
                                </div>
                                <div className="table-responsive">
                                  <div className="template-content">
                                    <table className="table">
                                      <thead>
                                        <tr>
                                          <th className="emptycell"></th>
                                          <th>{tempData1.temp_name}</th>
                                          <th>{tempData2.temp_name}</th>
                                          <th>{tempData3.temp_name}</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <th className="emptycell">Mean</th>
                                          <td>
                                            {meanVolumeSimulation1.mean_amt_ns}
                                          </td>
                                          <td>
                                            {meanVolumeSimulation2.mean_amt_ns}
                                          </td>
                                          <td>
                                            {meanVolumeSimulation3.mean_amt_ns}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="emptycell">Median</th>
                                          <td>
                                            {
                                              meanVolumeSimulation1.median_amt_ns
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanVolumeSimulation2.median_amt_ns
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanVolumeSimulation3.median_amt_ns
                                            }
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="emptycell">
                                            Standard deviation
                                          </th>
                                          <td>
                                            {meanVolumeSimulation1.std_amt_ns}
                                          </td>
                                          <td>
                                            {meanVolumeSimulation2.std_amt_ns}
                                          </td>
                                          <td>
                                            {meanVolumeSimulation3.std_amt_ns}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="emptycell">
                                            10% - 90% interval
                                          </th>
                                          <td>
                                            {
                                              meanVolumeSimulation1.inter_10_amt_ns
                                            }
                                            -
                                            {
                                              meanVolumeSimulation1.inter_90_amt_ns
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanVolumeSimulation2.inter_10_amt_ns
                                            }
                                            -
                                            {
                                              meanVolumeSimulation2.inter_90_amt_ns
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanVolumeSimulation3.inter_10_amt_ns
                                            }
                                            -
                                            {
                                              meanVolumeSimulation3.inter_90_amt_ns
                                            }
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="price-table">
                            <div className="main-title">
                              <h3>QUANTITY</h3>
                            </div>
                            <div className="alltable">
                              <div className="simulation-table with">
                                <div className="title">
                                  <h4>With Stabilization</h4>
                                </div>
                                <div className="table-responsive">
                                  <div className="template-content">
                                    <table className="table">
                                      <thead>
                                        <tr>
                                          <th className="emptycell"></th>
                                          <th>{tempData1.temp_name}</th>
                                          <th>{tempData2.temp_name}</th>
                                          <th>{tempData3.temp_name}</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <th className="emptycell">Mean</th>
                                          <td>
                                            {
                                              meanQuantitySimulation1.mean_quant_ws
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanQuantitySimulation2.mean_quant_ws
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanQuantitySimulation3.mean_quant_ws
                                            }
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="emptycell">Median</th>
                                          <td>
                                            {
                                              meanQuantitySimulation1.median_quant_ns
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanQuantitySimulation2.median_quant_ns
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanQuantitySimulation3.median_quant_ns
                                            }
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="emptycell">
                                            Standard deviation
                                          </th>
                                          <td>
                                            {
                                              meanQuantitySimulation1.std_quant_ws
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanQuantitySimulation2.std_quant_ws
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanQuantitySimulation3.std_quant_ws
                                            }
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="emptycell">
                                            10% - 90% interval
                                          </th>
                                          <td>
                                            {
                                              meanQuantitySimulation1.inter_10_quant_ws
                                            }
                                            -
                                            {
                                              meanQuantitySimulation1.inter_90_quant_ws
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanQuantitySimulation2.inter_10_quant_ws
                                            }
                                            -
                                            {
                                              meanQuantitySimulation2.inter_90_quant_ws
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanQuantitySimulation3.inter_10_quant_ws
                                            }
                                            -
                                            {
                                              meanQuantitySimulation3.inter_90_quant_ws
                                            }
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>{" "}
                                </div>
                              </div>
                              <div className="simulation-table without-s">
                                <div className="title">
                                  <h4>Without Stabilization</h4>
                                </div>
                                <div className="table-responsive">
                                  <div className="template-content">
                                    <table className="table">
                                      <thead>
                                        <tr>
                                          <th className="emptycell"></th>
                                          <th>{tempData1.temp_name}</th>
                                          <th>{tempData2.temp_name}</th>
                                          <th>{tempData3.temp_name}</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <th className="emptycell">Mean</th>
                                          <td>
                                            {
                                              meanQuantitySimulation1.mean_quant_ns
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanQuantitySimulation2.mean_quant_ns
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanQuantitySimulation3.mean_quant_ns
                                            }
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="emptycell">Median</th>
                                          <td>
                                            {
                                              meanQuantitySimulation1.median_quant_ns
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanQuantitySimulation2.median_quant_ns
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanQuantitySimulation3.median_quant_ns
                                            }
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="emptycell">
                                            Standard deviation
                                          </th>
                                          <td>
                                            {
                                              meanQuantitySimulation1.std_quant_ns
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanQuantitySimulation2.std_quant_ns
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanQuantitySimulation3.std_quant_ns
                                            }
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="emptycell">
                                            10% - 90% interval
                                          </th>
                                          <td>
                                            {
                                              meanQuantitySimulation1.inter_10_quant_ns
                                            }
                                            -
                                            {
                                              meanQuantitySimulation1.inter_90_quant_ns
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanQuantitySimulation2.inter_10_quant_ns
                                            }
                                            -
                                            {
                                              meanQuantitySimulation2.inter_90_quant_ns
                                            }
                                          </td>
                                          <td>
                                            {
                                              meanQuantitySimulation3.inter_10_quant_ns
                                            }
                                            -
                                            {
                                              meanQuantitySimulation3.inter_90_quant_ns
                                            }
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="stabilization-data mt-4">
                        <div className="data-header">
                          <h1> Stabilization Fund</h1>
                        </div>
                        <div className="price-table">
                          <div className="alltable">
                            <div className="simulation-table with">
                              <div className="title">
                                <h4>Cash</h4>
                              </div>
                              <div className="table-responsive">
                                <div className="template-content">
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <th className="emptycell"></th>
                                        <th>{tempData1.temp_name}</th>
                                        <th>{tempData2.temp_name}</th>
                                        <th>{tempData3.temp_name}</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <th className="emptycell">Mean</th>
                                        <td>
                                          {StablizationFundData1.mean_cash_stab}
                                        </td>
                                        <td>
                                          {StablizationFundData1.mean_cash_stab}
                                        </td>
                                        <td>
                                          {StablizationFundData2.mean_cash_stab}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="emptycell">Median</th>
                                        <td>
                                          {
                                            StablizationFundData1.median_cash_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData1.median_cash_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData2.median_cash_stab
                                          }
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="emptycell">
                                          Standard deviation
                                        </th>
                                        <td>
                                          {StablizationFundData1.std_cash_stab}
                                        </td>
                                        <td>
                                          {StablizationFundData1.std_cash_stab}
                                        </td>
                                        <td>
                                          {StablizationFundData2.std_cash_stab}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="emptycell">
                                          10% - 90% interval
                                        </th>
                                        <td>
                                          {
                                            StablizationFundData1.inter_10_cash_stab
                                          }
                                          -
                                          {
                                            StablizationFundData1.inter_90_cash_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData1.inter_10_cash_stab
                                          }
                                          -
                                          {
                                            StablizationFundData2.inter_90_cash_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData2.inter_10_cash_stab
                                          }
                                          -
                                          {
                                            StablizationFundData3.inter_90_cash_stab
                                          }
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>{" "}
                              </div>
                            </div>
                            <div className="simulation-table without-s">
                              <div className="title">
                                <h4>Asset (Quantity) </h4>
                              </div>
                              <div className="table-responsive">
                                <div className="template-content">
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <th className="emptycell"></th>
                                        <th>{tempData1.temp_name}</th>
                                        <th>{tempData2.temp_name}</th>
                                        <th>{tempData3.temp_name}</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <th className="emptycell">Mean</th>
                                        <td>
                                          {
                                            StablizationFundData1.mean_asset_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData1.mean_asset_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData2.mean_asset_stab
                                          }
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="emptycell">Median</th>
                                        <td>
                                          {
                                            StablizationFundData1.median_asset_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData1.median_asset_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData2.median_asset_stab
                                          }
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="emptycell">
                                          Standard deviation
                                        </th>
                                        <td>
                                          {StablizationFundData1.std_asset_stab}
                                        </td>
                                        <td>
                                          {StablizationFundData1.std_asset_stab}
                                        </td>
                                        <td>
                                          {StablizationFundData2.std_asset_stab}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="emptycell">
                                          10% - 90% interval
                                        </th>
                                        <td>
                                          {
                                            StablizationFundData1.inter_10_asset_stab
                                          }
                                          -
                                          {
                                            StablizationFundData1.inter_90_asset_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData1.inter_10_asset_stab
                                          }
                                          -
                                          {
                                            StablizationFundData2.inter_90_asset_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData2.inter_10_asset_stab
                                          }
                                          -
                                          {
                                            StablizationFundData3.inter_90_asset_stab
                                          }
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="price-table">
                          <div className="alltable">
                            <div className="simulation-table with">
                              <div className="title">
                                <h4>Total Assets ($)</h4>
                              </div>
                              <div className="table-responsive">
                                <div className="template-content">
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <th className="emptycell"></th>
                                        <th>{tempData1.temp_name}</th>
                                        <th>{tempData2.temp_name}</th>
                                        <th>{tempData3.temp_name}</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <th className="emptycell">Mean</th>
                                        <td>
                                          {
                                            StablizationFundData1.mean_total_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData1.mean_total_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData2.mean_total_stab
                                          }
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="emptycell">Median</th>
                                        <td>
                                          {
                                            StablizationFundData1.median_total_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData1.median_total_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData2.median_total_stab
                                          }
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="emptycell">
                                          Standard deviation
                                        </th>
                                        <td>
                                          {StablizationFundData1.std_total_stab}
                                        </td>
                                        <td>
                                          {StablizationFundData1.std_total_stab}
                                        </td>
                                        <td>
                                          {StablizationFundData2.std_total_stab}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="emptycell">
                                          10% - 90% interval
                                        </th>
                                        <td>
                                          {
                                            StablizationFundData1.inter_10_total_stab
                                          }
                                          -
                                          {
                                            StablizationFundData1.inter_90_total_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData1.inter_10_total_stab
                                          }
                                          -
                                          {
                                            StablizationFundData2.inter_90_total_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData2.inter_10_total_stab
                                          }
                                          -
                                          {
                                            StablizationFundData3.inter_90_total_stab
                                          }
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>{" "}
                              </div>
                            </div>
                            <div className="simulation-table without-s">
                              <div className="title">
                                <h4>Total Assets/V </h4>
                              </div>
                              <div className="table-responsive">
                                <div className="template-content">
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <th className="emptycell"></th>
                                        <th>{tempData1.temp_name}</th>
                                        <th>{tempData2.temp_name}</th>
                                        <th>{tempData3.temp_name}</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <th className="emptycell">Mean</th>
                                        <td>
                                          {
                                            StablizationFundData1.mean_total_v_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData1.mean_total_v_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData2.mean_total_v_stab
                                          }
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="emptycell">Median</th>
                                        <td>
                                          {
                                            StablizationFundData1.median_total_v_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData1.median_total_v_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData2.median_total_v_stab
                                          }
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="emptycell">
                                          Standard deviation
                                        </th>
                                        <td>
                                          {
                                            StablizationFundData1.std_total_v_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData1.std_total_v_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData2.std_total_v_stab
                                          }
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="emptycell">
                                          10% - 90% interval
                                        </th>
                                        <td>
                                          {
                                            StablizationFundData1.inter_10_total_v_stab
                                          }
                                          -
                                          {
                                            StablizationFundData1.inter_90_total_v_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData1.inter_10_total_v_stab
                                          }
                                          -
                                          {
                                            StablizationFundData2.inter_90_total_v_stab
                                          }
                                        </td>
                                        <td>
                                          {
                                            StablizationFundData2.inter_10_total_v_stab
                                          }
                                          -
                                          {
                                            StablizationFundData3.inter_90_total_v_stab
                                          }
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>{" "}
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
      </div>
    </AppLayout>
  );
}
