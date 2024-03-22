import { useState } from "react";
import { useRouter } from "next/router";
import API_Auth from "./api/API_Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppLayout from "@/components/layout/AppLayout";
import Loader from "@/components/layout/Loader";

export default function Home() {
  const router = useRouter();
  const [scenariotype, setscenariotype] = useState("");
  const [scenariotypeErr, setscenariotypeErr] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

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
        sname: scenariotype,
      };

      setDisableSubmit(true);
      setLoading(true);

      const result_exist = await API_Auth.getScenarioExists(scenariotype);
      console.log(result_exist.exists);
      setLoading(false);
      if (result_exist.exists == true) {
        setDisableSubmit(false);

        toast.error("Scenario already Exists");
      } else {
        const result = await API_Auth.createScenario(body);
        console.log("scenarioresult", result);
        if (result.error == undefined) {
          console.log("Hello");
          toast.success("Scenario successfully created");
          localStorage.setItem("scenariotype", scenariotype);

          setTimeout(() => {
            router.push("/createtemplate");
          }, 2000);
        }
      }
    }
  };
  return (
    <AppLayout>
      <div className="container-fluid">
        <div className="template scenariotype">
          <h1>Create Scenario Type</h1>
          <div className="table-responsive">
            <div className="row scenario">
              {loading == true && <Loader />}

              <div className="col-md-6 mb-2">
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

              <button
                className="create-template mb-2"
                onClick={() => handleCreateScenario()}
                disabled={disableSubmit}
              >
                {" "}
                Create
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </AppLayout>
  );
}
