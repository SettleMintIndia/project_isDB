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
import * as React from 'react';
import { PDFExport } from '@progress/kendo-react-pdf'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export default function Home() {
  const router = useRouter();
  const pdfExportComponent = React.useRef<PDFExport>(null);


  const [tempname1, setTempName1] = useState(router.query.temp_name1)
  const [tempname2, setTempName2] = useState(router.query.temp_name2)
  const [tempname3, setTempName3] = useState(router.query.temp_name3)
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
  useEffect(() => {
    getTemplate1(tempname1);
    getTemplate2(tempname2);
    getTemplate3(tempname3);
  }, [tempname1, tempname2, tempname3]);

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
    setTempData1(result.templates[0])
    

  }
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
    settempData2(result.templates[0])
   
  }
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
    settempData3(result.templates[0])
    

  }
  const handleBack = () => {
    router.back();
  };
  const handleDownloadPDF = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  }

  const handleDownloadExcel = () => {
     let totalResult:any[]=[];
     totalResult.push(tempData1,tempData2,tempData3);
    console.log(totalResult)
  for(var i=0 ;i<totalResult.length ;i ++){
      const date = moment(totalResult[i].created_timestamp).format("MM/DD/YYYY h:mm:ss A")
      totalResult[i].created_timestamp=date;

    }
    console.log("formattedData",totalResult)


    const wb = XLSX.utils.book_new();

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(totalResult);

    // Convert the worksheet to an array of arrays
    const aoa = XLSX.utils.sheet_to_json(ws, { header: 1 });

    // Extract unique keys (column names)
    const keys = Array.from(new Set(aoa[0]));

    console.log("keys",keys);


    // Create a new worksheet with the desired format
    const newWs = keys.map((key, index) => [key, ...aoa.slice(1).map(row => row[index])]);
    console.log("newWs",newWs);


    // Create a new workbook
    const newWsName = 'Template';
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(newWs), newWsName);

    /* simulation price */

    const withStabilization = [
      { temp_name: 'Bubble1', mean: 12, median: 10, deviation: 19, interval: 10 },
      { temp_name: 'Bubble2', mean: 10, median: 20, deviation: 10, interval: 20 },
      { temp_name: 'Bubble3', mean: 19, median: 19, deviation: 29, interval: 20 },
    ];

    const withoutStabilization = [
      { temp_name: 'Bubble1', mean: 121, median: 101, deviation: 119, interval: 10 },
      { temp_name: 'Bubble2', mean: 110, median: 210, deviation: 110, interval: 10 },
      { temp_name: 'Bubble3', mean: 119, median: 119, deviation: 219, interval: 10 },
    ];

    // Create combined array with headers
    const combinedData = [
      ['', 'With Stabilization', '', '', '', '', '', '', 'Without Stabilization', '', ''],
      ['Template Name', 'Mean', 'Median', 'Standard deviation', '10%-90% interval', '', '', '', 'Template Name', 'Mean', 'Median', 'Standard deviation', '10%-90% interval'],
    ];



    // Merge both datasets
    for (let i = 0; i < withStabilization.length; i++) {
      const withStabilizationItem = withStabilization[i];
      const withoutStabilizationItem = withoutStabilization[i];
      console.log("withStabilizationItem", withStabilizationItem, "withoutStabilizationItem", withoutStabilizationItem)
      combinedData.push([
        withStabilizationItem.temp_name,
        withStabilizationItem.mean.toString(),
        withStabilizationItem.median.toString(),
        withStabilizationItem.deviation.toString(),
        withStabilizationItem.interval.toString(),
        '',
        '',
        '',
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
    const wsName = 'Price';

    XLSX.utils.book_append_sheet(wb, newWsData, wsName);

    /* quantity */


     const withStabilizationQuantity = [
      { temp_name: 'Bubble1', mean: 112, median: 100, deviation: 199, interval: 120 },
      { temp_name: 'Bubble2', mean: 10, median: 20, deviation: 10, interval: 20 },
      { temp_name: 'Bubble3', mean: 19, median: 19, deviation: 29, interval: 20 },
    ];

    const withoutStabilizationQuantity = [
      { temp_name: 'Bubble1', mean: 121, median: 101, deviation: 119, interval: 10 },
      { temp_name: 'Bubble2', mean: 110, median: 210, deviation: 110, interval: 10 },
      { temp_name: 'Bubble3', mean: 119, median: 119, deviation: 219, interval: 10 },
    ];

    // Create combined array with headers
    const combinedDataQuantity = [
      ['', 'With Stabilization', '', '', '', '', '', '', 'Without Stabilization', '', ''],
      ['Template Name', 'Mean', 'Median', 'Standard deviation', '10%-90% interval', '', '', '', 'Template Name', 'Mean', 'Median', 'Standard deviation', '10%-90% interval'],
    ];



    // Merge both datasets
    for (let i = 0; i < withStabilizationQuantity.length; i++) {
      const withStabilizationItem = withStabilizationQuantity[i];
      const withoutStabilizationItem = withoutStabilizationQuantity[i];
      console.log("withStabilizationItemQt", withStabilizationItem, "withoutStabilizationItemQt", withoutStabilizationItem)
      combinedDataQuantity.push([
        withStabilizationItem.temp_name,
        withStabilizationItem.mean.toString(),
        withStabilizationItem.median.toString(),
        withStabilizationItem.deviation.toString(),
        withStabilizationItem.interval.toString(),
        '',
        '',
        '',
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
    const wsNameQuantity = 'Quanity';

    XLSX.utils.book_append_sheet(wb, newWsQuantityData, wsNameQuantity);



     /* volume */


     const withStabilizationVolume = [
      { temp_name: 'Bubble1', mean: 112, median: 100, deviation: 199, interval: 120 },
      { temp_name: 'Bubble2', mean: 10, median: 20, deviation: 10, interval: 20 },
      { temp_name: 'Bubble3', mean: 19, median: 19, deviation: 29, interval: 20 },
    ];

    const withoutStabilizationVolume = [
      { temp_name: 'Bubble1', mean: 121, median: 101, deviation: 119, interval: 10 },
      { temp_name: 'Bubble2', mean: 110, median: 210, deviation: 110, interval: 10 },
      { temp_name: 'Bubble3', mean: 119, median: 119, deviation: 219, interval: 10 },
    ];

    // Create combined array with headers
    const combinedDataVolume = [
      ['', 'With Stabilization', '', '', '', '', '', '', 'Without Stabilization', '', ''],
      ['Template Name', 'Mean', 'Median', 'Standard deviation', '10%-90% interval', '', '', '', 'Template Name', 'Mean', 'Median', 'Standard deviation', '10%-90% interval'],
    ];



    // Merge both datasets
    for (let i = 0; i < withStabilizationVolume.length; i++) {
      const withStabilizationItem = withStabilizationVolume[i];
      const withoutStabilizationItem = withoutStabilizationVolume[i];
      console.log("withStabilizationItemQt", withStabilizationItem, "withoutStabilizationItemQt", withoutStabilizationItem)
      combinedDataVolume.push([
        withStabilizationItem.temp_name,
        withStabilizationItem.mean.toString(),
        withStabilizationItem.median.toString(),
        withStabilizationItem.deviation.toString(),
        withStabilizationItem.interval.toString(),
        '',
        '',
        '',
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
    const wsNameVolume= 'Volume';

    XLSX.utils.book_append_sheet(wb, newWsVolumeData, wsNameVolume);

    /* Stablization Fund */


    const withStabilizationCash = [
      { temp_name: 'Bubble1', mean: 112, median: 100, deviation: 199, interval: 120 },
      { temp_name: 'Bubble2', mean: 10, median: 20, deviation: 10, interval: 20 },
      { temp_name: 'Bubble3', mean: 19, median: 19, deviation: 29, interval: 20 },
    ];

    const withStabilizationAssetQuantity = [
      { temp_name: 'Bubble1', mean: 121, median: 101, deviation: 119, interval: 10 },
      { temp_name: 'Bubble2', mean: 110, median: 210, deviation: 110, interval: 10 },
      { temp_name: 'Bubble3', mean: 119, median: 119, deviation: 219, interval: 10 },
    ];

    const withStabilizationTotalAssets = [
      { temp_name: 'Bubble1', mean: 121, median: 101, deviation: 119, interval: 10 },
      { temp_name: 'Bubble2', mean: 110, median: 210, deviation: 110, interval: 10 },
      { temp_name: 'Bubble3', mean: 119, median: 119, deviation: 219, interval: 10 },
    ];

    const withStabilizationAssetTotalVAssets = [
      { temp_name: 'Bubble1', mean: 121, median: 101, deviation: 119, interval: 10 },
      { temp_name: 'Bubble2', mean: 110, median: 210, deviation: 110, interval: 10 },
      { temp_name: 'Bubble3', mean: 119, median: 119, deviation: 219, interval: 10 },
    ];

    // Create combined array with headers
    const combinedStablization = [
      ['', 'Cash', '', '', '', '','','Assets(Quantity)', '', '','', '', '','Total Assets ($)','','','','', '', 'TotalAssets/v'],
      ['Template Name', 'Mean', 'Median', 'Standard deviation', '10%-90% interval', '', ,'Template Name', 'Mean', 'Median', 'Standard deviation', '10%-90% interval',
      '','Template Name', 'Mean', 'Median', 'Standard deviation', '10%-90% interval','','Template Name', 'Mean', 'Median', 'Standard deviation', '10%-90% interval']
      
    ];



    // Merge both datasets
    for (let i = 0; i < withStabilizationCash.length; i++) {
      const withStabilizationCashItem = withStabilizationCash[i];
      const withStabilizationAssetItem = withStabilizationAssetQuantity[i];

      const withStabilizationtotalassetItem = withStabilizationTotalAssets[i];
      const withStabilizationtotalassetVItem = withStabilizationAssetTotalVAssets[i];


      combinedStablization.push([
        withStabilizationCashItem.temp_name,
        withStabilizationCashItem.mean.toString(),
        withStabilizationCashItem.median.toString(),
        withStabilizationCashItem.deviation.toString(),
        withStabilizationCashItem.interval.toString(),
        '',
        '',
        withStabilizationAssetItem.temp_name.toString(),
        withStabilizationAssetItem.mean.toString(),
        withStabilizationAssetItem.median.toString(),
        withStabilizationAssetItem.deviation.toString(),
        withStabilizationAssetItem.interval.toString(),
        '',
        withStabilizationtotalassetItem.temp_name.toString(),
        withStabilizationtotalassetItem.mean.toString(),
        withStabilizationtotalassetItem.median.toString(),
        withStabilizationtotalassetItem.deviation.toString(),
        withStabilizationtotalassetItem.interval.toString(),
        '',
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
    const wsstablization= 'Stablization Fund';

    XLSX.utils.book_append_sheet(wb, newStablization, wsstablization);

    /* Stablization Fund */




    // Save the workbook to a file
    XLSX.writeFile(wb, 'CompareTemplates.xlsx');


  }

  return (
    <AppLayout>
      <div className="container-fluid">
        <div className="template simulation-info compare">
          <div className="template-header">
            <div className="back-option" onClick={() => handleBack()}>
              <img src="imgs/left-arrow.svg" alt="" />
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
                  <a href="/comparepdf">
                    <img src="imgs/download-white.svg" alt="" />
                    PDF
                  </a>
                </Button>
                <Button>
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
      </div>
    </AppLayout>
  );
}
