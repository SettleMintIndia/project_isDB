import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [scenariotype, setscenariotype] = useState("");
  const [scenariotypeErr, setscenariotypeErr] = useState("");
  const [comment, setcomment] = useState("");
  const [commentErr, setcommentErr] = useState("");
  const handleLogin = () => {
    router.push("/scenarioType");
  };

  const handleInput = (e: any) => {
    let error = 0;
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === "request_scenarioType") {
      setscenariotype(value);
    }
    if (name == "comment") {
      setcomment(value);
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
      <div className="template request-scenario">
        <h1>
          <span>Request SuperAdmin To</span> Create A New Scenario Type{" "}
        </h1>
        <div className="table-responsive">
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
              onClick={() => handleCreateScenario()}
            >
              {" "}
              <Link href="createtemplate">CREATE</Link>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
