import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import API_Auth from './api/API_Auth'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


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

  const handleCreateScenario = async () => {
    let error = 0;
    if (scenariotype == "") {
      error = error + 1;
      setscenariotypeErr("Please Enter Scenario Type");
    } else {
      setscenariotypeErr("");
      let body = {
        "sname": scenariotype
      }

      const result_exist = await API_Auth.getScenarioExists(scenariotype);
      console.log(result_exist.exists)
      if (result_exist.exists == true) {
        toast.error("Scenario already Exists")
      } else {
        const result = await API_Auth.createScenario(body);
        console.log("scenarioresult", result)
        if(result.error ==undefined){
          console.log("Hello");
          toast.success("Scenario successfully created")

          setTimeout(() => {
            router.push('/createtemplate')
    
          }, 2000);

        }
       
      }

     

    }
  };
  return (
    <div className="container-fluid">
      <div className="template">
        <h1>Create A New Scenario Type</h1>
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

            <button
              className="create-template"
              onClick={() => handleCreateScenario()}
            >
              {" "}
            CREATE
            </button>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}