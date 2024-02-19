import Head from "next/head";
import styles from "../styles/Home.module.css";
import { use, useState } from "react";
import { useRouter } from "next/router";

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

    console.log(error);
    if (error == 0) {
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
                    <option value="volvo">Select Scenario Type</option>
                    <option value="Crash">Crash</option>
                    <option value="Bubble">Bubble</option>
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
            <div className="col-md-6 mb-3">
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
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-content">
                <label htmlFor="alpha0">Alpha 0*</label>
                <input
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                <label htmlFor="distribution">Distribution*</label>
                <select
                  name="distribution"
                  id="distribution"
                  value={distribution}
                  onChange={handleInput}
                  required
                >
                  <option value="volvo">Select Distribution Type</option>

                  <option value="volvo">Poisonous</option>
                  <option value="Crash">Uniform</option>
                  <option value="Bubble">Gaussian</option>
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

            <button
              className="create-template"
              onClick={() => handleCreateTemplate()}
            >
              CREATE TEMPLATE{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
