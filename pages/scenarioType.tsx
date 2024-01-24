import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/scenarioType");
  };

  return (
    <div className="container-fluid">
      <div className="template">
        <h1>Create A New Scenario Type</h1>
        <div className="row scenario">
          <div className="col-md-6 mb-3">
            <div className="form-content">
              <label htmlFor="scenario">Add A New Scenario Type</label>
              <input type="text" id="scenario" name="scenario type" required />
            </div>
          </div>

          <input className="submit" type="submit" value="SUBMIT" />
        </div>
      </div>
    </div>
  );
}
