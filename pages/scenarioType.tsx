import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [scenariotype, setscenariotype] = useState("");
  const [scenariotypeErr, setscenariotypeErr] = useState("");

  const handleLogin = () => {
    router.push("/scenarioType");
  };

  const handleInput = (e: any) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === "scenariotype") {
      setscenariotype(value);
    }
  };

  const handleCreateScenario = () => {
    let error = 0;
    if (scenariotype == "") {
      error = error + 1;
      setscenariotypeErr("Please Enter Scenario Type");
    } else {
      setscenariotypeErr("");
    }
  };
  return (
    <div className="container-fluid">
      <div className="template">
        <h1>Create A New Scenario Type</h1>
        <div className="row scenario">
          <div className="col-md-6 mb-3">
            <div className="form-content">
              <label htmlFor="scenario">Add A New Scenario Type</label>
              <input
                type="text"
                id="scenario"
                name="scenariotype"
                required
                value={scenariotype}
                onChange={handleInput}
              />
            </div>
            {scenariotypeErr != "" && (
              <p className="alert-message">{scenariotypeErr}</p>
            )}
          </div>

          <button
            className="create-template"
            onClick={() => handleCreateScenario()}
          >
            {" "}
            <Link href="createtemplate">SUBMIT</Link>{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
