"use client";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { SetStateAction, useContext, useEffect, useState } from "react";
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
import { UserContext } from "./context";
import AppLayout from "@/components/layout/AppLayout";
import Loader from "@/components/layout/Loader";
import CandleStickSimulation from "./CandleStickSimulation";
import BarGraph from "./BarGraph";
import * as XLSX from "xlsx";

export default function Home() {
  const router = useRouter();
  const [runLoading, setRunLoading] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeButton, setActiveButton] = useState("Stabilization");

  const [scenarioType, setScenarioType] = useState("");
  const [scenarioTypeErr, setScenarioTypeErr] = useState("");
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
  const [finalErr, setFinalErr] = useState("");

  const [totalTempName, setTotalTempName] = useState(router.query.temp_name);
  const [publickey, setPublicKey] = useState(1);
  const [publickeyErr, setPublicKeyErr] = useState("");
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
  const [finalScenarios, setFinalScenarios] = useState([{ scenario_name: "" }]);
  const [finalDistributions, setFinalDistributions] = useState([{ name: "" }]);

  const [newtemplateName, setnewtemplateName] = useState("");
  const [newtemplateNameErr, setnewtemplateNameErr] = useState("");

  const [finalComments, setfinalComments] = useState("");
  const [finalCommentsErr, setfinalCommentsErr] = useState("");
  const [iterations, setIterations] = useState("");
  const [iterationsErr, setIterationsErr] = useState("");
  const [rounds, setRounds] = useState("");
  const [roundsErr, setRoundsErr] = useState("");
  const [ordersRound, setordersRound] = useState("");
  const [ordersRoundErr, setordersRoundErr] = useState("");
  const [ordersVar, setordersVar] = useState("");
  const [ordersVarErr, setordersVarErr] = useState("");
  const [executionId, setExecutionId] = useState("");
  const [siteration, setSIteration] = useState(1);

  const [siterationErr, setSIterationErr] = useState("");
  const [sroundErr, setSRoundErr] = useState("");

  const [sround, setSRound] = useState(1);
  const [tradeHistoryWS, setTradeHistoryWS] = useState([
    { price: "", quantity: "", timestamp: "" },
  ]);
  const [tradeHistoryNS, setTradeHistoryNS] = useState([
    { price: "", quantity: "", timestamp: "" },
  ]);
  const [type, setType] = useState("price");

  const { loginexid, setloginexid } = useContext(UserContext);
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

  const [loading, setLoading] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [graphDataWsIteration, setgraphDataWsIteration] = useState([]);
  const [graphDataWsRound, setgraphDataWsRound] = useState([]);
  const [graphDataNsIteration, setgraphDataNsIteration] = useState([]);
  const [graphDataNsRound, setgraphDataNsRound] = useState([]);
  const [simulationQuantityData, setSimulationQuantityData] = useState([]);
  const [simulationVolumeData, setSimulationVolumeData] = useState([]);

  const [nsimulationQuantityData, setNSimulationQuantityData] = useState([]);
  const [nsimulationVolumeData, setNSimulationVolumeData] = useState([]);
  const [tabName, setTabName] = useState(0);
  const [stablization, setStablization] = useState(0);

  const [meanPriceSimulation, setMeanPriceSimulation] = useState({
    inter_10_price_ns: '',
    inter_10_price_ws: '',
    inter_90_price_ns: '',
    inter_90_price_ws: '',
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
    inter_10_amt_ns: '',
    inter_10_amt_ws: '',
    inter_90_amt_ns: '',
    inter_90_amt_ws: '',
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
    inter_10_quant_ns: '',
    inter_10_quant_ws: '',
    inter_90_quant_ns: '',
    inter_90_quant_ws: '',
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
    inter_10_asset_stab: '',
    inter_10_cash_stab: '',
    inter_10_total_stab: '',
    inter_10_total_v_stab: '',
    inter_90_asset_stab: '',
    inter_90_cash_stab: '',
    inter_90_total_stab: '',
    inter_90_total_v_stab: '',
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
  const [TradeStablizationTotal, setTradeStablizationTotal] = useState({
    round_assets: 0,
    round_cash: 0,
    round_tk: 0,
  });

  const [userId, setUserId] = useState("");

  useEffect(() => {
    console.log(totalTempName);
    if (
      totalTempName == undefined ||
      totalTempName == "" ||
      totalTempName == null
    ) {
      router.push("/runSimulation");
    } else {
      let email = localStorage.getItem("useremail");
      console.log("email");
      getEmailInfo(email);

      getTemplateDetails(totalTempName);
      getDistributions();
      console.log(tabIndex);
      // let executionId = 106;
      console.log("executionId", executionId);

      if (executionId != "") {
        getSimulationResultDetails(executionId);
        getSimulationVolumeResultDetails(executionId);
        getSimulationQuantityResultDetails(executionId);
        getStablizationFund(executionId);
      }

      if (tabIndex == 1) {
        setSIteration(1);
        setSRound(1);
        getOrderBook(executionId, 1, 1);
      }
      if (tabIndex == 2) {
        setSIteration(1);
        setSRound(1);
        getOrderBook(executionId, 1, 1);
      }

      if (tabIndex == 3) {
        setSIteration(1);
        setSRound(1);
        getTradeHistoryWS(executionId, 1, 1);
      }
      if (tabIndex == 4) {
        setSIteration(1);
        setSRound(1);
        getTradeHistoryNS(executionId, 1, 1);
      }
      if (tabIndex == 5) {
        console.log("tab-------------------", tabName);
        if (tabName === 0) {
          getSimulationResultDetails(executionId);
        }
        if (tabName === 1) {
          getSimulationVolumeResultDetails(executionId);
        }
        if (tabName === 2) {
          getSimulationQuantityResultDetails(executionId);
        }
      }

      if (tabIndex == 6) {
        getStablizationFund(executionId);
      }
      console.log("tabIndex", tabIndex);
    }
  }, [totalTempName, tabIndex, executionId, tabName, stablization]);

  const getEmailInfo = async (email: any) => {
    const result = await API_Auth.getAdminInformation(email);
    console.log(result);
    setUserId(result.id);
  };
  const getStablizationFund = async (id: any) => {
    setLoading(true);
    const result = await API_Auth.getStablizationFundDetails(id);
    setLoading(false);
    if (result.status == 400) {
      setStablizationFundData(StablizationFundData);
      setStablizationTotal(StablizationTotal);
    } else {
      console.log("StablizationFund", result);
      setStablizationFundData(
        result.stab == undefined ? StablizationFundData : result.stab
      );
      setStablizationTotal(result.stab_totals.stab_totals);
    }
  };
  const getSimulationResultDetails = async (id: any) => {
    setLoading(true);
    const result = await API_Auth.getSimulationResult(id, "price");
    console.log("simulationresult", result);
    setLoading(false);

    if (result.status == 400) {
      setgraphDataWsIteration([]);
      setgraphDataWsRound([]);
      setgraphDataNsIteration([]);
      setgraphDataNsRound([]);
    } else {
      setgraphDataWsIteration(result.graphDataWS.byiter);
      setgraphDataWsRound(result.graphDataWS.byround);
      setgraphDataNsIteration(result.graphDataNS.byiter);
      setgraphDataNsRound(result.graphDataNS.byround);
      setMeanPriceSimulation(
        result.sim == undefined ? meanPriceSimulation : result.sim
      );
    }
  };
  const getSimulationQuantityResultDetails = async (executionId: any) => {
    setLoading(true);
    const result = await API_Auth.getSimulationResult(executionId, "quantity");
    console.log("quantityresult", result);
    console.log("quantity--------------------------->");
    setLoading(false);

    if (result.status == 400) {
      setSimulationQuantityData([]);
      setNSimulationQuantityData([]);
    } else {
      setSimulationQuantityData(result.graphDataWS);
      setNSimulationQuantityData(result.graphDataNS);
      setMeanQuantitySimulation(
        result.sim == undefined ? meanQuantitySimulation : result.sim
      );
    }
  };

  const getSimulationVolumeResultDetails = async (executionId: any) => {
    setLoading(true);
    const result = await API_Auth.getSimulationResult(executionId, "volume");
    console.log("volumeresult", result);
    console.log("volume--------------------------->");
    setLoading(false);

    if (result.status == 400) {
      setSimulationVolumeData([]);
      setNSimulationVolumeData([]);
    } else {
      setSimulationVolumeData(result.graphDataWS);
      setNSimulationVolumeData(result.graphDataNS);
      setMeanVolumeSimulation(
        result.sim == undefined ? meanVolumeSimulation : result.sim
      );
      setLoading(false);
    }
  };

  const getOrderBook = async (id: any, siteration: any, sround: any) => {
    setLoading(true);

    const result = await API_Auth.getOrderDetails(id, siteration, sround);
    console.log("orderresult", result);
    setLoading(false);

    setorderWsbuy(result.ordersWSBuy);
    setorderWssell(result.ordersWSSell);
    setorderNsbuy(result.ordersNSBuy);
    setorderNssell(result.ordersNSSell);
  };
  const getTradeHistoryWS = async (id: any, siteration: any, sround: any) => {
    setLoading(true);

    const result = await API_Auth.getTradeHistoryWithStablization(
      id,
      siteration,
      sround
    );
    console.log("tadingws", result.trade, result);
    setLoading(false);

    setTradeHistoryWS(result.trades);
    setTradeStablizationTotal(result.stab_totals==undefined ? TradeStablizationTotal:result.stab_totals)
  };
  const getTradeHistoryNS = async (id: any, siteration: any, sround: any) => {
    setLoading(true);

    const result = await API_Auth.getTradeHistoryWithoutStablization(
      id,
      siteration,
      sround
    );
    console.log("tadingns", result.trade);
    setTradeHistoryNS(result.trade);
    setLoading(false);
  };
  const getDistributions = async () => {
    const result = await API_Auth.getDistributions();
    console.log("distributions", result);
    setFinalDistributions(result.distributions);
  };

  const getTemplateDetails = async (totalTempName: any) => {
    // const result=API_Auth.getTemplateDetails(totalTempName);

    let body = {
      temp_name: totalTempName,
      admin_id: "",
      scenario: "",
      datefrom: "",
      dateto: "",
      limit: 1,
      offset: 0,
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

  const editCreateTemplate = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const handleButtonClick = (buttonName: SetStateAction<string>) => {
    console.log(buttonName);
    const key = buttonName == "Stablization" ? 0 : 1
    setActiveButton(buttonName);
    setStablization(key)
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
    if (name == "publickey") {
      setPublicKey(Number(value));
    }

    if (name == "devpricebuy") {
      setDevPricebuy(value);
    }
    if (name == "devpricesell") {
      setDevPricesell(value);
    }
    if (name == "meanpricebuy") {
      setMeanPricebuy(value);
    }

    if (name == "meanpricesell") {
      setMeanPricesell(value);
    }
    if (name == "devqty") {
      setDevqty(value);
    }
    if (name == "meanqty") {
      setMeanqty(value);
    }
    if (name == "finalComments") {
      setfinalComments(value);
    }
    if (name == "newtemplateName") {
      setnewtemplateName(value);
    }
    if (name == "iterations") {
      setIterations(value);
    }
    if (name == "rounds") {
      setRounds(value);
    }
    if (name == "ordersRound") {
      setordersRound(value);
    }
    if (name == "ordersVar") {
      setordersVar(value);
    }
    if (name == "siteration") {
      setSIteration(value);
    }
    if (name == "sround") {
      setSRound(value);
    }
  };

  const handleCreateTemplate = () => {
    let error = 0;
    if (scenarioType === "") {
      setScenarioTypeErr("Please select scenario");
      error = error + 1;
    } else {
      setScenarioTypeErr("");
    }
    if (inititalmarketprice === "") {
      setinititalmarketpriceErr("Please Enter Initial Market Price");
      error = error + 1;
    } else {
      setinititalmarketpriceErr("");
    }
    if (basequantity === "") {
      setbasequantityErr("Please Enter Base Quantity");
      error = error + 1;
    } else {
      setbasequantityErr("");
    }
    if (alpha0 === "") {
      setalpha0Err("Please Enter Alpha 0");
      error = error + 1;
    } else {
      setalpha0Err("");
    }
    if (theta0 === "") {
      settheta0Err("Please Enter Theta 0");
      error = error + 1;
    } else {
      settheta0Err("");
    }
    if (distribution === "") {
      setdistributionErr("Please Enter Distribution");
      error = error + 1;
    } else {
      setdistributionErr("");
    }
    if (templatename === "") {
      settemplatenameErr("Please Enter Template Name");
      error = error + 1;
    } else {
      settemplatenameErr("");
    }
    if (pricelimit === "") {
      setpricelimitErr("Please Enter Price Variance Limit");
      error = error + 1;
    } else {
      setpricelimitErr("");
    }
    if (quantitylimit === "") {
      setquantitylimitErr("Please Enter Quantity Variance Limit");
      error = error + 1;
    } else {
      setquantitylimitErr("");
    }
    if (upperbound === "") {
      setupperboundErr("Please Enter Upper Bound");
      error = error + 1;
    } else {
      setupperboundErr("");
    }
    if (lowerbound === "") {
      setlowerboundErr("Please Enter Lower Bound");
      error = error + 1;
    } else {
      setlowerboundErr("");
    }
    if (alpha1 === "") {
      setalpha1Err("Please Enter Alpha 1");
      error = error + 1;
    } else {
      setalpha1Err("");
    }
    if (theta1 === "") {
      settheta1Err("Please Enter Theta 1");
      error = error + 1;
    } else {
      settheta1Err("");
    }
    if (comment === "") {
      setcommentErr("Please Enter Comment");
      error = error + 1;
    } else {
      setcommentErr("");
    }
    if (distribution == "normal") {
      if (devpricebuy === "") {
        setDevPricebuyErr("Please Enter Standard Deviation Price Buy");
        error = error + 1;
      } else {
        setDevPricebuyErr("");
      }
      if (devpricesell === "") {
        setDevPricesellErr("Please Enter Standard Deviation Price Sell");
        error = error + 1;
      } else {
        setDevPricesellErr("");
      }
      if (devqty === "") {
        setDevqtyErr("Please Enter Standard Deviation Qunatity");
        error = error + 1;
      } else {
        setDevqtyErr("");
      }
    }
    if (distribution == "poisson" || distribution == "normal") {
      if (meanpricebuy === "") {
        setMeanPricebuyErr("Please Enter Mean Price Buy");
        error = error + 1;
      } else {
        setMeanPricebuyErr("");
      }

      if (meanpricesell === "") {
        setMeanPricesellErr("Please Enter Mean Price Sell");
        error = error + 1;
      } else {
        setMeanPricesellErr("");
      }

      if (meanqty === "") {
        setMeanqtyErr("Please Enter Mean Qunatity");
        error = error + 1;
      } else {
        setMeanqtyErr("");
      }
    }

    if (publickey == 2) {
      setPublicKeyErr("Please Select Public value");
      error = error + 1;
    } else {
      setPublicKeyErr("");
    }

    console.log(error);
    if (error == 0) {
      setShowModal(true);
    }
  };
  const handleSaveTemplate = async () => {
    let error = 0;
    if (newtemplateName === "") {
      setnewtemplateNameErr("Please Enter Template Name");
      error = error + 1;
    } else {
      setnewtemplateNameErr("");
    }
    if (finalComments == "") {
      setfinalCommentsErr("Please Enter Comments");
      error = error + 1;
    } else {
      setfinalCommentsErr("");
    }
    if (error == 0) {
      let body = {
        temp_name: newtemplateName,
        scenario_name: scenarioType,
        initial_mkt_price: Number(inititalmarketprice),
        price_var: Number(pricelimit),
        base_quant: Number(basequantity),
        quant_var: Number(quantitylimit),
        alpha0: Number(alpha0),
        alpha1: Number(alpha1),
        theta0: Number(theta0),
        theta1: Number(theta1),
        distribution: distribution,
        comments: finalComments,
        is_public: publickey,
        std_dev_price_buy: distribution == "normal" ? Number(devpricebuy) : 0,
        std_dev_price_sell: distribution == "normal" ? Number(devpricesell) : 0,
        std_dev_quant: distribution == "normal" ? Number(devqty) : 0,
        mean_price_buy:
          distribution == "poisson" || distribution == "normal"
            ? Number(meanpricebuy)
            : 0,
        mean_price_sell:
          distribution == "poisson" || distribution == "normal"
            ? Number(meanpricesell)
            : 0,
        mean_quant:
          distribution == "poisson" || distribution == "normal"
            ? Number(meanqty)
            : 0,
        admin_id: userId,
        limit_order_upper_bound: upperbound,
        limit_order_lower_bound: lowerbound,
      };
      console.log(body);
      if (Number(pricelimit) > 1 || Number(quantitylimit) > 1) {
        setFinalErr("price or quant variance should be less than 1");
      } else if (Number(upperbound) > 1) {
        setFinalErr("upper lmt order price variance should be less than 1");
      } else if (Number(lowerbound) < 1) {
        setFinalErr("lower lmt order price variance should be greater than 1");
      } else if (Number(alpha0) > 1) {
        toast.error("alpha0 value should be less than 1");
      } else if (Number(alpha0) > Number(alpha1)) {
        toast.error("alpha1 value should be greater than alpha0");
      } else if (Number(theta0) > 1) {
        toast.error("theta0 value should be less than 1");
      } else if (Number(theta0) > Number(theta1)) {
        toast.error("theta1 value should be greater than theta0");
      } else {
        const template_exist = await API_Auth.getTemplateExists(
          newtemplateName
        );
        console.log("template_exist", template_exist);
        if (template_exist.name_available == false) {
          setFinalErr("Template Name Already Exists");
        } else {
          setFinalErr("");
          const data = await API_Auth.createTemplate(body);
          console.log(data);
        /*   if ((data.error! = "" || data.error == undefined)) {
            console.log("hello");
            toast.success("Template Created Successfully");
            setTimeout(() => {
              router.push("/runSimulation");
            }, 2000);
          } else {
            setFinalErr("Duplicate Entries Exists");
          } */

          if(data.result.status=="duplicate found"){
            setDisableSubmit(false);
            setFinalErr(data.result.status);
          }else if(data.result.status=="success"){
            setFinalErr("")
            toast.success("Template Created Successfully");
            const superadminkey = localStorage.getItem("superadmin");
            console.log("superadmin", superadminkey);
            setTimeout(() => {
              router.push("/runSimulation");
            }, 2000);
          }else{
  
          }
        }
      }
    }
  };
  const handleRunSimulation = async () => {
    setTabIndex(0);
    let error = 0;
    if (iterations == "") {
      error = error + 1;
      setIterationsErr("Please Enter Iterations");
    } else if (/^\d+$/.test(iterations) == false) {
      setIterationsErr(" Iteration Value accepts only integers");
      error = error + 1;
    } else {
      setIterationsErr("");
    }
    if (rounds == "") {
      error = error + 1;
      setRoundsErr("Please Enter rounds");
    } else if (/^\d+$/.test(rounds) == false) {
      setRoundsErr(" Round Value accepts only integers");
      error = error + 1;
    } else {
      setRoundsErr("");
    }
    if (ordersRound == "") {
      error = error + 1;
      setordersRoundErr("Please Enter Orders");
    } else if (/^\d+$/.test(ordersRound) == false) {
      setordersRoundErr(" Order Value accepts only integers");
      error = error + 1;
    } else {
      setordersRoundErr("");
    }
    if (ordersVar == "") {
      error = error + 1;
      setordersVarErr("Please Enter Order Variance");
    } else if (Number(ordersVar) > 1) {
      error = error + 1;
      setordersVarErr("order variance should be less than 1");
    } else {
      setordersVarErr("");
    }
    if (error == 0) {
      // setDisableSubmit(true)
      setRunLoading(true);
      let body = {
        temp_name: templatename,
        nb_rounds: Number(rounds),
        nb_orders: Number(ordersRound),
        nb_orders_var: Number(ordersVar),
        admin_id: userId,
        iterations: Number(iterations),
        dynamic: 1,
      };
      try {
        const result = await API_Auth.runSimulation(body);
        console.log(result);
        setRunLoading(false);
        if (result.status == 400) {
          toast.error(result.msg);
          setDisableSubmit(false);
        } else {
          console.log(result.exe);
          window.scrollTo({
            top: 0,
            behavior: "smooth", // smooth scrolling behavior
          });
          toast.success("Execution done successfully");
          setExecutionId(result.exe);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        //toast.error(error);
      }
    }
  };

  const handleSearch = () => {
    let error = 0;

    if (siteration.toString() == "") {
      error = error + 1;
      setSIterationErr("Please Enter Iteration");
    } else if (Number(siteration) > Number(iterations)) {
      error = error + 1;
      toast.error("Iteration should not be greater than " + iterations);
    } else {
      setSIterationErr("");
    }
    if (sround.toString() == "") {
      error = error + 1;
      setSRoundErr("Please Enter Round");
    } else if (Number(sround) > Number(rounds)) {
      error = error + 1;
      toast.error("Round should not be greater than " + rounds);
    } else {
      setSRoundErr("");
    }

    if (error == 0) {
      if (tabIndex == 1) {
        getOrderBook(executionId, siteration, sround);
      }
      if (tabIndex == 2) {
        getOrderBook(executionId, siteration, sround);
      }

      if (tabIndex == 3) {
        getTradeHistoryWS(executionId, siteration, sround);
      }
      if (tabIndex == 4) {
        getTradeHistoryNS(executionId, siteration, sround);
      }
      if (tabIndex == 5) {
        console.log("tab-------------------", tabName);
        if (tabName === 0) {
          getSimulationResultDetails(executionId);
        }
        if (tabName === 1) {
          getSimulationVolumeResultDetails(executionId);
        }
        if (tabName === 2) {
          getSimulationQuantityResultDetails(executionId);
        }
      }

      if (tabIndex == 6) {
        getStablizationFund(executionId);
      }
      console.log("tabIndex", tabIndex);
    }
  };

  const handleFirstIteration = () => {
    setSIteration(1);
  };
  const handleLastIteration = () => {
    setSIteration(Number(iterations));
  };
  const handleIncrementIteration = () => {
    if (Number(siteration) > Number(iterations)) {
      toast.error("Iteration should not be greater than " + iterations);
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
    setSRound(Number(rounds));
  };
  const handleIncrementRound = () => {
    if (Number(sround) > Number(rounds)) {
      toast.error("Rounds should not be greater than " + rounds);
    } else {
      let x = Number(sround) + 1;
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

  const handleDownloadPDF = () => {
    router.push({
      pathname: "/reportpdf",
      query: { temp_name: totalTempName, exe_id: executionId },
    });
  };

  const handleDownloadExcel = async () => {
    let body = {
      temp_name: totalTempName,
      creator: "",
      scenario: "",
      datefrom: "",
      dateto: "",
      limit: 1,
      offset: 0,
      execution_id: executionId,
    };
    const result = await API_Auth.getSimulationHistory(body);
    console.log(
      "execution",
      result,
      parseInt(result.simulations[0].iterations)
    );

    let finalbody = {
      temp_name: totalTempName,
      admin_id: "",
      scenario: "",
      datefrom: "",
      dateto: "",
      limit: 1,
      offset: 0,
      showPrivate: true,
    };

    console.log(body);
    const finalresult = await API_Auth.getAllTemplates(finalbody);

    console.log("result", finalresult);
    console.log(finalresult.templates[0]);
    var keydata = finalresult.templates[0];
    keydata["Iteartions"] = result.simulations[0].iterations;
    keydata["Orders"] = result.simulations[0].nb_orders;
    keydata["rounds"] = result.simulations[0].nb_rounds;
    keydata["oder_variance"] = result.simulations[0].nb_orders_var;
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

    const meanPrice = await API_Auth.getSimulationResult(executionId, "price");
    console.log("meanPrice", meanPrice.sim);
    const MeanPriceSimulation =
      meanPrice.sim == undefined ? meanPriceSimulation : meanPrice.sim;

    const withStabilizationData: any = {
      Template: totalTempName,
      Mean: MeanPriceSimulation.mean_price_ws,
      Median: MeanPriceSimulation.median_price_ws,
      "Standard deviation": MeanPriceSimulation.std_price_ws,
      "10%-90% Interval":
        MeanPriceSimulation.inter_10_price_ws +
        "-" +
        MeanPriceSimulation.inter_90_price_ws,
    };
    const withoutStabilizationData: any = {
      Template: totalTempName,
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
      executionId,
      "volume"
    );
    console.log("meanVolume", meanVolume.sim);
    const MeanVolumeSimulation =
      meanVolume.sim == undefined ? meanVolumeSimulation : meanVolume.sim;

    const withStabilizationDataVOlume: any = {
      Template: totalTempName,
      Mean: MeanVolumeSimulation.mean_amt_ws,
      Median: MeanVolumeSimulation.median_amt_ws,
      "Standard deviation": MeanVolumeSimulation.std_amt_ws,
      "10%-90% interval":
        MeanVolumeSimulation.inter_10_amt_ws +
        "-" +
        MeanVolumeSimulation.inter_90_amt_ws,
    };
    const withoutStabilizationDataVolume: any = {
      Template: totalTempName,
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

    const meanqty = await API_Auth.getSimulationResult(executionId, "quantity");
    console.log("meanqty", meanqty.sim);
    const meanqtysimulation =
      meanqty.sim == undefined ? meanQuantitySimulation : meanqty.sim;

    const withStabilizationDataQty: any = {
      Template: totalTempName,
      Mean: meanqtysimulation.mean_quant_ws,
      Median: meanqtysimulation.median_quant_ws,
      "Standard deviation": meanqtysimulation.std_quant_ws,
      "10%-90% interval":
        meanqtysimulation.inter_10_quant_ws +
        "-" +
        meanqtysimulation.inter_90_quant_ws,
    };
    const withoutStabilizationDataQty: any = {
      Template: totalTempName,
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

    const stabresult = await API_Auth.getStablizationFundDetails(executionId);
    console.log("StablizationFund", stabresult);
    const totalfundata =
      stabresult.stab == undefined ? StablizationFundData : stabresult.stab;

    const withCash: any = {
      temp_name: totalTempName,
      mean: totalfundata.mean_cash_stab,
      median: totalfundata.median_cash_stab,
      "Standard Deviation": totalfundata.std_cash_stab,
      "10%-90% Interval":
        totalfundata.inter_10_cash_stab + "-" + totalfundata.inter_90_cash_stab,
    };
    const withArrayQuantity: any = {
      temp_name: totalTempName,
      mean: totalfundata.mean_cash_stab,
      median: totalfundata.median_cash_stab,
      "Standard Deviation": totalfundata.std_cash_stab,
      "10%-90% Interval":
        totalfundata.inter_10_cash_stab + "-" + totalfundata.inter_90_cash_stab,
    };
    const withTotalAssetV: any = {
      temp_name: totalTempName,
      mean: totalfundata.mean_cash_stab,
      median: totalfundata.median_cash_stab,
      "Standard Deviation": totalfundata.std_cash_stab,
      "10%-90% Interval":
        totalfundata.inter_10_cash_stab + "-" + totalfundata.inter_90_cash_stab,
    };
    const withTotalAssetDollar: any = {
      temp_name: totalTempName,
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

    XLSX.writeFile(wb, totalTempName + "Report.xlsx");
  };
  const handleBack = () => {
    router.back();
  };

  return (
    <AppLayout>
      <div className="container-fluid">
        <div className="simulation-info run">
          <div
            className="template-header"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="back-option" onClick={() => handleBack()}>
              <img src="imgs/left-arrow.svg" alt="" />
              <p className="mb-0">Back</p>
            </div>
            <div className="main-header"></div>
            {executionId != "" && (
              <div className="right-head info">
                {/* <div className="format"> */}
                <p>Download Report :</p>
                <div className="file-type">
                  <Button>
                    <a onClick={() => handleDownloadPDF()}>
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
            )}
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
                    <div className="head">
                      <div className="left-head">Template Details</div>
                    </div>
                    <div className="bottom-head">
                      <div className="title">{templatename}</div>
                    </div>
                    <div className="details-section">
                      <div className="template-details">
                        <div className="left-tables">
                          <div className="table-responsive">
                            <div className="template-content">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Scenario Type*</th>
                                    <th>{scenarioType}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Initial Market Price*</td>
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
                                    <td>Price Variance Limit*</td>
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
                                    <td>Base Quantity*</td>
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
                                    <td>Quantity Variance Limit*</td>
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
                                    <td>Limit Order Upper Bound*</td>
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
                                    <td>Limit Order Lower Bound*</td>
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
                                    <td>Alpha 0*</td>
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
                                    <td>Alpha 1*</td>
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
                                    <td>Theta 0*</td>
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
                                    <td>Theta 1*</td>
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
                                    <td>Distribution*</td>
                                    <td>
                                      <select
                                        name="distribution"
                                        id="distribution"
                                        value={distribution}
                                        onChange={handleInput}
                                        required
                                      >
                                        <option value="">
                                          Select Distribution Type
                                        </option>
                                        {finalDistributions.map((item) => (
                                          <option
                                            key={item?.name}
                                            value={item?.name}
                                          >
                                            {item?.name}
                                          </option>
                                        ))}{" "}
                                      </select>
                                      {distributionErr != "" && (
                                        <p className="alert-message">
                                          {distributionErr}
                                        </p>
                                      )}
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
                                    <td>Number Of Iterations*</td>
                                    <td>
                                      <input
                                        type="number"
                                        id="iterations"
                                        name="iterations"
                                        required
                                        value={iterations}
                                        onChange={handleInput}
                                      />
                                      {iterationsErr != "" && (
                                        <p className="alert-message">
                                          {iterationsErr}
                                        </p>
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Number Of Rounds*</td>
                                    <td>
                                      <input
                                        type="number"
                                        id="rounds"
                                        name="rounds"
                                        required
                                        value={rounds}
                                        onChange={handleInput}
                                      />
                                      {roundsErr != "" && (
                                        <p className="alert-message">
                                          {roundsErr}
                                        </p>
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Number Of Orders In Each Round*</td>
                                    <td>
                                      <input
                                        type="number"
                                        id="ordersRound"
                                        name="ordersRound"
                                        required
                                        value={ordersRound}
                                        onChange={handleInput}
                                      />
                                      {ordersRoundErr != "" && (
                                        <p className="alert-message">
                                          {ordersRoundErr}
                                        </p>
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Orders Variance</td>
                                    <td>
                                      <input
                                        type="number"
                                        id="ordersVar"
                                        name="ordersVar"
                                        required
                                        value={ordersVar}
                                        onChange={handleInput}
                                      />
                                      {ordersVarErr != "" && (
                                        <p className="alert-message">
                                          {ordersVarErr}
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
                              <div className="form-control visibility">
                                <label htmlFor="accessible">Visibility*</label>
                                <div className="radio-button">
                                  <div className="form-check form-check-inline">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="publickey"
                                      id="inlineRadio1"
                                      value={1}
                                      checked={publickey === 1}
                                      onChange={handleInput}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="inlineRadio1"
                                    >
                                      Public
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="publickey"
                                      id="inlineRadio2"
                                      value={0}
                                      checked={publickey === 0}
                                      onChange={handleInput}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="inlineRadio2"
                                    >
                                      Private
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-comment">
                          <div className="form-content comment">
                            <label htmlFor="comment">
                              Comment <span>(Optional)</span>
                            </label>
                            <textarea
                              className="form-control"
                              id="comment"
                              rows={2}
                              value={comment}
                              onChange={handleInput}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      {runLoading == true && <Loader></Loader>}
                      <div className="modal-buttons">
                        <button
                          className="run-simulation"
                          onClick={() => handleRunSimulation()}
                        >
                          Run Simulation
                        </button>
                        <button
                          className="create-template"
                          onClick={() => handleCreateTemplate()}
                        >
                          Save As New Template{" "}
                        </button>

                        <Modal
                          show={showModal}
                          onHide={handleCloseModal}
                          className="energy-efficiency"
                        >
                          <Modal.Header className="custom-header">
                            <img
                              src="imgs/close-black.svg"
                              alt=""
                              onClick={handleClose}
                            />
                          </Modal.Header>
                          <Modal.Body>
                            {" "}
                            <div className="modal-details">
                              <div className="save">
                                <label htmlFor="">Save As</label>
                                <input
                                  type="text"
                                  name="newtemplateName"
                                  value={newtemplateName}
                                  onChange={handleInput}
                                />
                                {newtemplateNameErr != "" && (
                                  <p className="alert-message">
                                    {newtemplateNameErr}
                                  </p>
                                )}{" "}
                              </div>
                              <div className="comment">
                                <label htmlFor="">Comment</label>
                                <input
                                  type="text"
                                  name="finalComments"
                                  value={finalComments}
                                  onChange={handleInput}
                                />
                                {finalCommentsErr != "" && (
                                  <p className="alert-message">
                                    {finalCommentsErr}
                                  </p>
                                )}

                                {finalErr != "" && (
                                  <p className="alert-message">{finalErr}</p>
                                )}
                              </div>
                            </div>
                          </Modal.Body>
                          <div className="modal-button">
                            <button
                              className="create-template"
                              btn-close-black
                              onClick={() => handleSaveTemplate()}
                            >
                              Save Changes
                            </button>
                            <button className="cancel" onClick={handleClose}>
                              Cancel
                            </button>
                          </div>
                        </Modal>
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
                      className={
                        activeButton === "Static" ? "btn active" : "btn"
                      }
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
                        {executionId != "" && (
                          <Tab>
                            Order Book <span>(Stabilization)</span>
                          </Tab>
                        )}
                        {executionId != "" && <Tab>Order Book</Tab>}
                        {executionId != "" && (
                          <Tab>
                            Trade History <span>(Stabilization)</span>
                          </Tab>
                        )}
                        {executionId != "" && <Tab>Trade History</Tab>}
                        {executionId != "" && <Tab>Simulation Result</Tab>}
                        {executionId != "" && <Tab>Stabilization Fund</Tab>}
                      </TabList>
                      <TabPanel className="info">
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry&apos;s standard dummy text ever since the
                          1500s
                        </p>
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
                                <span>of {iterations}</span>
                              </div>
                              <div className="next">
                                {Number(siteration) != Number(iterations) && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementIteration()}
                                  />
                                )}
                                {Number(siteration) == Number(iterations) && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {Number(siteration) != Number(iterations) && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastIteration()}
                                  />
                                )}
                                {Number(siteration) == Number(iterations) && (
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
                                <span>of {rounds}</span>
                              </div>
                              <div className="next">
                                {Number(sround) != Number(rounds) && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementRound()}
                                  />
                                )}
                                {Number(sround) == Number(rounds) && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {Number(sround) != Number(rounds) && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastRound()}
                                  />
                                )}
                                {Number(sround) == Number(rounds) && (
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
                              </button>{" "}
                            </div>
                          </div>
                          {/* <div className="tabs"></div> */}
                        </div>
                        {loading == true && <Loader />}

                        <div className="rows">
                          <div className="col sell">
                            <div className="orderNo">
                              <label htmlFor="order">Total Orders:</label>
                              <span>{orderNsbuy.length}</span>
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
                                    {orderNsbuy.map((data, index) => (
                                      <tr key={index}>
                                        <td>{data.quantity}</td>
                                        <td>{data.price}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>{" "}
                              </div>
                            </div>
                          </div>


                          <div className="col buy">
                            <div className="orderNo">
                              <label htmlFor="order">Total Orders:</label>
                              <span>{orderNssell.length}</span>
                            </div>
                            <div className="table-responsive">
                              <div className="table-content">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th>Quantity</th>
                                      <th>Sell Price</th>
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
                                    {orderNssell.map((data, index) => (
                                      <tr key={index}>
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
                                <span>of {iterations}</span>
                              </div>
                              <div className="next">
                                {Number(siteration) != Number(iterations) && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementIteration()}
                                  />
                                )}
                                {Number(siteration) == Number(iterations) && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {Number(siteration) != Number(iterations) && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastIteration()}
                                  />
                                )}
                                {Number(siteration) == Number(iterations) && (
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
                                <span>of {rounds}</span>
                              </div>
                              <div className="next">
                                {Number(sround) != Number(rounds) && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementRound()}
                                  />
                                )}
                                {Number(sround) == Number(rounds) && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {Number(sround) != Number(rounds) && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastRound()}
                                  />
                                )}
                                {Number(sround) == Number(rounds) && (
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
                              </button>{" "}
                            </div>
                          </div>
                          {/* <div className="tabs"></div> */}
                        </div>
                        {/* </div> */}
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
                                <span>of {iterations}</span>
                              </div>
                              <div className="next">
                                {Number(siteration) != Number(iterations) && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementIteration()}
                                  />
                                )}
                                {Number(siteration) == Number(iterations) && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {Number(siteration) != Number(iterations) && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastIteration()}
                                  />
                                )}
                                {Number(siteration) == Number(iterations) && (
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
                                <span>of {rounds}</span>
                              </div>
                              <div className="next">
                                {Number(sround) != Number(rounds) && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementRound()}
                                  />
                                )}
                                {Number(sround) == Number(rounds) && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {Number(sround) != Number(rounds) && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastRound()}
                                  />
                                )}
                                {Number(sround) == Number(rounds) && (
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
                              </button>{" "}
                            </div>
                          </div>
                          {/* <div className="tabs"></div> */}
                        </div>
                        {loading == true && <Loader />}

                        <div className="rows">
                          <div className="col sell">
                            <div className="orderNo">
                              <label htmlFor="order">Total Orders:</label>
                              <span>{orderNsbuy.length}</span>
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
                                    {orderNsbuy.map((data, index) => (
                                      <tr key={index}>
                                        <td>{data.quantity}</td>
                                        <td>{data.price}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>{" "}
                              </div>
                            </div>
                          </div>


                          <div className="col buy">
                            <div className="orderNo">
                              <label htmlFor="order">Total Orders:</label>
                              <span>{orderNssell.length}</span>
                            </div>
                            <div className="table-responsive">
                              <div className="table-content">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th>Quantity</th>
                                      <th>Sell Price</th>
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
                                    {orderNssell.map((data, index) => (
                                      <tr key={index}>
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
                                <span>of {iterations}</span>
                              </div>
                              <div className="next">
                                {Number(siteration) != Number(iterations) && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementIteration()}
                                  />
                                )}
                                {Number(siteration) == Number(iterations) && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {Number(siteration) != Number(iterations) && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastIteration()}
                                  />
                                )}
                                {Number(siteration) == Number(iterations) && (
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
                                <span>of {rounds}</span>
                              </div>
                              <div className="next">
                                {Number(sround) != Number(rounds) && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementRound()}
                                  />
                                )}
                                {Number(sround) == Number(rounds) && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {Number(sround) != Number(rounds) && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastRound()}
                                  />
                                )}
                                {Number(sround) == Number(rounds) && (
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
                              </button>{" "}
                            </div>
                          </div>
                          {/* <div className="tabs"></div> */}
                        </div>
                        {/* </div> */}
                      </TabPanel>
                      <TabPanel className="trade-history-ws">
                        <div className="ws">
                          <div className="stabilization">
                            <p>Stabilization Fund :</p>
                            <ul className="stabilization-fund">
                              <li className="token-issued">
                                <label htmlFor="token">Token Issued</label>
                                <span>{TradeStablizationTotal.round_tk}</span>
                              </li>
                              <li className="assets">
                                <label htmlFor="asset">Assets (QTY)</label>
                                <span>{TradeStablizationTotal.round_assets}</span>
                              </li>
                              <li className="cash">
                                <label htmlFor="cash">Cash</label>
                                <span>{TradeStablizationTotal.round_cash}</span>
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
                                <span>of {iterations}</span>
                              </div>
                              <div className="next">
                                {Number(siteration) != Number(iterations) && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementIteration()}
                                  />
                                )}
                                {Number(siteration) == Number(iterations) && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {Number(siteration) != Number(iterations) && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastIteration()}
                                  />
                                )}
                                {Number(siteration) == Number(iterations) && (
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
                                <span>of {rounds}</span>
                              </div>
                              <div className="next">
                                {Number(sround) != Number(rounds) && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementRound()}
                                  />
                                )}
                                {Number(sround) == Number(rounds) && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {Number(sround) != Number(rounds) && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastRound()}
                                  />
                                )}
                                {Number(sround) == Number(rounds) && (
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
                                      <th style={{ width: "45%" }}>Time</th>
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
                                    {tradeHistoryWS.map((item, index) => (
                                      <tr key={index}>
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
                                <span>of {iterations}</span>
                              </div>
                              <div className="next">
                                {Number(siteration) != Number(iterations) && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementIteration()}
                                  />
                                )}
                                {Number(siteration) == Number(iterations) && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {Number(siteration) != Number(iterations) && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastIteration()}
                                  />
                                )}
                                {Number(siteration) == Number(iterations) && (
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
                                <span>of {rounds}</span>
                              </div>
                              <div className="next">
                                {Number(sround) != Number(rounds) && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementRound()}
                                  />
                                )}
                                {Number(sround) == Number(rounds) && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {Number(sround) != Number(rounds) && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastRound()}
                                  />
                                )}
                                {Number(sround) == Number(rounds) && (
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
                                <span>of {iterations}</span>
                              </div>
                              <div className="next">
                                {Number(siteration) != Number(iterations) && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementIteration()}
                                  />
                                )}
                                {Number(siteration) == Number(iterations) && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {Number(siteration) != Number(iterations) && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastIteration()}
                                  />
                                )}
                                {Number(siteration) == Number(iterations) && (
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
                                <span>of {rounds}</span>
                              </div>
                              <div className="next">
                                {Number(sround) != Number(rounds) && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementRound()}
                                  />
                                )}
                                {Number(sround) == Number(rounds) && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {Number(sround) != Number(rounds) && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastRound()}
                                  />
                                )}
                                {Number(sround) == Number(rounds) && (
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
                                  <thead className="sticky-header">
                                    <tr>
                                      <th style={{ width: "45%" }}>Time</th>
                                      <th>Price</th>
                                      <th>Quantity</th>
                                    </tr>
                                  </thead>
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

                                  <tbody className="scrollable">
                                    {tradeHistoryNS.map((item, index) => (
                                      <tr key={index}>
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
                                <span>of {iterations}</span>
                              </div>
                              <div className="next">
                                {Number(siteration) != Number(iterations) && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementIteration()}
                                  />
                                )}
                                {Number(siteration) == Number(iterations) && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {Number(siteration) != Number(iterations) && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastIteration()}
                                  />
                                )}
                                {Number(siteration) == Number(iterations) && (
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
                                <span>of {rounds}</span>
                              </div>
                              <div className="next">
                                {Number(sround) != Number(rounds) && (
                                  <img
                                    src="imgs/next-arrow.svg"
                                    alt=""
                                    onClick={() => handleIncrementRound()}
                                  />
                                )}
                                {Number(sround) == Number(rounds) && (
                                  <img
                                    src="imgs/right-paging-gray.svg"
                                    alt=""
                                  />
                                )}

                                {Number(sround) != Number(rounds) && (
                                  <img
                                    src="imgs/right-doublearrow.svg"
                                    alt=""
                                    onClick={() => handleLastRound()}
                                  />
                                )}
                                {Number(sround) == Number(rounds) && (
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

                            >
                              <div style={{
                                margin: "auto", width: "70%",
                                paddingBottom: "25px"
                              }}>
                                <div className="btn-group privacy">
                                  <button
                                    className={activeButton === "Stabilization" ? "btn active" : "btn"}
                                    onClick={() => handleButtonClick("Stabilization")}
                                  >
                                    Stabilization
                                  </button>
                                  <button
                                    className={
                                      activeButton === "Without Stablization" ? "btn active" : "btn"
                                    }
                                    onClick={() => handleButtonClick("Without Stablization")}
                                  >
                                    Without Stablization
                                  </button>
                                </div>
                              </div>

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
                                      {activeButton == "Stabilization" &&
                                        <div>

                                          {graphDataWsIteration.length != 0 &&
                                            graphDataWsRound.length != 0 && (
                                              <CandleStickSimulation
                                                iteration={graphDataWsIteration}
                                                round={graphDataWsRound}
                                                noofiterations={
                                                  iterations}
                                                noofrounds={
                                                  rounds
                                                }
                                              />
                                            )}
                                        </div>
                                      }

                                      {activeButton != "Stabilization" &&
                                        <div>
                                          {graphDataNsIteration.length != 0 &&
                                            graphDataNsRound.length != 0 && (
                                              <CandleStickSimulation
                                                iteration={graphDataNsIteration}
                                                round={graphDataNsRound}
                                                noofiterations={
                                                  iterations}
                                                noofrounds={
                                                  rounds
                                                }

                                              />
                                            )}
                                        </div>
                                      }
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
                                                      parseFloat(meanPriceSimulation.inter_10_price_ws).toFixed(3)
                                                    }
                                                    -
                                                    {
                                                      parseFloat(meanPriceSimulation.inter_90_price_ws).toFixed(3)
                                                    }
                                                  </td>
                                                  <td>
                                                    {
                                                      parseFloat(meanPriceSimulation.inter_10_price_ns).toFixed(3)
                                                    }
                                                    -
                                                    {
                                                      parseFloat(meanPriceSimulation.inter_90_price_ns).toFixed(3)
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
                                      {activeButton == "Stabilization" &&
                                        <div>
                                          {simulationVolumeData.length != 0 && (
                                            <BarGraph
                                              bardata={simulationVolumeData}
                                              type={"volume"}
                                            />
                                          )}</div>}

                                      {activeButton != "Stabilization" &&
                                        <div>
                                          {nsimulationVolumeData.length != 0 && (
                                            <BarGraph
                                              bardata={nsimulationVolumeData}
                                              type={"volume"}
                                            />
                                          )}</div>}

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
                                                      parseFloat(meanVolumeSimulation.inter_10_amt_ws).toFixed(3)
                                                    }
                                                    -
                                                    {
                                                      parseFloat(meanVolumeSimulation.inter_90_amt_ws).toFixed(3)
                                                    }
                                                  </td>
                                                  <td>
                                                    {
                                                      parseFloat(meanVolumeSimulation.inter_10_amt_ns).toFixed(3)
                                                    }
                                                    -
                                                    {
                                                      parseFloat(meanVolumeSimulation.inter_90_amt_ns).toFixed(3)
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
                                      {activeButton == "Stabilization" && <div>
                                        {simulationQuantityData.length != 0 && (
                                          <BarGraph
                                            bardata={simulationQuantityData}
                                            type={"quantity"}
                                          />
                                        )}
                                      </div>}
                                      {activeButton != "Stabilization" && <div>
                                        {nsimulationQuantityData.length != 0 && (
                                          <BarGraph
                                            bardata={nsimulationQuantityData}
                                            type={"quantity"}
                                          />
                                        )}
                                      </div>}

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
                                                      parseFloat(meanQuantitySimulation.inter_10_quant_ws).toFixed(3)
                                                    }
                                                    -
                                                    {
                                                      parseFloat(meanQuantitySimulation.inter_90_quant_ws).toFixed(3)
                                                    }
                                                  </td>
                                                  <td>
                                                    {
                                                      parseFloat(meanQuantitySimulation.inter_10_quant_ns).toFixed(3)
                                                    }
                                                    -
                                                    {
                                                      parseFloat(meanQuantitySimulation.inter_90_quant_ns).toFixed(3)
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
                                <span>{StablizationTotal.round_tk}</span>
                              </li>
                              <li className="assets">
                                <label htmlFor="asset">Assets (QTY)</label>
                                <span>{StablizationTotal.round_assets}</span>
                              </li>
                              <li className="cash">
                                <label htmlFor="cash">Cash</label>
                                <span>{StablizationTotal.round_cash}</span>
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
                                          parseFloat(StablizationFundData.inter_10_cash_stab).toFixed(3)
                                        }
                                        -
                                        {
                                          parseFloat(StablizationFundData.inter_90_cash_stab).toFixed(3)
                                        }
                                      </td>
                                      <td>
                                        {
                                          parseFloat(StablizationFundData.inter_10_asset_stab).toFixed(3)
                                        }
                                        -
                                        {
                                          parseFloat(StablizationFundData.inter_90_asset_stab).toFixed(3)
                                        }
                                      </td>
                                      <td>
                                        {
                                          parseFloat(StablizationFundData.inter_10_total_stab).toFixed(3)
                                        }
                                        -
                                        {
                                          parseFloat(StablizationFundData.inter_90_total_stab).toFixed(3)
                                        }
                                      </td>
                                      <td>
                                        {
                                          parseFloat(StablizationFundData.inter_10_total_v_stab).toFixed(3)
                                        }
                                        -
                                        {
                                          parseFloat(StablizationFundData.inter_90_total_v_stab).toFixed(3)
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
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </AppLayout>
  );
}