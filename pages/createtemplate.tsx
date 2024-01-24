import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/createtemplate");
  };

  return (
    <div className="container-fluid">
      <div className="template">
        <h1>Create Template</h1>
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="form-content">
              <label htmlFor="type">Scenario Type*</label>
              <select name="Scenario Type" id="type">
                <option value="volvo">Select Scenario Type</option>
                <option value="saab">Type A</option>
                <option value="opel">Type B</option>
                <option value="audi">Type C</option>
              </select>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-content">
              <label htmlFor="price">Initial Market Price*</label>
              <input
                type="number"
                id="price"
                name="Initial Market Price"
                required
              />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-content">
              <label htmlFor="quantity">Base Quantity*</label>
              <input
                type="number"
                id="quantity"
                name="Base Quantity"
                required
              />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-content">
              <label htmlFor="alpha0">Alpha 0*</label>
              <input type="text" id="alpha0" name="Alpha 0" required />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-content">
              <label htmlFor="theta0">Theta 0*</label>
              <input type="text" id="theta0" name="Theta 0" required />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-content">
              <label htmlFor="distribution">Distribution*</label>
              <input
                type="text"
                id="distribution"
                name="Distribution"
                required
              />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-content">
              <label htmlFor="name">Template Name*</label>
              <input type="text" id="name" name="Template Name" required />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-content">
              <label htmlFor="pricelimit">Price Variance Limit*</label>
              <input
                type="number"
                id="pricelimit"
                name="Price Variance Limit"
                required
              />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-content">
              <label htmlFor="quantitylimit">Quantity Variance Limit*</label>
              <input
                type="number"
                id="quantitylimit"
                name="Quantity Variance Limit"
                required
              />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-content">
              <label htmlFor="alpha1">Alpha 1*</label>
              <input type="text" id="alpha1" name="Alpha 1" required />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-content">
              <label htmlFor="theta1">Theta 1*</label>
              <input type="text" id="theta1" name="Theta 1" required />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-content">
              <label htmlFor="comment">Comment</label>
              <input type="text" id="comment" name="Comment" required />
            </div>
          </div>
          <input
            className="create-template"
            type="submit"
            value="CREATE TEMPLATE"
          />
        </div>
      </div>
    </div>
  );
}
