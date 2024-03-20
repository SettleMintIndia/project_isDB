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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import AppLayout from "@/components/layout/AppLayout";
import CandleStickSimulation from "./CandleStickSimulation";
import Loader from "@/components/layout/Loader";
import BarGraph from "./BarGraph";
import * as XLSX from "xlsx";

export default function Home() {
  const router = useRouter();
  const [totalTempName, setTotalTempName] = useState(router.query.temp_name);
  const [ex_id, setExid] = useState(router.query.exe_id);
  const [loading, setLoading] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [inititalmarketprice, setinititalmarketprice] = useState("");
  const [inititalmarketpriceErr, setinititalmarketpriceErr] = useState("");
  const [basequantityErr, setbasequantityErr] = useState("");
  const [basequantity, setbasequantity] = useState("");
  const [alpha0, setalpha0] = useState("");
  const [alpha0Err, setalpha0Err] = useState("");
  const [theta0, settheta0] = useState("");
  const [theta0Err, settheta0Err] = useState("");
  const [distribution, setDistribution] = useState("");
  const [distributionErr, setdistributionErr] = useState("");
  const [templatename, settemplatename] = useState("");
  const [templatenameErr, settemplatenameErr] = useState("");
  const [pricelimit, setpricelimit] = useState("");
  const [pricelimitErr, setpricelimitErr] = useState("");
  const [quantitylimit, setquantitylimit] = useState("");
  const [quantitylimitErr, setquantitylimitErr] = useState("");
  const [alpha1, setalpha1] = useState("");
  const [alpha1Err, setalpha1Err] = useState("");
  const [theta1, settheta1] = useState("");
  const [theta1Err, settheta1Err] = useState("");
  const [comment, setcomment] = useState("");
  const [commentErr, setcommentErr] = useState("");
  const [lowerbound, setlowerbound] = useState("");
  const [lowerboundErr, setlowerboundErr] = useState("");
  const [upperbound, setupperbound] = useState("");
  const [upperboundErr, setupperboundErr] = useState("");
  const [singleTemplate, setSingleTemplate] = useState({});
  const [scenarioType, setScenarioType] = useState("");
  const [devpricebuy, setDevPricebuy] = useState("");
  const [devpricebuyErr, setDevPricebuyErr] = useState("");
  const [devpricesell, setDevPricesell] = useState("");
  const [devpricesellErr, setDevPricesellErr] = useState("");
  const [devqty, setDevqty] = useState("");
  const [devqtyErr, setDevqtyErr] = useState("");

  const [meanpricebuy, setMeanPricebuy] = useState("");
  const [meanpricebuyErr, setMeanPricebuyErr] = useState("");
  const [meanpricesell, setMeanPricesell] = useState("");
  const [meanpricesellErr, setMeanPricesellErr] = useState("");
  const [meanqty, setMeanqty] = useState("");
  const [meanqtyErr, setMeanqtyErr] = useState("");
  const [tradeHistoryWS, setTradeHistoryWS] = useState([
    { price: "", quantity: "", timestamp: "" },
  ]);
  const [tradeHistoryNS, setTradeHistoryNS] = useState([
    { price: "", quantity: "", timestamp: "" },
  ]);

  const [executionData, setExecutionData] = useState({
    created_timestamp: "",
    iterations: 0,
    nb_orders: 0,
    nb_orders_var: 0,
    nb_rounds: 0,
    templatename: "",
  });
  const [siteration, setSIteration] = useState(1);
  const [siterationErr, setSIterationErr] = useState("");
  const [sroundErr, setSRoundErr] = useState("");
  const [type, setType] = useState("price");

  const [sround, setSRound] = useState(1);
  const [orderWs, setorderWs] = useState([]);
  const [orderNs, setorderNs] = useState([]);
  const handleEdit = () => {
    router.push("/simulation_history_info");
  };
  const [orderWsbuy, setorderWsbuy] = useState([
    {
      quantity: "",
      price: "",
    },
  ]);
  const [orderWssell, setorderWssell] = useState([
    {
      quantity: "",
      price: "",
    },
  ]);

  const [orderNsbuy, setorderNsbuy] = useState([
    {
      quantity: "",
      price: "",
    },
  ]);
  const [orderNssell, setorderNssell] = useState([
    {
      quantity: "",
      price: "",
    },
  ]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeButton, setActiveButton] = useState("Static");

  const [graphDataWsIteration, setgraphDataWsIteration] = useState([]);
  const [graphDataWsRound, setgraphDataWsRound] = useState([]);
  const [graphDataNsIteration, setgraphDataNsIteration] = useState([]);
  const [graphDataNsRound, setgraphDataNsRound] = useState([]);
  const [tabName, setTabName] = useState(0);
  const [stablization, setStablization] = useState(0);
  const [simulationQuantityData, setSimulationQuantityData] = useState([]);
  const [simulationVolumeData, setSimulationVolumeData] = useState([]);

  const [nsimulationQuantityData, setNSimulationQuantityData] = useState([]);
  const [nsimulationVolumeData, setNSimulationVolumeData] = useState([]);

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
    console.log("ex_id", ex_id);

    if (ex_id == undefined || ex_id == "" || ex_id == null) {
      router.push("/simulationhistory");
    } else {
      getTemplateDetails(totalTempName);
      getExecutionDetails(totalTempName, ex_id);
      getSimulationResultDetails(ex_id);
      getSimulationQuantityResultDetails(ex_id);
      getStablizationFund(ex_id);
      getSimulationVolumeResultDetails(ex_id);
      if (tabIndex == 1) {
        setSIteration(1);
        setSRound(1);
        getOrderBook(ex_id, 1, 1);
      }
      if (tabIndex == 2) {
        setSIteration(1);
        setSRound(1);
        getOrderBook(ex_id, 1, 1);
      }

      if (tabIndex == 3) {
        setSIteration(1);
        setSRound(1);
        getTradeHistoryWS(ex_id, 1, 1);
      }
      if (tabIndex == 4) {
        setSIteration(1);
        setSRound(1);
        getTradeHistoryNS(ex_id, 1, 1);
      }
      if (tabIndex == 5) {
        console.log("tab-------------------", tabName);
        if (tabName === 0) {
          getSimulationResultDetails(ex_id);
        }
        if (tabName === 1) {
          getSimulationVolumeResultDetails(ex_id);
        }
        if (tabName === 2) {
          getSimulationQuantityResultDetails(ex_id);
        }
      }

      if (tabIndex == 6) {
        getStablizationFund(ex_id);
      }
      console.log("tabIndex", tabIndex, graphDataWsIteration, graphDataWsRound);
    }
  }, [totalTempName, tabIndex, ex_id, tabName, stablization]);
  const getStablizationFund = async (id: any) => {
    setLoading(true);
    const result = await API_Auth.getStablizationFundDetails(id);
    console.log("StablizationFund", result);
    if (result.status == 400) {
    } else {
      setStablizationFundData(
        result.stab == undefined ? StablizationFundData : result.stab
      );
      setStablizationTotal(result?.stab_totals.stab_totals);
    }
    setLoading(false);
  };
  const getSimulationResultDetails = async (id: any) => {
    setLoading(true);
    const result = await API_Auth.getSimulationResult(id, "price");
    console.log("simulationresult", result);
    setLoading(false);

    if (result.status == 400) {
    } else {
      setgraphDataWsIteration(result.graphDataWS.byiter);
      setgraphDataWsRound(result.graphDataWS.byround);
      setgraphDataNsIteration(result.graphDataNS.byiter);
      setgraphDataNsRound(result.graphDataNS.byround);
      setMeanPriceSimulation(
        result.sim == undefined ? meanPriceSimulation : result.sim
      );
    }
    setLoading(false);
  };

  const getSimulationQuantityResultDetails = async (executionId: any) => {
    setLoading(true);
    const result = await API_Auth.getSimulationResult(executionId, "quantity");
    console.log("quantityresult", result);
    setLoading(false);
    status;
    if (result.status == 400) {
      setSimulationQuantityData([]);
    } else {
      setSimulationQuantityData(result.graphDataWS[0]);
      setNSimulationQuantityData(result.graphDataNS[0]);
      setMeanQuantitySimulation(
        result.sim == undefined ? meanQuantitySimulation : result.sim
      );
    }
    setLoading(false);
  };

  const getSimulationVolumeResultDetails = async (executionId: any) => {
    setLoading(true);
    const result = await API_Auth.getSimulationResult(executionId, "volume");
    console.log("volumeresult", result);
    console.log("volume--------------------------->");
    setLoading(false);

    if (result.status == 400) {
      setSimulationVolumeData([]);
    } else {
      setSimulationVolumeData(result.graphDataWS[0]);
      setNSimulationVolumeData(result.graphDataNS[0]);
      setMeanVolumeSimulation(
        result.sim == undefined ? meanVolumeSimulation : result.sim
      );
    }
    setLoading(false);
  };
  const getOrderBook = async (id: any, siteration: any, sround: any) => {
    setLoading(true);
    const result = await API_Auth.getOrderDetails(id, siteration, sround);
    console.log("orderresult", result);
    setorderWsbuy(result.ordersWSBuy);
    setorderWssell(result.ordersWSSell);
    setorderNsbuy(result.ordersNSBuy);
    setorderNssell(result.ordersNSSell);
    setLoading(false);
  };
  const getTradeHistoryWS = async (id: any, siteration: any, sround: any) => {
    setLoading(true);

    const result = await API_Auth.getTradeHistoryWithStablization(
      id,
      siteration,
      sround
    );
    console.log("tadingws", result.trades);
    setLoading(false);
    setTradeHistoryWS(result.trades);
    setLoading(false);
  };
  const getTradeHistoryNS = async (id: any, siteration: any, sround: any) => {
    setLoading(true);

    const result = await API_Auth.getTradeHistoryWithoutStablization(
      id,
      siteration,
      sround
    );
    console.log("tadingws", result.trade);
    setLoading(false);

    setTradeHistoryNS(result.trade);
  };

  const getExecutionDetails = async (name: any, id: any) => {
    let body = {
      temp_name: name,
      creator: "",
      scenario: "",
      datefrom: "",
      dateto: "",
      resultPerPage: 1,
      pgNo: 1,
      execution_id: id,
    };
    const result = await API_Auth.getSimulationHistory(body);
    console.log(
      "execution",
      result,
      parseInt(result.simulations[0].iterations)
    );

    // setExecutionData(result.simulations[0]);

    setExecutionData({
      created_timestamp: result.simulations[0].created_timestamp,
      iterations: parseInt(result.simulations[0].iterations),
      nb_orders: parseInt(result.simulations[0].nb_orders),
      nb_orders_var: result.simulations[0].nb_orders_var,
      nb_rounds: parseInt(result.simulations[0].nb_rounds),
      templatename: result.simulations[0].temp_name,
    });
  };

  const getTemplateDetails = async (totalTempName: any) => {
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

    console.log(body);

    const result = await API_Auth.getAllTemplates(body);

    console.log("result", result);
    if (result.status == 200) {
      console.log(result.templates[0]);
      var data = result.templates[0];
      settemplatename(data.temp_name);
      setSingleTemplate(result.templates[0]);
      setScenarioType(data.scenario_name);
      setinititalmarketprice(data.initial_mkt_price);
      setpricelimit(data.price_var);
      setbasequantity(data.base_quant);
      setquantitylimit(data.quant_var);
      setalpha0(data.alpha0);
      setalpha1(data.alpha1);
      settheta0(data.theta0);
      settheta1(data.theta1);
      setDevPricebuy(data.std_dev_price_buy);
      setDevPricesell(data.std_dev_price_sell);
      setMeanPricebuy(data.mean_price_buy);
      setMeanPricesell(data.mean_price_sell);
      setDevqty(data.std_dev_quant);
      setMeanqty(data.mean_quant);
      setDistribution(data.distribution);
      setcomment(data.comments);
      setlowerbound(data.limit_order_lower_bound);
      setupperbound(data.limit_order_upper_bound);
    }
  };

  const handleButtonClick = (buttonName: SetStateAction<string>) => {
    setActiveButton(buttonName);
  };

  const toggleColumn = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInput = (e: any) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    if (name === "scenarioType") {
      setScenarioType(value);
    }
    if (name == "inititalmarketprice") {
      setinititalmarketprice(value);
    }
    if (name == "basequantity") {
      setbasequantity(value);
    }
    if (name == "alpha0") {
      setalpha0(value);
    }
    if (name == "theta0") {
      settheta0(value);
    }
    if (name == "distribution") {
      setDistribution(value);
    }
    if (name == "templatename") {
      settemplatename(value);
    }
    if (name == "pricelimit") {
      setpricelimit(value);
    }
    if (name == "quantitylimit") {
      setquantitylimit(value);
    }
    if (name == "upperbonds") {
      setupperbound(value);
    }
    if (name == "lowerbonds") {
      setlowerbound(value);
    }
    if (name == "alpha1") {
      setalpha1(value);
    }
    if (name == "theta1") {
      settheta1(value);
    }
    if (name == "comment") {
      setcomment(value);
    }
    if (name == "siteration") {
      setSIteration(value);
    }
    if (name == "sround") {
      setSRound(value);
    }
  };

  const handleSearch = () => {
    let error = 0;

    if (siteration.toString() == "") {
      error = error + 1;
      setSIterationErr("Please Enter Iteration");
    } else if (Number(siteration) > Number(executionData.iterations)) {
      error = error + 1;
      toast.error(
        "Iteration should not be greater than " + executionData.iterations
      );
    } else {
      setSIterationErr("");
    }
    if (sround.toString() == "") {
      error = error + 1;
      setSRoundErr("Please Enter Round");
    } else if (Number(sround) > Number(executionData.nb_rounds)) {
      error = error + 1;
      toast.error(
        "Round should not be greater than " + executionData.nb_rounds
      );
    } else {
      setSRoundErr("");
    }

    if (error == 0) {
      if (tabIndex == 1) {
        getOrderBook(ex_id, siteration, sround);
      }
      if (tabIndex == 2) {
        getOrderBook(ex_id, siteration, sround);
      }

      if (tabIndex == 3) {
        getTradeHistoryWS(ex_id, siteration, sround);
      }
      if (tabIndex == 4) {
        getTradeHistoryNS(ex_id, siteration, sround);
      }
      if (tabIndex == 5) {
        console.log("tab-------------------", tabName);
        if (tabName === 0) {
          getSimulationResultDetails(ex_id);
        }
        if (tabName === 1) {
          getSimulationVolumeResultDetails(ex_id);
        }
        if (tabName === 2) {
          getSimulationQuantityResultDetails(ex_id);
        }
      }

      if (tabIndex == 6) {
        getStablizationFund(ex_id);
      }
      console.log("tabIndex", tabIndex);
    }
  };
  const handleFirstIteration = () => {
    setSIteration(1);
  };
  const handleLastIteration = () => {
    setSIteration(executionData.iterations);
  };
  const handleIncrementIteration = () => {
    if (Number(siteration) > Number(executionData.iterations)) {
      toast.error(
        "Iteration should not be greater than " + executionData.iterations
      );
    } else {
      let x = siteration + 1;
      setSIteration(x);
    }
  };
  const handleDecrementIteration = () => {
    if (Number(siteration) < 1) {
    } else {
      let x = Number(siteration) - 1;
      setSIteration(x);
    }
  };

  const handleFirstRound = () => {
    setSRound(1);
  };
  const handleLastRound = () => {
    setSRound(executionData.nb_rounds);
  };
  const handleIncrementRound = () => {
    if (Number(sround) > Number(executionData.nb_rounds)) {
      toast.error(
        "Rounds should not be greater than " + executionData.nb_rounds
      );
    } else {
      let x = sround + 1;
      setSRound(x);
    }
  };
  const handleDecrementRound = () => {
    if (Number(sround) < 1) {
    } else {
      let x = Number(sround) - 1;
      setSRound(x);
    }
  };

  const handleBack = () => {
    router.back();
  };

  console.log(
    "------------------------",
    graphDataWsIteration.length,
    graphDataWsRound.length
  );

  const handleDownloadPDF = async () => {
    router.push({
      pathname: "/reportpdf",
      query: { temp_name: executionData.templatename, exe_id: ex_id },
    });
  };

  const handleDownloadExcel = async () => {
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

    console.log(body);
    const result = await API_Auth.getAllTemplates(body);

    console.log("result", result);
    console.log(result.templates[0]);
    var keydata = result.templates[0];
    keydata["Iteartions"] = executionData.iterations;
    keydata["Orders"] = executionData.nb_orders;
    keydata["rounds"] = executionData.nb_rounds;
    keydata["oder_variance"] = executionData.nb_orders_var;
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

    const withStabilizationData:any = {
      Template: totalTempName,
      Mean: meanPriceSimulation.mean_price_ws,
      Median: meanPriceSimulation.median_price_ws,
      "Standard deviation": meanPriceSimulation.std_price_ws,
      "10%-90% Interval":
        meanPriceSimulation.inter_10_price_ws +
        "-" +
        meanPriceSimulation.inter_90_price_ws,
    };
    const withoutStabilizationData:any = {
      Template: totalTempName,
      Mean: meanPriceSimulation.mean_price_ns,
      Median: meanPriceSimulation.median_price_ns,
      "Standard deviation": meanPriceSimulation.std_price_ns,
      "10%-90% Interval":
        meanPriceSimulation.inter_10_price_ns +
        "-" +
        meanPriceSimulation.inter_90_price_ns,
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

    console.log("meanVolumeSimulation", meanVolumeSimulation);

    const withStabilizationDataVOlume:any = {
      Template: totalTempName,
      Mean: meanVolumeSimulation.mean_amt_ws,
      Median: meanVolumeSimulation.median_amt_ws,
      "Standard deviation": meanVolumeSimulation.std_amt_ws,
      "10%-90% interval":
        meanVolumeSimulation.inter_10_amt_ws +
        "-" +
        meanVolumeSimulation.inter_90_amt_ws,
    };
    const withoutStabilizationDataVolume:any = {
      Template: totalTempName,
      Mean: meanVolumeSimulation.mean_amt_ns,
      Median: meanVolumeSimulation.median_amt_ns,
      "Standard deviation": meanVolumeSimulation.std_amt_ns,
      "10%-90% interval":
        meanVolumeSimulation.inter_10_amt_ns +
        "-" +
        meanVolumeSimulation.inter_90_amt_ns,
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

    console.log("meanQuantitySimulation", meanQuantitySimulation);

    /* Quantity */

    const withStabilizationDataQty:any = {
      Template: totalTempName,
      Mean: meanQuantitySimulation.mean_quant_ws,
      Median: meanQuantitySimulation.median_quant_ws,
      "Standard deviation": meanQuantitySimulation.std_quant_ws,
      "10%-90% interval":
        meanQuantitySimulation.inter_10_quant_ws +
        "-" +
        meanQuantitySimulation.inter_90_quant_ws,
    };
    const withoutStabilizationDataQty:any = {
      Template: totalTempName,
      Mean: meanQuantitySimulation.mean_quant_ns,
      Median: meanQuantitySimulation.median_quant_ns,
      "Standard deviation": meanQuantitySimulation.std_quant_ns,
      "10%-90% interval":
        meanQuantitySimulation.inter_10_quant_ns +
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
    console.log("StablizationFundData", StablizationFundData);

    const withCash:any = {
      temp_name: totalTempName,
      mean: StablizationFundData.mean_cash_stab,
      median: StablizationFundData.median_cash_stab,
      "Standard deviation": StablizationFundData.std_cash_stab,
      "10%-90% interval":
        StablizationFundData.inter_10_cash_stab +
        "-" +
        StablizationFundData.inter_90_cash_stab,
    };

    const withArrayQuantity:any = {
      temp_name: totalTempName,
      mean: StablizationFundData.mean_asset_stab,
      median: StablizationFundData.median_asset_stab,
      "Standard deviation": StablizationFundData.std_asset_stab,
      "10%-90% interval":
        StablizationFundData.inter_10_asset_stab +
        "-" +
        StablizationFundData.inter_90_asset_stab,
    };

    const withTotalAssetV:any = {
      temp_name: totalTempName,
      mean: StablizationFundData.mean_total_stab,
      median: StablizationFundData.median_total_stab,
      "Standard deviation": StablizationFundData.std_total_stab,
      "10%-90% interval":
        StablizationFundData.inter_10_total_stab +
        "-" +
        StablizationFundData.inter_90_total_stab,
    };

    const withTotalAssetDollar:any = {
      temp_name: totalTempName,
      mean: StablizationFundData.mean_total_v_stab,
      median: StablizationFundData.median_total_v_stab,
      "Standard deviation": StablizationFundData.std_total_v_stab,
      "10%-90% interval":
        StablizationFundData.inter_10_total_v_stab +
        "-" +
        StablizationFundData.inter_90_total_v_stab,
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
    XLSX.writeFile(wb, totalTempName + "Report.xlsx");
  };
  return (
    <AppLayout>
      <div className="container-fluid">
        <div className="simulation-info history">
          <div
            className="template-header"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="back-option" onClick={() => handleBack()}>
              <img src="imgs/left-arrow.svg" alt="" />
              <p className="mb-0">Back</p>
            </div>
            <div className="main-header"></div>
            <div className="right-head info">
              {/* <div className="format"> */}
              <p>Download Report :</p>
              <div className="file-type">
                <Button onClick={() => handleDownloadPDF()}>
                  <img src="imgs/download-white.svg" alt="" />
                  PDF
                </Button>
                <Button onClick={() => handleDownloadExcel()}>
                  <img src="imgs/download-white.svg" alt="" />
                  EXCEL
                </Button>
              </div>
              {/* </div> */}
            </div>
          </div>

          <div className="simulation-section">
            <div className="frame-area">
              <div
                className={
                  isExpanded ? "leftArea expanded" : "leftArea compressed"
                }
              >
                <div className="template-modal">
                  <div className="modal-header">
                    <img
                      src={isExpanded ? "imgs/compress.svg" : "imgs/expand.svg"}
                      alt=""
                      onClick={toggleColumn}
                    />
                  </div>
                  <div className="modal-details">
                    <div className="modal-heads">
                      <div className="head">
                        <div className="left-head">Template Details</div>
                        <div className="title">
                          <h4>{templatename}</h4>
                        </div>
                      </div>
                      <div className="bottom-head">
                        <div className="simulation-time">
                          <div className="time">
                            <label htmlFor="simulationtime">
                              Simulation Time
                            </label>
                            <span>
                              {" "}
                              {moment(executionData.created_timestamp).format(
                                "MM/DD/YYYY h:mm:ss A"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="details-section">
                      <div className="template-details">
                        <div className="left-tables">
                          <div className="table-responsive">
                            <div className="template-content">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Scenario Type</th>
                                    <th>{scenarioType}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Initial Market Price</td>
                                    <td>
                                      <input
                                        type="text"
                                        id="price"
                                        name="inititalmarketprice"
                                        required
                                        value={inititalmarketprice}
                                        onChange={handleInput}
                                      />
                                      {inititalmarketpriceErr != "" && (
                                        <p className="alert-message">
                                          {inititalmarketpriceErr}
                                        </p>
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Price Variance Limit</td>
                                    <td>
                                      <input
                                        type="text"
                                        id="pricelimit"
                                        name="pricelimit"
                                        required
                                        value={pricelimit}
                                        onChange={handleInput}
                                      />
                                      {pricelimitErr != "" && (
                                        <p className="alert-message">
                                          {pricelimitErr}
                                        </p>
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Base Quantity</td>
                                    <td>
                                      <input
                                        type="text"
                                        id="quantity"
                                        name="basequantity"
                                        required
                                        value={basequantity}
                                        onChange={handleInput}
                                      />
                                      {basequantityErr != "" && (
                                        <p className="alert-message">
                                          {basequantityErr}
                                        </p>
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Quantity Variance Limit</td>
                                    <td>
                                      <input
                                        type="text"
                                        id="quantitylimit"
                                        name="quantitylimit"
                                        required
                                        value={quantitylimit}
                                        onChange={handleInput}
                                      />
                                      {quantitylimitErr != "" && (
                                        <p className="alert-message">
                                          {quantitylimitErr}
                                        </p>
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Limit Order Upper Bound</td>
                                    <td>
                                      <input
                                        type="text"
                                        id="upperbonds"
                                        name="upperbonds"
                                        required
                                        value={upperbound}
                                        onChange={handleInput}
                                      />
                                      {upperboundErr != "" && (
                                        <p className="alert-message">
                                          {upperboundErr}
                                        </p>
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Limit Order Lower Bound</td>
                                    <td>
                                      <input
                                        type="text"
                                        id="lowerbonds"
                                        name="lowerbonds"
                                        required
                                        value={lowerbound}
                                        onChange={handleInput}
                                      />
                                      {lowerboundErr != "" && (
                                        <p className="alert-message">
                                          {lowerboundErr}
                                        </p>
                                      )}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="table-responsive">
                            <div className="template-content">
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <td>Alpha 0</td>
                                    <td>
                                      <input
                                        type="text"
                                        id="alpha0"
                                        name="alpha0"
                                        required
                                        value={alpha0}
                                        onChange={handleInput}
                                      />
                                      {alpha0Err != "" && (
                                        <p className="alert-message">
                                          {alpha0Err}
                                        </p>
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Alpha 1</td>
                                    <td>
                                      <input
                                        type="text"
                                        id="alpha1"
                                        name="alpha1"
                                        required
                                        value={alpha1}
                                        onChange={handleInput}
                                      />
                                      {alpha1Err != "" && (
                                        <p className="alert-message">
                                          {alpha1Err}
                                        </p>
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Theta 0</td>
                                    <td>
                                      <input
                                        type="text"
                                        id="theta0"
                                        name="theta0"
                                        required
                                        value={theta0}
                                        onChange={handleInput}
                                      />
                                      {theta0Err != "" && (
                                        <p className="alert-message">
                                          {theta0Err}
                                        </p>
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Theta 1</td>
                                    <td>
                                      <input
                                        type="text"
                                        id="theta1"
                                        name="theta1"
                                        required
                                        value={theta1}
                                        onChange={handleInput}
                                      />
                                      {theta1Err != "" && (
                                        <p className="alert-message">
                                          {theta1Err}
                                        </p>
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Distribution</td>
                                    <td>
                                      <input
                                        type="text"
                                        id="distribution"
                                        name="distribution"
                                        required
                                        value={distribution}
                                      />
                                      {/*  <select
                                    name="distribution"
                                    id="distribution"
                                    value={distribution}
                                    onChange={handleInput}
                                    required
                                  >
                                    <option value="volvo">
                                      Select Distribution Type
                                    </option>

                                    <option value="volvo">Poisonous</option>
                                    <option value="Crash">Uniform</option>
                                    <option value="Bubble">Gaussian</option>
                                  </select>
                                  {distributionErr != "" && (
                                    <p className="alert-message">
                                      {distributionErr}
                                    </p>
                                  )} */}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="right-tables">
                          <div className="table-responsive">
                            <div className="template-content">
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <td>Number Of Iterations</td>
                                    <td>
                                      <input
                                        type="text"
                                        value={executionData.iterations}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Number Of Rounds</td>
                                    <td>
                                      <input
                                        type="text"
                                        value={executionData.nb_rounds}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Number Of Orders In Each Round</td>
                                    <td>
                                      <input
                                        type="text"
                                        value={executionData.nb_orders}
                                      />
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>Orders Variance</td>
                                    <td>
                                      <input
                                        type="number"
                                        value={executionData.nb_orders_var}
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="modal-comment">
                            <label htmlFor="comment">Comment</label>
                            <p>{comment}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <img
                      src={isExpanded ? "imgs/compress.svg" : "imgs/expand.svg"}
                      alt=""
                      onClick={toggleColumn}
                    />
                  </div>
                </div>
              </div>
              <div
                className="rightArea"
                style={{
                  // width: isExpanded ? "65%" : "94%",
                  marginLeft: "30px",
                  paddingTop: "10px",
                }}
              >
                <div className="details-section">
                  {/* <div className="btn-group">
                  <button
                    className={activeButton === "Static" ? "btn active" : "btn"}
                    onClick={() => handleButtonClick("Static")}
                  >
                    Static
                  </button>
                  <button
                    className={
                      activeButton === "Dynamic" ? "btn active" : "btn"
                    }
                    onClick={() => handleButtonClick("Dynamic")}
                  >
                    Dynamic
                  </button>
                </div> */}
                  <div className="tab-section">
                    <Tabs
                      selectedIndex={tabIndex}
                      onSelect={(tabIndex: SetStateAction<number>) =>
                        setTabIndex(tabIndex)
                      }
                    >
                      <TabList>
                        <Tab>Info</Tab>
                        <Tab>
                          Order Book <span> (Stabilization)</span>{" "}
                        </Tab>
                        <Tab>Order Book </Tab>
                        <Tab>
                          Trade History <span>(Stabilization)</span>{" "}
                        </Tab>
                        <Tab>Trade History </Tab>
                        <Tab>Simulation Result</Tab>
                        <Tab>Stabilization Fund</Tab>
                      </TabList>
                      <TabPanel className="info">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s
                      </TabPanel>
                      <TabPanel className="order-book">
                        <div className="orderbook-header">
                          <div className="search-round">
                            <div className="controls">
                              <h3>Iteration</h3>
                              <div className="previous">
                                {siteration == 1 && (
                                  <img
                                    src="imgs/left-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                                {siteration != 1 && (
                                  <img
                                    src="imgs/left-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleFirstIteration()}
                                  />
                                )}

                                {siteration != 1 && (
                                  <img
                                    src="imgs/left-paging.svg"
                                    alt=""
                                    onClick={() => handleDecrementIteration()}
                                  />
                                )}
                                {siteration == 1 && (
                                  <img src="imgs/previous.svg" alt="" />
                                )}
                              </div>
                              <div className="iteration">
                                <div className="tooldrop">
                                  <input
                                    value={siteration}
                                    name="siteration"
                                    onChange={handleInput}
                                  />
                                  {siterationErr != "" && (
                                    <p className="alert-message">
                                      {siterationErr}
                                    </p>
                                  )}{" "}
                                </div>
                                <span>of {executionData.iterations}</span>
                              </div>
                              <div className="next">
                                {siteration != executionData.iterations && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementIteration()}
                                  />
                                )}
                                {siteration == executionData.iterations && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {siteration != executionData.iterations && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastIteration()}
                                  />
                                )}
                                {siteration == executionData.iterations && (
                                  <img
                                    src="imgs/right-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                              </div>
                            </div>
                            <div className="round">
                              <h3>Round</h3>
                              <div className="previous">
                                {sround == 1 && (
                                  <img
                                    src="imgs/left-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                                {sround != 1 && (
                                  <img
                                    src="imgs/left-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleFirstRound()}
                                  />
                                )}

                                {sround != 1 && (
                                  <img
                                    src="imgs/left-paging.svg"
                                    alt=""
                                    onClick={() => handleDecrementRound()}
                                  />
                                )}
                                {sround == 1 && (
                                  <img src="imgs/previous.svg" alt="" />
                                )}
                              </div>
                              <div className="iteration">
                                <div className="tooldrop">
                                  <input
                                    value={sround}
                                    name="sround"
                                    onChange={handleInput}
                                  />
                                  {sroundErr != "" && (
                                    <p className="alert-message">{sroundErr}</p>
                                  )}{" "}
                                </div>
                                <span>of {executionData.nb_rounds}</span>
                              </div>
                              <div className="next">
                                {sround != executionData.nb_rounds && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementRound()}
                                  />
                                )}
                                {sround == executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {sround != executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastRound()}
                                  />
                                )}
                                {sround == executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                              </div>
                            </div>
                            <div className="search-controls ms-5">
                              <button
                                className="search"
                                onClick={() => handleSearch()}
                              >
                                Search
                              </button>
                            </div>
                          </div>
                          {/* <div className="tabs"></div> */}
                        </div>
                        {loading == true && <Loader />}

                        <div className="rows">
                          <div className=" sell">
                            <div className="orderNo">
                              <label htmlFor="order">Total Orders:</label>
                              <span>{executionData.nb_orders}</span>
                            </div>
                            <div className="table-responsive">
                              <div className="table-content">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th>Quantity</th>
                                      <th>Buy Price</th>
                                    </tr>
                                  </thead>
                                  {orderWsbuy.length == 0 && (
                                    <tbody>
                                      <tr>
                                        <td colSpan={12}>
                                          <p className="no_Data_table">
                                            No Data Found
                                          </p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  )}
                                  <tbody>
                                    {orderWsbuy.map((data) => (
                                      <tr>
                                        <td>{data.quantity}</td>
                                        <td>{data.price}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>{" "}
                              </div>
                            </div>
                          </div>

                          <div className=" buy">
                            <div className="orderNo">
                              <label htmlFor="order">Total Orders:</label>
                              <span>{executionData.nb_orders}</span>
                            </div>
                            <div className="table-responsive">
                              <div className="table-content">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th>Sell Price</th>
                                      <th>Quantity</th>
                                    </tr>
                                  </thead>
                                  {orderWssell.length == 0 && (
                                    <tbody>
                                      <tr>
                                        <td colSpan={12}>
                                          <p className="no_Data_table">
                                            No Data Found
                                          </p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  )}
                                  <tbody>
                                    {orderWssell.map((data) => (
                                      <tr>
                                        <td>{data.quantity}</td>
                                        <td>{data.price}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="footer"> */}
                        <div
                          className="orderbook-header"
                          // style={{ marginTop: "-100px" }}
                        >
                          <div className="search-round">
                            <div className="controls">
                              <h3>Iteration</h3>
                              <div className="previous">
                                {siteration == 1 && (
                                  <img
                                    src="imgs/left-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                                {siteration != 1 && (
                                  <img
                                    src="imgs/left-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleFirstIteration()}
                                  />
                                )}

                                {siteration != 1 && (
                                  <img
                                    src="imgs/left-paging.svg"
                                    alt=""
                                    onClick={() => handleDecrementIteration()}
                                  />
                                )}
                                {siteration == 1 && (
                                  <img src="imgs/previous.svg" alt="" />
                                )}
                              </div>
                              <div className="iteration">
                                <div className="tooldrop">
                                  <input
                                    value={siteration}
                                    name="siteration"
                                    onChange={handleInput}
                                  />
                                  {siterationErr != "" && (
                                    <p className="alert-message">
                                      {siterationErr}
                                    </p>
                                  )}{" "}
                                </div>
                                <span>of {executionData.iterations}</span>
                              </div>
                              <div className="next">
                                {siteration != executionData.iterations && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementIteration()}
                                  />
                                )}
                                {siteration == executionData.iterations && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {siteration != executionData.iterations && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastIteration()}
                                  />
                                )}
                                {siteration == executionData.iterations && (
                                  <img
                                    src="imgs/right-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                              </div>
                            </div>
                            <div className="round">
                              <h3>Round</h3>
                              <div className="previous">
                                {sround == 1 && (
                                  <img
                                    src="imgs/left-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                                {sround != 1 && (
                                  <img
                                    src="imgs/left-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleFirstRound()}
                                  />
                                )}

                                {sround != 1 && (
                                  <img
                                    src="imgs/left-paging.svg"
                                    alt=""
                                    onClick={() => handleDecrementRound()}
                                  />
                                )}
                                {sround == 1 && (
                                  <img src="imgs/previous.svg" alt="" />
                                )}
                              </div>
                              <div className="iteration">
                                <div className="tooldrop">
                                  <input
                                    value={sround}
                                    name="sround"
                                    onChange={handleInput}
                                  />
                                  {sroundErr != "" && (
                                    <p className="alert-message">{sroundErr}</p>
                                  )}{" "}
                                </div>
                                <span>of {executionData.nb_rounds}</span>
                              </div>
                              <div className="next">
                                {sround != executionData.nb_rounds && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementRound()}
                                  />
                                )}
                                {sround == executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {sround != executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastRound()}
                                  />
                                )}
                                {sround == executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                              </div>
                            </div>
                            <div className="search-controls ms-5">
                              <button
                                className="search"
                                onClick={() => handleSearch()}
                              >
                                Search
                              </button>
                            </div>
                          </div>
                          {/* <div className="tabs"></div> */}
                          {/* </div> */}
                        </div>
                      </TabPanel>
                      <TabPanel className="order-book">
                        <div className="orderbook-header">
                          <div className="search-round">
                            <div className="controls">
                              <h3>Iteration</h3>
                              <div className="previous">
                                {siteration == 1 && (
                                  <img
                                    src="imgs/left-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                                {siteration != 1 && (
                                  <img
                                    src="imgs/left-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleFirstIteration()}
                                  />
                                )}

                                {siteration != 1 && (
                                  <img
                                    src="imgs/left-paging.svg"
                                    alt=""
                                    onClick={() => handleDecrementIteration()}
                                  />
                                )}
                                {siteration == 1 && (
                                  <img src="imgs/previous.svg" alt="" />
                                )}
                              </div>
                              <div className="iteration">
                                <div className="tooldrop">
                                  <input
                                    value={siteration}
                                    name="siteration"
                                    onChange={handleInput}
                                  />
                                  {siterationErr != "" && (
                                    <p className="alert-message">
                                      {siterationErr}
                                    </p>
                                  )}{" "}
                                </div>
                                <span>of {executionData.iterations}</span>
                              </div>
                              <div className="next">
                                {siteration != executionData.iterations && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementIteration()}
                                  />
                                )}
                                {siteration == executionData.iterations && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {siteration != executionData.iterations && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastIteration()}
                                  />
                                )}
                                {siteration == executionData.iterations && (
                                  <img
                                    src="imgs/right-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                              </div>
                            </div>
                            <div className="round">
                              <h3>Round</h3>
                              <div className="previous">
                                {sround == 1 && (
                                  <img
                                    src="imgs/left-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                                {sround != 1 && (
                                  <img
                                    src="imgs/left-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleFirstRound()}
                                  />
                                )}

                                {sround != 1 && (
                                  <img
                                    src="imgs/left-paging.svg"
                                    alt=""
                                    onClick={() => handleDecrementRound()}
                                  />
                                )}
                                {sround == 1 && (
                                  <img src="imgs/previous.svg" alt="" />
                                )}
                              </div>
                              <div className="iteration">
                                <div className="tooldrop">
                                  <input
                                    value={sround}
                                    name="sround"
                                    onChange={handleInput}
                                  />
                                  {sroundErr != "" && (
                                    <p className="alert-message">{sroundErr}</p>
                                  )}{" "}
                                </div>
                                <span>of {executionData.nb_rounds}</span>
                              </div>
                              <div className="next">
                                {sround != executionData.nb_rounds && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementRound()}
                                  />
                                )}
                                {sround == executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {sround != executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastRound()}
                                  />
                                )}
                                {sround == executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                              </div>
                            </div>
                            <div className="search-controls ms-5">
                              <button
                                className="search"
                                onClick={() => handleSearch()}
                              >
                                Search
                              </button>
                            </div>
                          </div>
                          {/* <div className="tabs"></div> */}
                        </div>
                        {loading == true && <Loader />}

                        <div className="rows">
                          <div className=" sell">
                            <div className="orderNo">
                              <label htmlFor="order">Total Orders:</label>
                              <span>{executionData.nb_orders}</span>
                            </div>
                            <div className="table-responsive">
                              <div className="table-content">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th>Quantity</th>
                                      <th>Buy Price</th>
                                    </tr>
                                  </thead>
                                  {orderNsbuy.length == 0 && (
                                    <tbody>
                                      <tr>
                                        <td colSpan={12}>
                                          <p className="no_Data_table">
                                            No Data Found
                                          </p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  )}
                                  <tbody>
                                    {orderNsbuy.map((data) => (
                                      <tr>
                                        <td>{data.quantity}</td>
                                        <td>{data.price}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>{" "}
                              </div>
                            </div>
                          </div>

                          <div className=" buy">
                            <div className="orderNo">
                              <label htmlFor="order">Total Orders:</label>
                              <span>{executionData.nb_orders}</span>
                            </div>
                            <div className="table-responsive">
                              <div className="table-content">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th>Sell Price</th>
                                      <th>Quantity</th>
                                    </tr>
                                  </thead>
                                  {orderNssell.length == 0 && (
                                    <tbody>
                                      <tr>
                                        <td colSpan={12}>
                                          <p className="no_Data_table">
                                            No Data Found
                                          </p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  )}
                                  <tbody>
                                    {orderNssell.map((data) => (
                                      <tr>
                                        <td>{data.quantity}</td>
                                        <td>{data.price}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="footer"> */}
                        <div
                          className="orderbook-header"
                          // style={{ marginTop: "-100px" }}
                        >
                          <div className="search-round">
                            <div className="controls">
                              <h3>Iteration</h3>
                              <div className="previous">
                                {siteration == 1 && (
                                  <img
                                    src="imgs/left-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                                {siteration != 1 && (
                                  <img
                                    src="imgs/left-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleFirstIteration()}
                                  />
                                )}

                                {siteration != 1 && (
                                  <img
                                    src="imgs/left-paging.svg"
                                    alt=""
                                    onClick={() => handleDecrementIteration()}
                                  />
                                )}
                                {siteration == 1 && (
                                  <img src="imgs/previous.svg" alt="" />
                                )}
                              </div>
                              <div className="iteration">
                                <div className="tooldrop">
                                  <input
                                    value={siteration}
                                    name="siteration"
                                    onChange={handleInput}
                                  />
                                  {siterationErr != "" && (
                                    <p className="alert-message">
                                      {siterationErr}
                                    </p>
                                  )}{" "}
                                </div>
                                <span>of {executionData.iterations}</span>
                              </div>
                              <div className="next">
                                {siteration != executionData.iterations && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementIteration()}
                                  />
                                )}
                                {siteration == executionData.iterations && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {siteration != executionData.iterations && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastIteration()}
                                  />
                                )}
                                {siteration == executionData.iterations && (
                                  <img
                                    src="imgs/right-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                              </div>
                            </div>
                            <div className="round">
                              <h3>Round</h3>
                              <div className="previous">
                                {sround == 1 && (
                                  <img
                                    src="imgs/left-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                                {sround != 1 && (
                                  <img
                                    src="imgs/left-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleFirstRound()}
                                  />
                                )}

                                {sround != 1 && (
                                  <img
                                    src="imgs/left-paging.svg"
                                    alt=""
                                    onClick={() => handleDecrementRound()}
                                  />
                                )}
                                {sround == 1 && (
                                  <img src="imgs/previous.svg" alt="" />
                                )}
                              </div>
                              <div className="iteration">
                                <div className="tooldrop">
                                  <input
                                    value={sround}
                                    name="sround"
                                    onChange={handleInput}
                                  />
                                  {sroundErr != "" && (
                                    <p className="alert-message">{sroundErr}</p>
                                  )}{" "}
                                </div>
                                <span>of {executionData.nb_rounds}</span>
                              </div>
                              <div className="next">
                                {sround != executionData.nb_rounds && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementRound()}
                                  />
                                )}
                                {sround == executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {sround != executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastRound()}
                                  />
                                )}
                                {sround == executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                              </div>
                            </div>
                            <div className="search-controls ms-5">
                              <button
                                className="search"
                                onClick={() => handleSearch()}
                              >
                                Search
                              </button>
                            </div>
                          </div>
                          {/* <div className="tabs"></div> */}
                          {/* </div> */}
                        </div>
                      </TabPanel>
                      <TabPanel className="trade-history-ws">
                        <div className="ws">
                          <div className="stabilization">
                            <p>Stabilization Fund :</p>
                            <ul className="stabilization-fund">
                              <li className="token-issued">
                                <label htmlFor="token">Token Issued</label>
                                <span>100</span>
                              </li>
                              <li className="assets">
                                <label htmlFor="asset">Assets (QTY)</label>
                                <span>200</span>
                              </li>
                              <li className="cash">
                                <label htmlFor="cash">Cash</label>
                                <span>200</span>
                              </li>
                            </ul>
                          </div>
                          <div className="search-round">
                            <div className="controls">
                              <h3>Iteration</h3>
                              <div className="previous">
                                {siteration == 1 && (
                                  <img
                                    src="imgs/left-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                                {siteration != 1 && (
                                  <img
                                    src="imgs/left-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleFirstIteration()}
                                  />
                                )}

                                {siteration != 1 && (
                                  <img
                                    src="imgs/left-paging.svg"
                                    alt=""
                                    onClick={() => handleDecrementIteration()}
                                  />
                                )}
                                {siteration == 1 && (
                                  <img src="imgs/previous.svg" alt="" />
                                )}
                              </div>
                              <div className="iteration">
                                <div className="tooldrop">
                                  {/*   <select name="" id="">
                                  <option value="5">1</option>
                                  <option value="10">10</option>
                                  <option value="20">20</option>
                                </select> */}
                                  <input
                                    value={siteration}
                                    name="siteration"
                                    onChange={handleInput}
                                  />
                                  {siterationErr != "" && (
                                    <p className="alert-message">
                                      {siterationErr}
                                    </p>
                                  )}
                                </div>
                                <span>of {executionData.iterations}</span>
                              </div>
                              <div className="next">
                                {siteration != executionData.iterations && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementIteration()}
                                  />
                                )}
                                {siteration == executionData.iterations && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {siteration != executionData.iterations && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastIteration()}
                                  />
                                )}
                                {siteration == executionData.iterations && (
                                  <img
                                    src="imgs/right-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                              </div>
                            </div>
                            <div className="round">
                              <h3>Round</h3>
                              <div className="previous">
                                {sround == 1 && (
                                  <img
                                    src="imgs/left-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                                {sround != 1 && (
                                  <img
                                    src="imgs/left-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleFirstRound()}
                                  />
                                )}

                                {sround != 1 && (
                                  <img
                                    src="imgs/left-paging.svg"
                                    alt=""
                                    onClick={() => handleDecrementRound()}
                                  />
                                )}
                                {sround == 1 && (
                                  <img src="imgs/previous.svg" alt="" />
                                )}
                              </div>
                              <div className="iteration">
                                <div className="tooldrop">
                                  <input
                                    value={sround}
                                    name="sround"
                                    onChange={handleInput}
                                  />
                                  {sroundErr != "" && (
                                    <p className="alert-message">{sroundErr}</p>
                                  )}
                                </div>
                                <span>of {executionData.nb_rounds}</span>
                              </div>
                              <div className="next">
                                {sround != executionData.nb_rounds && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementRound()}
                                  />
                                )}
                                {sround == executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {sround != executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastRound()}
                                  />
                                )}
                                {sround == executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                              </div>
                            </div>
                            <div className="search-controls ms-5">
                              <button
                                className="search"
                                onClick={() => handleSearch()}
                              >
                                Search
                              </button>
                            </div>
                          </div>
                          {loading == true && <Loader />}

                          <div className="ws-table">
                            <div className="table-responsive">
                              <div className="template-content">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th>Time</th>
                                      <th>Price</th>
                                      <th>Quantity</th>
                                    </tr>
                                  </thead>
                                  {tradeHistoryWS.length == 0 && (
                                    <tbody>
                                      <tr>
                                        <td colSpan={12}>
                                          <p className="no_Data_table">
                                            No Data Found
                                          </p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  )}
                                  <tbody>
                                    {tradeHistoryWS.map((item) => (
                                      <tr>
                                        <td>
                                          {moment(item.timestamp).format(
                                            "MM/DD/YYYY h:mm:ss A"
                                          )}
                                        </td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                          <div className="search-round">
                            <div className="controls">
                              <h3>Iteration</h3>
                              <div className="previous">
                                {siteration == 1 && (
                                  <img
                                    src="imgs/left-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                                {siteration != 1 && (
                                  <img
                                    src="imgs/left-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleFirstIteration()}
                                  />
                                )}

                                {siteration != 1 && (
                                  <img
                                    src="imgs/left-paging.svg"
                                    alt=""
                                    onClick={() => handleDecrementIteration()}
                                  />
                                )}
                                {siteration == 1 && (
                                  <img src="imgs/previous.svg" alt="" />
                                )}
                              </div>
                              <div className="iteration">
                                <div className="tooldrop">
                                  {/*   <select name="" id="">
                                  <option value="5">1</option>
                                  <option value="10">10</option>
                                  <option value="20">20</option>
                                </select> */}
                                  <input
                                    value={siteration}
                                    name="siteration"
                                    onChange={handleInput}
                                  />
                                  {siterationErr != "" && (
                                    <p className="alert-message">
                                      {siterationErr}
                                    </p>
                                  )}
                                </div>
                                <span>of {executionData.iterations}</span>
                              </div>
                              <div className="next">
                                {siteration != executionData.iterations && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementIteration()}
                                  />
                                )}
                                {siteration == executionData.iterations && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {siteration != executionData.iterations && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastIteration()}
                                  />
                                )}
                                {siteration == executionData.iterations && (
                                  <img
                                    src="imgs/right-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                              </div>
                            </div>
                            <div className="round">
                              <h3>Round</h3>
                              <div className="previous">
                                {sround == 1 && (
                                  <img
                                    src="imgs/left-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                                {sround != 1 && (
                                  <img
                                    src="imgs/left-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleFirstRound()}
                                  />
                                )}

                                {sround != 1 && (
                                  <img
                                    src="imgs/left-paging.svg"
                                    alt=""
                                    onClick={() => handleDecrementRound()}
                                  />
                                )}
                                {sround == 1 && (
                                  <img src="imgs/previous.svg" alt="" />
                                )}
                              </div>
                              <div className="iteration">
                                <div className="tooldrop">
                                  <input
                                    value={sround}
                                    name="sround"
                                    onChange={handleInput}
                                  />
                                  {sroundErr != "" && (
                                    <p className="alert-message">{sroundErr}</p>
                                  )}
                                </div>
                                <span>of {executionData.nb_rounds}</span>
                              </div>
                              <div className="next">
                                {sround != executionData.nb_rounds && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementRound()}
                                  />
                                )}
                                {sround == executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {sround != executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastRound()}
                                  />
                                )}
                                {sround == executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                              </div>
                            </div>
                            <div className="search-controls ms-5">
                              <button
                                className="search"
                                onClick={() => handleSearch()}
                              >
                                Search
                              </button>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel className="trade-history-ns">
                        <div className="ns">
                          <div className="search-round">
                            <div className="controls">
                              <h3>Iteration</h3>
                              <div className="previous">
                                {siteration == 1 && (
                                  <img
                                    src="imgs/left-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                                {siteration != 1 && (
                                  <img
                                    src="imgs/left-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleFirstIteration()}
                                  />
                                )}

                                {siteration != 1 && (
                                  <img
                                    src="imgs/left-paging.svg"
                                    alt=""
                                    onClick={() => handleDecrementIteration()}
                                  />
                                )}
                                {siteration == 1 && (
                                  <img src="imgs/previous.svg" alt="" />
                                )}
                              </div>
                              <div className="iteration">
                                <div className="tooldrop">
                                  {/*   <select name="" id="">
                                  <option value="5">1</option>
                                  <option value="10">10</option>
                                  <option value="20">20</option>
                                </select> */}
                                  <input
                                    value={siteration}
                                    name="siteration"
                                    onChange={handleInput}
                                  />
                                  {siterationErr != "" && (
                                    <p className="alert-message">
                                      {siterationErr}
                                    </p>
                                  )}
                                </div>
                                <span>of {executionData.iterations}</span>
                              </div>
                              <div className="next">
                                {siteration != executionData.iterations && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementIteration()}
                                  />
                                )}
                                {siteration == executionData.iterations && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {siteration != executionData.iterations && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastIteration()}
                                  />
                                )}
                                {siteration == executionData.iterations && (
                                  <img
                                    src="imgs/right-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                              </div>
                            </div>
                            <div className="round">
                              <h3>Round</h3>
                              <div className="previous">
                                {sround == 1 && (
                                  <img
                                    src="imgs/left-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                                {sround != 1 && (
                                  <img
                                    src="imgs/left-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleFirstRound()}
                                  />
                                )}

                                {sround != 1 && (
                                  <img
                                    src="imgs/left-paging.svg"
                                    alt=""
                                    onClick={() => handleDecrementRound()}
                                  />
                                )}
                                {sround == 1 && (
                                  <img src="imgs/previous.svg" alt="" />
                                )}
                              </div>
                              <div className="iteration">
                                <div className="tooldrop">
                                  {/*  <select name="" id="">
                                  <option value="5">3</option>
                                  <option value="10">10</option>
                                  <option value="20">20</option>
                                </select> */}
                                  <input
                                    value={sround}
                                    name="sround"
                                    onChange={handleInput}
                                  />
                                  {sroundErr != "" && (
                                    <p className="alert-message">{sroundErr}</p>
                                  )}
                                </div>
                                <span>of {executionData.nb_rounds}</span>
                              </div>
                              <div className="next">
                                {sround != executionData.nb_rounds && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementRound()}
                                  />
                                )}
                                {sround == executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {sround != executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastRound()}
                                  />
                                )}
                                {sround == executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                              </div>
                            </div>
                            <div className="search-controls ms-5">
                              <button
                                className="search"
                                onClick={() => handleSearch()}
                              >
                                Search
                              </button>
                            </div>
                          </div>
                          {loading == true && <Loader />}

                          <div className="ns-table">
                            <div className="table-responsive">
                              <div className="table-content">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th>Time</th>
                                      <th>Price</th>
                                      <th>Quantity</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {tradeHistoryNS.length == 0 && (
                                      <tbody>
                                        <tr>
                                          <td colSpan={12}>
                                            <p className="no_Data_table">
                                              No Data Found
                                            </p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    )}
                                    {tradeHistoryNS.map((item) => (
                                      <tr>
                                        <td>
                                          {moment(item.timestamp).format(
                                            "MM/DD/YYYY h:mm:ss A"
                                          )}
                                        </td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                          <div className="search-round">
                            <div className="controls">
                              <h3>Iteration</h3>
                              <div className="previous">
                                {siteration == 1 && (
                                  <img
                                    src="imgs/left-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                                {siteration != 1 && (
                                  <img
                                    src="imgs/left-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleFirstIteration()}
                                  />
                                )}

                                {siteration != 1 && (
                                  <img
                                    src="imgs/left-paging.svg"
                                    alt=""
                                    onClick={() => handleDecrementIteration()}
                                  />
                                )}
                                {siteration == 1 && (
                                  <img src="imgs/previous.svg" alt="" />
                                )}
                              </div>
                              <div className="iteration">
                                <div className="tooldrop">
                                  <input
                                    value={siteration}
                                    name="siteration"
                                    onChange={handleInput}
                                  />
                                  {siterationErr != "" && (
                                    <p className="alert-message">
                                      {siterationErr}
                                    </p>
                                  )}
                                </div>
                                <span>of {executionData.iterations}</span>
                              </div>
                              <div className="next">
                                {siteration != executionData.iterations && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementIteration()}
                                  />
                                )}
                                {siteration == executionData.iterations && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {siteration != executionData.iterations && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastIteration()}
                                  />
                                )}
                                {siteration == executionData.iterations && (
                                  <img
                                    src="imgs/right-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                              </div>
                            </div>
                            <div className="round">
                              <h3>Round</h3>
                              <div className="previous">
                                {sround == 1 && (
                                  <img
                                    src="imgs/left-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                                {sround != 1 && (
                                  <img
                                    src="imgs/left-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleFirstRound()}
                                  />
                                )}

                                {sround != 1 && (
                                  <img
                                    src="imgs/left-paging.svg"
                                    alt=""
                                    onClick={() => handleDecrementRound()}
                                  />
                                )}
                                {sround == 1 && (
                                  <img src="imgs/previous.svg" alt="" />
                                )}
                              </div>
                              <div className="iteration">
                                <div className="tooldrop">
                                  <input
                                    value={sround}
                                    name="sround"
                                    onChange={handleInput}
                                  />
                                  {sroundErr != "" && (
                                    <p className="alert-message">{sroundErr}</p>
                                  )}
                                </div>
                                <span>of {executionData.nb_rounds}</span>
                              </div>
                              <div className="next">
                                {sround != executionData.nb_rounds && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementRound()}
                                  />
                                )}
                                {sround == executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {sround != executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastRound()}
                                  />
                                )}
                                {sround == executionData.nb_rounds && (
                                  <img
                                    src="imgs/right-doublearrowg.svg"
                                    alt=""
                                  />
                                )}
                              </div>
                            </div>
                            <div className="search-controls ms-5">
                              <button
                                className="search"
                                onClick={() => handleSearch()}
                              >
                                Search
                              </button>
                            </div>
                          </div>
                        </div>
                      </TabPanel>

                      <TabPanel className="simulation-result">
                        <div className="simulation">
                          <div className="tabs">
                            <Tabs
                              selectedIndex={stablization}
                              onSelect={(
                                stablization: SetStateAction<number>
                              ) => setStablization(stablization)}
                            >
                              <TabList>
                                <Tab>Stabilization</Tab>
                                <Tab>Without Stablization</Tab>
                              </TabList>{" "}
                              <TabPanel>
                                <div className="tabs">
                                  {" "}
                                  <Tabs
                                    selectedIndex={tabName}
                                    onSelect={(
                                      tabName: SetStateAction<number>
                                    ) => setTabName(tabName)}
                                  >
                                    <TabList>
                                      <Tab>Price</Tab>
                                      <Tab>Volume</Tab>
                                      <Tab>Quantity</Tab>
                                    </TabList>{" "}
                                    <TabPanel>
                                      {" "}
                                      <div className="simulation-graph">
                                        <div className="simulationgraph-title">
                                          MARKET PRICE UPDATES
                                        </div>
                                        {loading == true && <Loader />}
                                        {graphDataWsIteration.length != 0 &&
                                          graphDataWsRound.length != 0 && (
                                            <CandleStickSimulation
                                              iteration={graphDataWsIteration}
                                              round={graphDataWsRound}
                                              noofiterations={
                                                executionData.iterations
                                              }
                                              noofrounds={
                                                executionData.nb_rounds
                                              }
                                            />
                                          )}

                                        <div className="simulation-table">
                                          <div className="table-responsive">
                                            <div className="template-content">
                                              <table className="table">
                                                <thead>
                                                  <tr>
                                                    <th className="emptycell"></th>
                                                    <th className="with">
                                                      With Stabilization
                                                    </th>
                                                    <th className="without">
                                                      Without Stabilization
                                                    </th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  <tr>
                                                    <th className="emptycell">
                                                      Mean
                                                    </th>
                                                    <td>
                                                      {
                                                        meanPriceSimulation.mean_price_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanPriceSimulation.mean_price_ns
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th className="emptycell">
                                                      Median
                                                    </th>
                                                    <td>
                                                      {
                                                        meanPriceSimulation.median_price_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanPriceSimulation.median_price_ns
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th className="emptycell">
                                                      Standard deviation
                                                    </th>
                                                    <td>
                                                      {
                                                        meanPriceSimulation.std_price_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanPriceSimulation.std_price_ns
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th className="emptycell">
                                                      10% - 90% interval
                                                    </th>
                                                    <td>
                                                      {
                                                        meanPriceSimulation.inter_10_price_ws
                                                      }
                                                      -
                                                      {
                                                        meanPriceSimulation.inter_90_price_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanPriceSimulation.inter_10_price_ns
                                                      }
                                                      -
                                                      {
                                                        meanPriceSimulation.inter_90_price_ns
                                                      }
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </div>{" "}
                                          </div>
                                        </div>
                                      </div>
                                    </TabPanel>
                                    <TabPanel>
                                      {" "}
                                      <div className="simulation-graph">
                                        <div className="simulationgraph-title">
                                          VOLUME UPDATES
                                        </div>
                                        {loading == true && <Loader />}
                                        {simulationVolumeData.length != 0 && (
                                          <BarGraph
                                            bardata={simulationVolumeData}
                                            type={"volume"}
                                          />
                                        )}

                                        <div className="simulation-table">
                                          <div className="table-responsive">
                                            <div className="template-content">
                                              <table className="table">
                                                <thead>
                                                  <tr>
                                                    <th className="emptycell"></th>
                                                    <th className="with">
                                                      With Stabilization
                                                    </th>
                                                    <th className="without">
                                                      Without Stabilization
                                                    </th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  <tr>
                                                    <th className="emptycell">
                                                      Mean
                                                    </th>
                                                    <td>
                                                      {
                                                        meanVolumeSimulation.mean_amt_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanVolumeSimulation.mean_amt_ws
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th className="emptycell">
                                                      Median
                                                    </th>
                                                    <td>
                                                      {
                                                        meanVolumeSimulation.median_amt_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanVolumeSimulation.median_amt_ws
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th className="emptycell">
                                                      Standard deviation
                                                    </th>
                                                    <td>
                                                      {
                                                        meanVolumeSimulation.std_amt_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanVolumeSimulation.std_amt_ns
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th className="emptycell">
                                                      10% - 90% interval
                                                    </th>
                                                    <td>
                                                      {
                                                        meanVolumeSimulation.inter_10_amt_ws
                                                      }
                                                      -
                                                      {
                                                        meanVolumeSimulation.inter_90_amt_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanVolumeSimulation.inter_10_amt_ns
                                                      }
                                                      -
                                                      {
                                                        meanVolumeSimulation.inter_90_amt_ns
                                                      }
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </TabPanel>
                                    <TabPanel>
                                      {" "}
                                      <div className="simulation-graph">
                                        <div className="simulationgraph-title">
                                          QUANTITY UPDATES
                                        </div>
                                        {loading == true && <Loader />}
                                        {simulationQuantityData.length != 0 && (
                                          <BarGraph
                                            bardata={simulationQuantityData}
                                            type={"quantity"}
                                          />
                                        )}

                                        <div className="simulation-table">
                                          <div className="table-responsive">
                                            <div className="template-content">
                                              <table className="table">
                                                <thead>
                                                  <tr>
                                                    <th className="emptycell"></th>
                                                    <th className="with">
                                                      With Stabilization
                                                    </th>
                                                    <th className="without">
                                                      Without Stabilization
                                                    </th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  <tr>
                                                    <th className="emptycell">
                                                      Mean
                                                    </th>
                                                    <td>
                                                      {
                                                        meanQuantitySimulation.mean_quant_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanQuantitySimulation.mean_quant_ns
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th className="emptycell">
                                                      Median
                                                    </th>
                                                    <td>
                                                      {
                                                        meanQuantitySimulation.median_quant_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanQuantitySimulation.median_quant_ns
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th className="emptycell">
                                                      Standard deviation
                                                    </th>
                                                    <td>
                                                      {
                                                        meanQuantitySimulation.std_quant_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanQuantitySimulation.std_quant_ns
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th className="emptycell">
                                                      10% - 90% interval
                                                    </th>
                                                    <td>
                                                      {
                                                        meanQuantitySimulation.inter_10_quant_ws
                                                      }
                                                      -
                                                      {
                                                        meanQuantitySimulation.inter_90_quant_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanQuantitySimulation.inter_10_quant_ns
                                                      }
                                                      -
                                                      {
                                                        meanQuantitySimulation.inter_90_quant_ns
                                                      }
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </TabPanel>
                                  </Tabs>
                                </div>
                              </TabPanel>
                              {/*  */}
                              <TabPanel>
                                <div className="tabs">
                                  {" "}
                                  <Tabs
                                    selectedIndex={tabName}
                                    onSelect={(
                                      tabName: SetStateAction<number>
                                    ) => setTabName(tabName)}
                                  >
                                    <TabList>
                                      <Tab>Price</Tab>
                                      <Tab>Volume</Tab>
                                      <Tab>Quantity</Tab>
                                    </TabList>{" "}
                                    <TabPanel>
                                      {" "}
                                      <div className="simulation-graph">
                                        <div className="simulationgraph-title">
                                          MARKET PRICE UPDATES
                                        </div>
                                        {loading == true && <Loader />}
                                        {graphDataNsIteration.length != 0 &&
                                          graphDataNsRound.length != 0 && (
                                            <CandleStickSimulation
                                              iteration={graphDataNsIteration}
                                              round={graphDataNsRound}
                                              noofiterations={
                                                executionData.iterations
                                              }
                                              noofrounds={
                                                executionData.nb_rounds
                                              }
                                            />
                                          )}

                                        <div className="simulation-table">
                                          <div className="table-responsive">
                                            <div className="template-content">
                                              <table className="table">
                                                <thead>
                                                  <tr>
                                                    <th className="emptycell"></th>
                                                    <th className="with">
                                                      With Stabilization
                                                    </th>
                                                    <th className="without">
                                                      Without Stabilization
                                                    </th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  <tr>
                                                    <th className="emptycell">
                                                      Mean
                                                    </th>
                                                    <td>
                                                      {
                                                        meanPriceSimulation.mean_price_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanPriceSimulation.mean_price_ns
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th className="emptycell">
                                                      Median
                                                    </th>
                                                    <td>
                                                      {
                                                        meanPriceSimulation.median_price_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanPriceSimulation.median_price_ns
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th className="emptycell">
                                                      Standard deviation
                                                    </th>
                                                    <td>
                                                      {
                                                        meanPriceSimulation.std_price_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanPriceSimulation.std_price_ns
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th className="emptycell">
                                                      10% - 90% interval
                                                    </th>
                                                    <td>
                                                      {
                                                        meanPriceSimulation.inter_10_price_ws
                                                      }
                                                      -
                                                      {
                                                        meanPriceSimulation.inter_90_price_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanPriceSimulation.inter_10_price_ns
                                                      }
                                                      -
                                                      {
                                                        meanPriceSimulation.inter_90_price_ns
                                                      }
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </div>{" "}
                                          </div>
                                        </div>
                                      </div>
                                    </TabPanel>
                                    <TabPanel>
                                      {" "}
                                      <div className="simulation-graph">
                                        <div className="simulationgraph-title">
                                          VOLUME UPDATES
                                        </div>
                                        {loading == true && <Loader />}
                                        {nsimulationVolumeData.length != 0 && (
                                          <BarGraph
                                            bardata={nsimulationVolumeData}
                                            type={"volume"}
                                          />
                                        )}

                                        <div className="simulation-table">
                                          <div className="table-responsive">
                                            <div className="template-content">
                                              <table className="table">
                                                <thead>
                                                  <tr>
                                                    <th className="emptycell"></th>
                                                    <th className="with">
                                                      With Stabilization
                                                    </th>
                                                    <th className="without">
                                                      Without Stabilization
                                                    </th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  <tr>
                                                    <th className="emptycell">
                                                      Mean
                                                    </th>
                                                    <td>
                                                      {
                                                        meanVolumeSimulation.mean_amt_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanVolumeSimulation.mean_amt_ws
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th className="emptycell">
                                                      Median
                                                    </th>
                                                    <td>
                                                      {
                                                        meanVolumeSimulation.median_amt_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanVolumeSimulation.median_amt_ws
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th className="emptycell">
                                                      Standard deviation
                                                    </th>
                                                    <td>
                                                      {
                                                        meanVolumeSimulation.std_amt_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanVolumeSimulation.std_amt_ns
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th className="emptycell">
                                                      10% - 90% interval
                                                    </th>
                                                    <td>
                                                      {
                                                        meanVolumeSimulation.inter_10_amt_ws
                                                      }
                                                      -
                                                      {
                                                        meanVolumeSimulation.inter_90_amt_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanVolumeSimulation.inter_10_amt_ns
                                                      }
                                                      -
                                                      {
                                                        meanVolumeSimulation.inter_90_amt_ns
                                                      }
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </TabPanel>
                                    <TabPanel>
                                      {" "}
                                      <div className="simulation-graph">
                                        <div className="simulationgraph-title">
                                          QUANTITY UPDATES
                                        </div>
                                        {loading == true && <Loader />}
                                        {nsimulationQuantityData.length !=
                                          0 && (
                                          <BarGraph
                                            bardata={nsimulationQuantityData}
                                            type={"quantity"}
                                          />
                                        )}

                                        <div className="simulation-table">
                                          <div className="table-responsive">
                                            <div className="template-content">
                                              <table className="table">
                                                <thead>
                                                  <tr>
                                                    <th className="emptycell"></th>
                                                    <th className="with">
                                                      With Stabilization
                                                    </th>
                                                    <th className="without">
                                                      Without Stabilization
                                                    </th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  <tr>
                                                    <th className="emptycell">
                                                      Mean
                                                    </th>
                                                    <td>
                                                      {
                                                        meanQuantitySimulation.mean_quant_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanQuantitySimulation.mean_quant_ns
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th className="emptycell">
                                                      Median
                                                    </th>
                                                    <td>
                                                      {
                                                        meanQuantitySimulation.median_quant_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanQuantitySimulation.median_quant_ns
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th className="emptycell">
                                                      Standard deviation
                                                    </th>
                                                    <td>
                                                      {
                                                        meanQuantitySimulation.std_quant_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanQuantitySimulation.std_quant_ns
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th className="emptycell">
                                                      10% - 90% interval
                                                    </th>
                                                    <td>
                                                      {
                                                        meanQuantitySimulation.inter_10_quant_ws
                                                      }
                                                      -
                                                      {
                                                        meanQuantitySimulation.inter_90_quant_ws
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        meanQuantitySimulation.inter_10_quant_ns
                                                      }
                                                      -
                                                      {
                                                        meanQuantitySimulation.inter_90_quant_ns
                                                      }
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </TabPanel>
                                  </Tabs>
                                </div>
                              </TabPanel>
                            </Tabs>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel className="stabilization-fund">
                        <div className="stabilization-tab">
                          <div className="stabilization">
                            <p>Stabilization Fund :</p>
                            <ul className="stabilization-fund">
                              <li className="token-issued">
                                <label htmlFor="token">Token Issued</label>
                                <span>100</span>
                              </li>
                              <li className="assets">
                                <label htmlFor="asset">Assets (QTY)</label>
                                <span>200</span>
                              </li>
                              <li className="cash">
                                <label htmlFor="cash">Cash</label>
                                <span>200</span>
                              </li>
                            </ul>
                          </div>
                          <div className="stabilization-table">
                            <div className="table-responsive">
                              <div className="template-content">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th className="emptycell"></th>
                                      <th>Cash</th>
                                      <th>Asset (Quantity)</th>
                                      <th>Total Assets ($)</th>
                                      <th>Total Assets/V</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <th className="emptycell">Mean</th>
                                      <td>
                                        {StablizationFundData.mean_cash_stab}
                                      </td>
                                      <td>
                                        {StablizationFundData.mean_asset_stab}
                                      </td>
                                      <td>
                                        {StablizationFundData.mean_total_stab}
                                      </td>
                                      <td>
                                        {StablizationFundData.mean_total_v_stab}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="emptycell">Median</th>
                                      <td>
                                        {StablizationFundData.median_cash_stab}
                                      </td>
                                      <td>
                                        {StablizationFundData.median_asset_stab}
                                      </td>
                                      <td>
                                        {StablizationFundData.median_total_stab}
                                      </td>
                                      <td>
                                        {
                                          StablizationFundData.median_total_v_stab
                                        }
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="emptycell">
                                        Standard deviation
                                      </th>
                                      <td>
                                        {StablizationFundData.std_cash_stab}
                                      </td>
                                      <td>
                                        {StablizationFundData.std_asset_stab}
                                      </td>
                                      <td>
                                        {StablizationFundData.std_total_stab}
                                      </td>
                                      <td>
                                        {StablizationFundData.std_total_v_stab}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="emptycell">
                                        10% - 90% interval
                                      </th>
                                      <td>
                                        {
                                          StablizationFundData.inter_10_cash_stab
                                        }
                                        -
                                        {
                                          StablizationFundData.inter_90_cash_stab
                                        }
                                      </td>
                                      <td>
                                        {
                                          StablizationFundData.inter_10_asset_stab
                                        }
                                        -
                                        {
                                          StablizationFundData.inter_90_asset_stab
                                        }
                                      </td>
                                      <td>
                                        {
                                          StablizationFundData.inter_10_total_stab
                                        }
                                        -
                                        {
                                          StablizationFundData.inter_90_total_stab
                                        }
                                      </td>
                                      <td>
                                        {
                                          StablizationFundData.inter_10_total_v_stab
                                        }
                                        -
                                        {
                                          StablizationFundData.inter_90_total_v_stab
                                        }
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                    </Tabs>
                    <ToastContainer />
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
