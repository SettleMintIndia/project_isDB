import { SetStateAction, useContext, useState } from "react";
import { useRouter } from "next/router";
import API_Auth from "./api/API_Auth";
import { UserContext } from "./context";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

export default function Home() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userErr, setUserErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const router = useRouter();
  const { loginuseremail, setloginuseremail } = useContext(UserContext);
  const [activeButton, setActiveButton] = useState("Static");
  const [err, setErr] = useState("");

  const handleLogin = async () => {
    let error = 0;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userEmail === "") {
      setUserErr("Please Enter  Email");
      error = error + 1;
    } else if (!emailRegex.test(userEmail)) {
      setUserErr("Please Enter Valid Email");
      error = error + 1;
    } else {
      setUserErr("");
    }
    if (password === "") {
      setPasswordErr("Please Enter Password");
      error = error + 1;
    } else {
      setPasswordErr("");
    }
    console.log(error);
    /*  if (error == 0) {
       router.push("/listemplates");
     } */
    if (error == 0) {
      let body = {
        email: userEmail,
        password: password,
      };
      console.log(body);
      localStorage.setItem("useremail", "superadmin@isdb.com");
      setloginuseremail("superadmin@isdb.com");

      router.push("/createtemplate");
      /*
      const result = await API_Auth.getLogin(body);
      console.log("result", result);
      if (result.status == 400) {
        setErr(result.error)
      } else {
        localStorage.setItem("useremail", result.email)
        localStorage.setItem("superadmin", result.isSuper);
        localStorage.setItem("displayname", result.display_name)
        router.push('/createtemplate')
      } */
    }
  };

  const handleInput = async (e: any) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === "userEmail") {
      setUserEmail(value);
    }

    if (name === "password") {
      setPassword(value);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleButtonClick = (buttonName: SetStateAction<string>) => {
    setActiveButton(buttonName);
  };
  return (
    <MainLayout>
      <div className="container-fluid landing">
        <div className="heroBanner">
          <div className="heroImg">
            <img src="imgs/Bg-img.jpg" alt="" />
          </div>
          <div className="content-heroBanner">
            <h1>Exchange Platform</h1>
            <p>
              Run Simulations Enabled With A Smart Stabilization System
              Algorithm
            </p>
            <button>Get Started</button>
          </div>
        </div>
        <div className="main-section">
          <div className="main-para">
            <p>
              The exchange introduces the use of a stabilization algorithm
              before updating the market price of an asset based on the gap
              between the sell price and the buy price. Our platform empowers
              the users with intuitive functionalities, facilitating seamless
              simulation management and execution. Whether it's creating
              templates, running simulations, or expanding scenario options, our
              platform equips users with the resources they need to succeed.
            </p>
          </div>
          <div className="landing-details">
            <div className="works">
              <div className="works-header">
                <h1>How It Works?</h1>
                <p>
                  Our platform is designed to streamline simulation processes,
                  empowering both Super Admins and Admins to efficiently manage
                  and execute simulations tailored to their needs.
                </p>
              </div>
              <div className="works-tab">
                <Tabs className="tab-option">
                  <TabList>
                    <Tab className="tab">Super Admin</Tab>
                    <Tab className="tab">Admin</Tab>
                  </TabList>
                  <TabPanel className="panel">
                    <div className="panel-para">
                      <p>
                        As the primary administrator with elevated privileges,
                        the Super Admin oversees critical functionalities
                        including
                      </p>
                    </div>

                    <div className="row">
                      <div className="col-md-3 mb-3">
                        <div className="panel-options">
                          <div className="optionsIcon">
                            <img src="imgs/admin1.svg" alt="" />
                          </div>
                          <div className="optionsContent">
                            <h4>1. Creating New Admins</h4>
                            <p>
                              Super Admins have the authority to create new
                              admin accounts, granting access to individuals
                              responsible for running simulations and managing
                              templates.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="panel-options">
                          <div className="optionsIcon">
                            <img src="imgs/management.svg" alt="" />
                          </div>
                          <div className="optionsContent">
                            <h4>2. Template Management</h4>
                            <p>
                              Super Admins can create templates for various
                              simulation scenarios such as crashes, bubbles, and
                              more. These templates serve as global presets
                              accessible to all admins.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="panel-options">
                          <div className="optionsIcon">
                            <img src="imgs/addition.svg" alt="" />
                          </div>
                          <div className="optionsContent">
                            <h4>3. Scenario Type Addition</h4>
                            <p>
                              Super Admins have the capability to add new types
                              of scenarios, expanding the platform's versatility
                              to accommodate emerging needs and trends.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel className="panel">
                    <div className="panel-para">
                      <p>
                        Admins are key users responsible for executing
                        simulations and managing templates. Here's how they
                        interact with the platform
                      </p>
                    </div>
                    <div className="row">
                      <div className="col-md-3 mb-3">
                        <div className="panel-options">
                          <div className="optionsIcon">
                            <img src="imgs/admin1.svg" alt="" />
                          </div>
                          <div className="optionsContent">
                            <h4>1. Simulation Execution</h4>
                            <p>
                              Admins can run simulations using either global
                              templates provided by the Super Admin or templates
                              they've personally created, enabling flexibility
                              and customization.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="panel-options">
                          <div className="optionsIcon">
                            <img src="imgs/management.svg" alt="" />
                          </div>
                          <div className="optionsContent">
                            <h4>2. Template Creation</h4>
                            <p>
                              Admins have the ability to craft new templates,
                              tailoring simulations to specific requirements not
                              covered by existing presets.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="panel-options">
                          <div className="optionsIcon">
                            <img src="imgs/addition.svg" alt="" />
                          </div>
                          <div className="optionsContent">
                            <h4>3. Scenario Type Requests</h4>
                            <p>
                              If an Admin encounters a scenario type not
                              currently available, they can request its addition
                              from the Super Admin, ensuring the platform
                              remains adaptable to evolving simulation needs
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="panel-options">
                          <div className="optionsIcon">
                            <img src="imgs/history.svg" alt="" />
                          </div>
                          <div className="optionsContent">
                            <h4>4. Simulation History</h4>
                            <p>
                              Admins can easily browse through their simulation
                              history, accessing past results and data for
                              analysis, reference, and informed decision-making.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
            {/* <div className="faqs-contact">
              <div className="faqs">
                <h1>FAQs</h1>
                <ul className="faqs-list">
                  <li>
                    <div className="que-ans">
                      <h4>
                        What is the objective of the Smart Stabilization System
                        (SSS) project?
                      </h4>
                      <p>
                        The primary objective of the project is to develop an
                        exchange platform where an admin can run simulations
                        utilizing a smart stabilization system algorithm and
                        without it, while also providing visualization of its
                        output.
                      </p>
                    </div>
                    <div>
                      <img src="" alt="" />
                    </div>
                  </li>
                  <li>
                    <div className="que-ans">
                      <h4>
                        Can I customize templates for simulations according to
                        specific scenarios?
                      </h4>
                      <p>
                        Yes, both Super Admins and Admins have the ability to
                        create and customize templates for simulations, allowing
                        for flexibility in addressing various scenarios such as
                        crashes, bubbles, and more. It can be done by editing
                        the current template and storing it with a new name.
                      </p>
                    </div>
                    <div>
                      <img src="" alt="" />
                    </div>
                  </li>
                  <li>
                    <div className="que-ans">
                      <h4>
                        How can I request a new scenario type for simulation?
                      </h4>
                      <p>
                        Admins can request the Super Admin to create new
                        scenario types by raising it on the portal
                      </p>
                    </div>
                    <div>
                      <img src="" alt="" />
                    </div>
                  </li>
                  <li>
                    <div className="que-ans">
                      <h4>How do I create an account?</h4>
                      <p>Please contact the super admin at ""</p>
                    </div>
                    <div>
                      <img src="" alt="" />
                    </div>
                  </li>
                  <li>
                    <div className="que-ans">
                      <h4>How do I reset my password?</h4>
                      <p>Please contact the super admin at ""</p>
                    </div>
                    <div>
                      <img src="" alt="" />
                    </div>
                  </li>
                </ul>
              </div>
              <div className="contact-details">
                <h1>Get In Touch!</h1>
                <div className="contact">
                  <label htmlFor="">Email Us</label>
                  <span>Support@Isdb.Org</span>
                </div>
                <div className="mail">
                  <label htmlFor="">Email Address*</label>
                  <input type="text" />
                </div>
                <div className="msg">
                  <label htmlFor="">Message*</label>
                  <input type="text" />
                </div>
                <button>Send Message</button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <footer>© 2024 IsDB. All rights reserved.</footer>
    </MainLayout>
  );
}
