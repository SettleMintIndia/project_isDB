import Head from "next/head";
import styles from "../styles/Home.module.css";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import API_Auth from './api/API_Auth'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
  const [lowerbound, setlowerbound] = useState("");
  const [lowerboundErr, setlowerboundErr] = useState("");
  const [upperbound, setupperbound] = useState("");
  const [upperboundErr, setupperboundErr] = useState("");
  const [publickey, setPublicKey] = useState(1);
  const [publickeyErr, setPublicKeyErr] = useState('')
  const [devpricebuy, setDevPricebuy] = useState('')
  const [devpricebuyErr, setDevPricebuyErr] = useState('');
  const [devpricesell, setDevPricesell] = useState('')
  const [devpricesellErr, setDevPricesellErr] = useState('')
  const [devqty, setDevqty] = useState('')
  const [devqtyErr, setDevqtyErr] = useState('')
  const [meanpricebuy, setMeanPricebuy] = useState('')
  const [meanpricebuyErr, setMeanPricebuyErr] = useState('');
  const [meanpricesell, setMeanPricesell] = useState('')
  const [meanpricesellErr, setMeanPricesellErr] = useState('')
  const [meanqty, setMeanqty] = useState('')
  const [meanqtyErr, setMeanqtyErr] = useState('');
  const [finalScenarios, setFinalScenarios] = useState([{ scenario_name: '' }]);
  const [finalDistributions, setFinalDistributions] = useState([{ name: '' }]);

  useEffect(() => {
    getScenarios();
    getDistributions()
  }, [])

  const getScenarios = async () => {
    const result = await API_Auth.getAllScenarios();
    setFinalScenarios(result.scenarios);
  }

  const getDistributions = async () => {
    const result = await API_Auth.getDistributions();
    setFinalDistributions(result.distributions);
  }

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
    if (name == "devpricebuy") {
      setDevPricebuy(value)
    }
    if (name == "devpricesell") {
      setDevPricesell(value)
    }
    if (name == "meanpricebuy") {
      setMeanPricebuy(value)
    }

    if (name == "meanpricesell") {
      setMeanPricesell(value)
    }
    if (name == "devqty") {
      setDevqty(value)
    }
    if (name == "meanqty") {
      setMeanqty(value)
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
      setPublicKey(value);
    }
  };



  const handleCreateTemplate = async () => {
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
    /*  if (upperbound === "") {
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
     } */
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

    if (devqty === "") {
      setDevqtyErr("Please Enter Standard Deviation Qunatity");
      error = error + 1;
    } else {
      setDevqtyErr("");
    }
    if (meanqty === "") {
      setMeanqtyErr("Please Enter Mean Qunatity");
      error = error + 1;
    } else {
      setMeanqtyErr("");
    }

    if (comment === "") {
      setcommentErr("Please Enter Comment");
      error = error + 1;
    } else {
      setcommentErr("");
    }
    if (publickey == 2) {
      setPublicKeyErr("Please Select Public value");
      error = error + 1;
    } else {
      setPublicKeyErr("");
    }


    console.log(error);
    if (error == 0) {

      let body = {
        "temp_name": templatename,
        "scenario_name": scenarioType,
        "initial_mkt_price": Number(inititalmarketprice),
        "price_var": Number(pricelimit),
        "base_quant": Number(basequantity),
        "quant_var": Number(quantitylimit),
        "alpha0": Number(alpha0),
        "alpha1": Number(alpha1),
        "theta0": Number(theta0),
        "theta1": Number(theta1),
        "distribution": distribution,
        "comments": comment,
        "is_public": publickey,
        "std_dev_price_buy": Number(devpricebuy),
        "std_dev_price_sell": Number(devpricesell),
        "mean_price_buy": Number(meanpricebuy),
        "mean_price_sell": Number(meanpricesell),
        "std_dev_quant": Number(devqty),
        "mean_quant": Number(meanqty),
        "admin_id": 1
      }
      console.log(body);

      if (Number(pricelimit) > 1 || Number(quantitylimit) > 1) {
        toast.error("price or quant variance should be less than 1")
        const data = await API_Auth.createTemplate(body)


      } else {

        const template_exist = await API_Auth.getTemplateExists(templatename)
        console.log("template_exist", template_exist)

        if (template_exist.name_available == false) {
          toast.error("Template Name Already Exists")
        } else {

          const data = await API_Auth.createTemplate(body)
          console.log(data);
          if (data.error! = '' || data.error == undefined) {
            console.log("hello")
            toast.success("Template Created Successfully")
            setTimeout(() => {
              router.push("/templateDetails")
            }, 2000);

          } else {
            console.log("Hi", data.error.error)
            toast.error("Duplicate Entries ");

          }
        }
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="template">
        <h1>Create Template</h1>
        <div className="table-responsive">
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="form-content">
                <label htmlFor="type">Scenario Type*</label>
                <div className="select-wrapper">
                  <select
                    name="scenarioType"
                    id="type"
                    value={scenarioType}
                    onChange={handleInput}
                  >
                    <option value="">Select Scenario Type</option>
                    {finalScenarios.map(item => (
                      <option key={item?.scenario_name} value={item?.scenario_name}>{item?.scenario_name}</option>
                    ))}
                  </select>
                </div>

                {scenarioTypeErr != "" && (
                  <p className="alert-message">{scenarioTypeErr}</p>
                )}
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-content">
                <label htmlFor="name">Template Name*</label>
                <input
                  type="text"
                  id="name"
                  name="templatename"
                  required
                  value={templatename}
                  onChange={handleInput}
                />
              </div>
              {templatenameErr != "" && (
                <p className="alert-message">{templatenameErr}</p>
              )}
            </div>
            <div className="col-md-6 mb-3">
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
            <div className="col-md-6 mb-3">
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
            <div className="col-md-6 mb-3">
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
            <div className="col-md-6 mb-3">
              <div className="form-content">
                <label htmlFor="quantitylimit">Quantity Variance Limit*</label>
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
            {/*   <div className="col-md-6 mb-3">
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
            <div className="col-md-6 mb-3">
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
            </div> */}
            <div className="col-md-6 mb-3">
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
              {alpha0Err != "" && <p className="alert-message">{alpha0Err}</p>}
            </div>
            <div className="col-md-6 mb-3">
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
              {alpha1Err != "" && <p className="alert-message">{alpha1Err}</p>}
            </div>
            <div className="col-md-6 mb-3">
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
              {theta0Err != "" && <p className="alert-message">{theta0Err}</p>}
            </div>
            <div className="col-md-6 mb-3">
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
              {theta1Err != "" && <p className="alert-message">{theta1Err}</p>}
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-content">
                <label htmlFor="publickey">Public</label>
                <select
                  name="publickey"
                  id="publickey"
                  value={publickey}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select  Type</option>
                  <option value="1">True</option>
                  <option value="0">False</option>
                </select>
              </div>
              {publickeyErr != "" && <p className="alert-message">{publickeyErr}</p>}



            </div>

            <div className="col-md-6 mb-3">
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
              {devpricebuyErr != "" && <p className="alert-message">{devpricebuyErr}</p>}
            </div>

            <div className="col-md-6 mb-3">
              <div className="form-content">
                <label htmlFor="theta1">Standard Deviation Price Sell</label>
                <input
                  type="number"
                  id="devpricesell"
                  name="devpricesell"
                  required
                  value={devpricesell}
                  onChange={handleInput}
                />
              </div>
              {devpricesellErr != "" && <p className="alert-message">{devpricesellErr}</p>}
            </div>
            <div className="col-md-6 mb-3">
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
              {meanpricebuyErr != "" && <p className="alert-message">{meanpricebuyErr}</p>}
            </div>
            <div className="col-md-6 mb-3">
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
              {meanpricesellErr != "" && <p className="alert-message">{meanpricesellErr}</p>}
            </div>

            <div className="col-md-6 mb-3">
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
              {devqtyErr != "" && <p className="alert-message">{devqtyErr}</p>}
            </div>

            <div className="col-md-6 mb-3">
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
              {meanqtyErr != "" && <p className="alert-message">{meanqtyErr}</p>}
            </div>

            <div className="col-md-6 mb-3">
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
                  {finalDistributions.map(item => (
                    <option key={item?.name} value={item?.name}>{item?.name}</option>
                  ))}
                </select>
              </div>
              {distributionErr != "" && (
                <p className="alert-message">{distributionErr}</p>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <div className="form-content">
                <label htmlFor="comment">Comment</label>
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
          <div className="buttercenter">

            <button
              className="create-template"
              onClick={() => handleCreateTemplate()}
            >
              CREATE TEMPLATE{" "}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}