import Head from "next/head";
import styles from "../styles/Home.module.css";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import API_Auth from "./api/API_Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppLayout from "@/components/layout/AppLayout";
import Loader from "@/components/layout/Loader";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
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
  const [showModal, setShowModal] = useState(false);
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
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const[temperr,setTempErr]=useState("")
  useEffect(() => {
    getTemplateDetails(totalTempName);
    let email = localStorage.getItem("useremail");
    console.log("email");
   // getEmailInfo(email);
    getScenarios();
    getDistributions();
  }, [totalTempName]);

 /*  const getEmailInfo = async (email: any) => {
    const result = await API_Auth.getAdminInformation(email);
    console.log(result);
    setUserId(result.id);
  }; */

  const getScenarios = async () => {
    const result = await API_Auth.getAllScenarios();
    setFinalScenarios(result.scenarios);
  };

  const getDistributions = async () => {
    const result = await API_Auth.getDistributions();
    setFinalDistributions(result.distributions);
  };

  const getTemplateDetails = async (totalTempName: any) => {
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
      setPublicKey(data.is_public);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleYesCancel = () => {
    setModalIsOpen(false);
    const superadminkey = localStorage.getItem("superadmin");
    console.log("superadmin", superadminkey);
    if (superadminkey == "superadmin") {
      router.push("/templateDetails");
    } else {
      router.push("/runSimulation");
    }
  };
  const handleNoCancel = () => {
    setModalIsOpen(false);
  };
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
  };

  const editCreateTemplate = () => {
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
    /*  if (comment === "") {
      setcommentErr("Please Enter Comment");
      error = error + 1;
    } else {
      setcommentErr("");
    } */
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
      if (Number(pricelimit) > 1 || Number(quantitylimit) > 1) {
        setTempErr("price or quant variance should be less than 1");
      } else if (Number(upperbound) > 1) {
        setTempErr("upper lmt order price variance should be less than 1");
      } else if (Number(lowerbound) < 1) {
        setTempErr("lower lmt order price variance should be greater than 1");
      } else if (Number(alpha0) > 1) {
        setTempErr("alpha0 value should be less than 1");
      } else if (Number(alpha0) > Number(alpha1)) {
        setTempErr("alpha1 value should be greater than alpha0");
      } else if (Number(theta0) > 1) {
        setTempErr("theta0 value should be less than 1");
      } else if (Number(theta0) > Number(theta1)) {
        setTempErr("theta1 value should be greater than theta0");
      } else {
        setTempErr("")
        setShowModal(true);
      }
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
   /*  if (finalComments == "") {
      setfinalCommentsErr("Please Enter Comments");
      error = error + 1;
    } else {
      setfinalCommentsErr("");
    } */
    if (error == 0) {
      let user_id = localStorage.getItem("userid");
      console.log("user_id",user_id)
  
      let finalbody = {
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
        admin_id: user_id,
        limit_order_upper_bound: Number(upperbound),
        limit_order_lower_bound: Number(lowerbound),
      };
      console.log("finalbody", finalbody);

      console.log("finalbody", finalbody);

      const template_exist = await API_Auth.getTemplateExists(newtemplateName);
      console.log("template_exist", template_exist);
      if (template_exist.name_available == false) {
        setFinalErr("Template Name Already Exists");
      } else {
        setFinalErr("");
        setDisableSubmit(true);
        setLoading(true);

        const data = await API_Auth.createTemplate(finalbody);
        console.log("result", data);
        setLoading(false);
        console.log("error",data.result.status,data.error)
        if(data.result.status=="duplicate found"){
          setDisableSubmit(false);
          setFinalErr(data.result.status);
        }else if(data.result.status=="success"){
          setFinalErr("")
          toast.success("Template Created Successfully");
          const superadminkey = localStorage.getItem("superadmin");
          console.log("superadmin", superadminkey);
          if (superadminkey == "superadmin") {
            setTimeout(() => {
              router.push("/templateDetails");
            }, 2000);
          } else {
            setTimeout(() => {
              router.push("/runSimulation");
            }, 2000);
          }
        }else{

        }
       /*  if ((data.error! = "" || data.error == undefined)) {
          toast.success("Template Created Successfully");
          const superadminkey = localStorage.getItem("superadmin");
          console.log("superadmin", superadminkey);
          if (superadminkey == "superadmin") {
            setTimeout(() => {
              router.push("/templateDetails");
            }, 2000);
          } else {
            setTimeout(() => {
              router.push("/runSimulation");
            }, 2000);
          }
        } else {
          setDisableSubmit(false);
          setFinalErr("Duplicate Entries Exists");
        } */
      }
    }
  };
  const handleBack = () => {
    router.back();
  };
  return (
    <AppLayout>
      <div className="container-fluid">
        <div className="template edit-template">
          <div className="template-header">
            <div className="back-option" onClick={() => handleBack()}>
              <Image
                src="imgs/left-arrow.svg"
                alt=""
                width={27.443}
                height={25.767}
              />
              <p className="mb-0">Back</p>
            </div>
            <div className="main-header">
              <h1>Edit Template Details</h1>
            </div>
            <div></div>
          </div>
          <div className="table-responsive">
            <div className="row">
              <div className="col-md-6 p-1">
                <div className="form-content">
                  <label htmlFor="type">Scenario Type*</label>
                  <select
                    name="scenarioType"
                    id="type"
                    value={scenarioType}
                    onChange={handleInput}
                    disabled
                  >
                    <option value="">Select Scenario Type</option>

                    {finalScenarios.map((item) => (
                      <option
                        key={item?.scenario_name}
                        value={item?.scenario_name}
                      >
                        {item?.scenario_name}
                      </option>
                    ))}
                  </select>
                  {scenarioTypeErr != "" && (
                    <p className="alert-message">{scenarioTypeErr}</p>
                  )}
                </div>
              </div>
              <div className="col-md-6 p-1">
                <div className="form-content">
                  <label htmlFor="name">Template Name*</label>
                  <input
                    type="text"
                    id="name"
                    name="templatename"
                    required
                    value={templatename}
                    onChange={handleInput}
                    disabled
                  />
                </div>
                {templatenameErr != "" && (
                  <p className="alert-message">{templatenameErr}</p>
                )}
              </div>
              <div className="col-md-6 p-1">
                <div className="form-content">
                  <label htmlFor="price">Initial Market Price*</label>
                  <input
                    type="number"
                    id="price"
                    name="inititalmarketprice"
                    required
                    value={inititalmarketprice}
                    onChange={handleInput}
                  />
                  {inititalmarketpriceErr != "" && (
                    <p className="alert-message">{inititalmarketpriceErr}</p>
                  )}
                </div>
              </div>
              <div className="col-md-6 p-1">
                <div className="form-content">
                  <label htmlFor="pricelimit">Price Variance Limit*</label>
                  <input
                    type="number"
                    id="pricelimit"
                    name="pricelimit"
                    required
                    value={pricelimit}
                    onChange={handleInput}
                  />
                </div>
                {pricelimitErr != "" && (
                  <p className="alert-message">{pricelimitErr}</p>
                )}
              </div>
              <div className="col-md-6 p-1">
                <div className="form-content">
                  <label htmlFor="quantity">Base Quantity*</label>
                  <input
                    type="number"
                    id="quantity"
                    name="basequantity"
                    required
                    value={basequantity}
                    onChange={handleInput}
                  />
                  {basequantityErr != "" && (
                    <p className="alert-message">{basequantityErr}</p>
                  )}
                </div>
              </div>
              <div className="col-md-6 p-1">
                <div className="form-content">
                  <label htmlFor="quantitylimit">
                    Quantity Variance Limit*
                  </label>
                  <input
                    type="number"
                    id="quantitylimit"
                    name="quantitylimit"
                    required
                    value={quantitylimit}
                    onChange={handleInput}
                  />
                </div>
                {quantitylimitErr != "" && (
                  <p className="alert-message">{quantitylimitErr}</p>
                )}
              </div>
              <div className="col-md-6 p-1">
                <div className="form-content">
                  <label htmlFor="upperbonds">Limit Order Upper Bound*</label>
                  <input
                    type="text"
                    id="upperbonds"
                    name="upperbonds"
                    required
                    value={upperbound}
                    onChange={handleInput}
                  />
                </div>
                {upperboundErr != "" && (
                  <p className="alert-message">{upperboundErr}</p>
                )}
              </div>
              <div className="col-md-6 p-1">
                <div className="form-content">
                  <label htmlFor="lowerbonds">Limit Order Lower Bound*</label>
                  <input
                    type="text"
                    id="lowerbonds"
                    name="lowerbonds"
                    required
                    value={lowerbound}
                    onChange={handleInput}
                  />
                </div>
                {lowerboundErr != "" && (
                  <p className="alert-message">{lowerboundErr}</p>
                )}
              </div>
              <div className="col-md-6 p-1">
                <div className="form-content">
                  <label htmlFor="alpha0">Alpha 0*</label>
                  <input
                    type="number"
                    id="alpha0"
                    name="alpha0"
                    required
                    value={alpha0}
                    onChange={handleInput}
                  />
                </div>
                {alpha0Err != "" && (
                  <p className="alert-message">{alpha0Err}</p>
                )}
              </div>
              <div className="col-md-6 p-1">
                <div className="form-content">
                  <label htmlFor="alpha1">Alpha 1*</label>
                  <input
                    type="number"
                    id="alpha1"
                    name="alpha1"
                    required
                    value={alpha1}
                    onChange={handleInput}
                  />
                </div>
                {alpha1Err != "" && (
                  <p className="alert-message">{alpha1Err}</p>
                )}
              </div>
              <div className="col-md-6 p-1">
                <div className="form-content">
                  <label htmlFor="theta0">Theta 0*</label>
                  <input
                    type="number"
                    id="theta0"
                    name="theta0"
                    required
                    value={theta0}
                    onChange={handleInput}
                  />
                </div>
                {theta0Err != "" && (
                  <p className="alert-message">{theta0Err}</p>
                )}
              </div>
              <div className="col-md-6 p-1">
                <div className="form-content">
                  <label htmlFor="theta1">Theta 1*</label>
                  <input
                    type="number"
                    id="theta1"
                    name="theta1"
                    required
                    value={theta1}
                    onChange={handleInput}
                  />
                </div>
                {theta1Err != "" && (
                  <p className="alert-message">{theta1Err}</p>
                )}
              </div>

              <div className="col-md-6 p-1">
                <div className="form-content">
                  <label htmlFor="distribution">Distribution*</label>
                  <select
                    name="distribution"
                    id="distribution"
                    value={distribution}
                    onChange={handleInput}
                    required
                  >
                    <option value="">Select Distribution Type</option>
                    {finalDistributions.map((item) => (
                      <option key={item?.name} value={item?.name}>
                        {item?.name}
                      </option>
                    ))}
                  </select>
                </div>
                {distributionErr != "" && (
                  <p className="alert-message">{distributionErr}</p>
                )}
              </div>
              {distribution == "normal" && (
                <div className="col-md-6 p-1">
                  <div className="form-content">
                    <label htmlFor="theta1">Standard Deviation Price Buy</label>
                    <input
                      type="number"
                      id="devpricebuy"
                      name="devpricebuy"
                      required
                      value={devpricebuy}
                      onChange={handleInput}
                    />
                  </div>
                  {devpricebuyErr != "" && (
                    <p className="alert-message">{devpricebuyErr}</p>
                  )}
                </div>
              )}

              {distribution == "normal" && (
                <div className="col-md-6 p-1">
                  <div className="form-content">
                    <label htmlFor="theta1">
                      Standard Deviation Price Sell
                    </label>
                    <input
                      type="number"
                      id="devpricesell"
                      name="devpricesell"
                      required
                      value={devpricesell}
                      onChange={handleInput}
                    />
                  </div>
                  {devpricesellErr != "" && (
                    <p className="alert-message">{devpricesellErr}</p>
                  )}
                </div>
              )}

              {distribution == "normal" && (
                <div className="col-md-6 p-1">
                  <div className="form-content">
                    <label htmlFor="theta1">Standard Deviation Quantity</label>
                    <input
                      type="number"
                      id="devqty"
                      name="devqty"
                      required
                      value={devqty}
                      onChange={handleInput}
                    />
                  </div>
                  {devqtyErr != "" && (
                    <p className="alert-message">{devqtyErr}</p>
                  )}
                </div>
              )}
              {(distribution == "poisson" || distribution == "normal") && (
                <div className="col-md-6 p-1">
                  <div className="form-content">
                    <label htmlFor="theta1">Mean Price Buy</label>
                    <input
                      type="number"
                      id="meanpricebuy"
                      name="meanpricebuy"
                      required
                      value={meanpricebuy}
                      onChange={handleInput}
                    />
                  </div>
                  {meanpricebuyErr != "" && (
                    <p className="alert-message">{meanpricebuyErr}</p>
                  )}
                </div>
              )}
              {(distribution == "poisson" || distribution == "normal") && (
                <div className="col-md-6 p-1">
                  <div className="form-content">
                    <label htmlFor="theta1">Mean Price Sell</label>
                    <input
                      type="number"
                      id="meanpricesell"
                      name="meanpricesell"
                      required
                      value={meanpricesell}
                      onChange={handleInput}
                    />
                  </div>
                  {meanpricesellErr != "" && (
                    <p className="alert-message">{meanpricesellErr}</p>
                  )}
                </div>
              )}

              {(distribution == "poisson" || distribution == "normal") && (
                <div className="col-md-6 p-1">
                  <div className="form-content">
                    <label htmlFor="theta1">Mean Price Quantity</label>
                    <input
                      type="number"
                      id="meanqty"
                      name="meanqty"
                      required
                      value={meanqty}
                      onChange={handleInput}
                    />
                  </div>
                  {meanqtyErr != "" && (
                    <p className="alert-message">{meanqtyErr}</p>
                  )}
                </div>
              )}

              <div className="col-md-6 p-1">
                <div className="form-control p-1">
                  <label htmlFor="accessible">Accessible Data For*</label>
                  <div className="radio-button mt-2">
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
              <div className="col-md-6 p-1">
                <div className="form-content comment">
                  <label htmlFor="comment">
                    Comment <span>(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="comment"
                    name="comment"
                    required
                    value={comment}
                    onChange={handleInput}
                  />
                </div>
                {commentErr != "" && (
                  <p className="alert-message">{commentErr}</p>
                )}
              </div>
            </div>
            {temperr != "" && (
              <p className="alert-messageerror">{temperr}</p>
            )}

            <div className="buttoncenter">
              <button
                className="create-template"
                onClick={() => editCreateTemplate()}
              >
                Save As New Template{" "}
              </button>

              <Modal
                show={showModal}
                onHide={handleCloseModal}
                className="energy-efficiency"
              >
                <Modal.Header className="custom-header">
                  <Image
                    src="imgs/close-black.svg"
                    alt=""
                    width={19.199}
                    height={19.199}
                    onClick={handleClose}
                  />
                </Modal.Header>
                <Modal.Body>
                  {" "}
                  <div className="modal-details">
                    <div className="save">
                      <label htmlFor="">Template Name</label>
                      <input
                        type="text"
                        name="newtemplateName"
                        value={newtemplateName}
                        onChange={handleInput}
                      />
                      {newtemplateNameErr != "" && (
                        <p className="alert-message">{newtemplateNameErr}</p>
                      )}{" "}
                    </div>
                    <div className="comment">
                      <label htmlFor="">Comment </label>
                      <input
                        type="text"
                        name="finalComments"
                        value={finalComments}
                        onChange={handleInput}
                      />
                      {finalCommentsErr != "" && (
                        <p className="alert-message">{finalCommentsErr}</p>
                      )}
                      {finalErr != "" && (
                        <p className="alert-message">{finalErr}</p>
                      )}{" "}
                    </div>
                  </div>
                </Modal.Body>
                {loading == true && <Loader />}
                <div className="modal-button">
                  <button
                    className="create-template"
                    btn-close-black
                    onClick={() => handleSaveTemplate()}
                    disabled={disableSubmit}
                  >
                    Save Changes
                  </button>
                  <button className="cancel" onClick={handleClose}>
                    Cancel
                  </button>
                </div>
              </Modal>

              <button className="cancel" onClick={() => openModal()}>
                Cancel
              </button>
              <Modal show={modalIsOpen} onHide={closeModal}>
                <Modal.Header className="custom-header">
                  <Image
                    src="imgs/close-black.svg"
                    alt=""
                    width={19.199}
                    height={19.199}
                    onClick={closeModal}
                  />
                </Modal.Header>
                <Modal.Body className="modal-ask p-0">
                  <div>
                    <p>Are you sure you want to cancel the changes?</p>
                  </div>
                </Modal.Body>

                <div className="modal-button ask">
                  <Button className="yes" onClick={() => handleYesCancel()}>
                    Yes
                  </Button>
                  <Button className="no" onClick={() => handleNoCancel()}>
                    No
                  </Button>
                </div>
              </Modal>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </AppLayout>
  );
}
