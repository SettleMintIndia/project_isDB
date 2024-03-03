import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import API_Auth from "./api/API_Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppLayout from "@/components/layout/AppLayout";

export default function Home() {
  const router = useRouter();
  const [scenariotype, setscenariotype] = useState("");
  const [scenariotypeErr, setscenariotypeErr] = useState("");
  const [comment, setcomment] = useState("");
  const [commentErr, setcommentErr] = useState("");
  const [finalErr, setFinalErr] = useState("");
  const handleLogin = () => {
    router.push("/scenarioType");
  };

  const handleInput = (e: any) => {
    let error = 0;
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === "scenariotype") {
      setscenariotype(value);
    }
    if (name == "comment") {
      setcomment(value);
    }
  };

  const handleCreateScenario = async () => {
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
      let body = {
        scenario_name: scenariotype,
        admin_id: 15,
        comment: comment,
      };
      const result_exist = await API_Auth.getScenarioExists(scenariotype);
      console.log(result_exist.exists);
      if (result_exist.exists == true) {
        toast.error("Scenario already Exists");
      } else {
        const result = await API_Auth.getRequestScenario(body);
        console.log("result", result);
        if (result.status == 400) {
          setFinalErr(result.msg);
        } else {
          router.push("/runSimulation");
        }
      }
    }
  };
  return (
    <AppLayout>
    <div className="container-fluid">
      <div className="template request-scenario">
        <div className="template-header">
          <div className="back-option"></div>
          <div className="main-header">
            <h1>Create Scenario</h1>
          </div>
          <div></div>
        </div>
        <div className="table-responsive">
          <div className="row scenario">
            <div className="col-md-6 mb-3">
              <div className="form-content">
                <label htmlFor="scenario"> Scenario Type</label>
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
              <div className="form-content comment">
                <label htmlFor="comment">
                  Comment <span>(Optional)</span>
                </label>
                <textarea
                  className="form-control"
                  id="comment"
                  rows={5}
                  name="comment"
                  value={comment}
                  onChange={handleInput}
                ></textarea>
                {/* <input
                  type="text"
                  id="comment"
                  name="comment"
                  required
                  value={comment}
                  onChange={handleInput}
                /> */}
              </div>
              {commentErr != "" && (
                <p className="alert-message">{commentErr}</p>
              )}
            </div>
            {finalErr != "" && <p className="alert-message">{finalErr}</p>}
            <button
              className="create-template"
              onClick={() => handleCreateScenario()}
            >
              {" "}
              Submit Request
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    </AppLayout>

  );
}
