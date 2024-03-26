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

  const faqs = [
    {
      question:
        "What is the objective of the Smart Stabilization System (SSS)?",
      answer:
        "The SSS aims to add substantial value to the market by strategically managing the gap between supply and demand. The overarching goal is to reduce price volatility while preserving the essential role that this market gap plays in equilibrating the broader financial landscape. Leveraging the capabilities of blockchain technology, the SSS will be designed to proactively manage pressure on prices before changes occur.",
    },
    {
      question: "How does the SSS work?",
      answer:
        "The gap between supply and demand is managed by applying a deduction to excess supply or demand. This deduction is transferred to a blockchain-based Stabilization Network in exchange for Stabilization tokens or S-tokens. The Network acts as a fund to back and support the stabilization system.",
    },
    {
      question:
        "Can I customize templates for simulations according to specific scenarios?",
      answer:
        "Yes, both Super Admins and Admins have the ability to create and customize templates for simulations, allowing for flexibility in addressing various scenarios such as crashes, bubbles, and more. It can be done by editing the current template and storing it with a new name.",
    },
    {
      question: "How can I request a new scenario type for simulation?",
      answer:
        "Admins can request the Super Admin to create new scenario types by raising it on the portal.",
    },
    {
      question: "What is the purpose of this site?",
      answer:
        "In the initial phase (Phase 1) of the project, the key objective is to develop an exchange platform where an admin can run simulations enabled with a smart stabilization system algorithm and without it along with visualization of its output. This workable demo will be presented to the member countries, and they will be introduced to the groundbreaking SSS. The aim is not only to showcase the technological prowess of the system but also to ignite interest and enthusiasm among member countries to actively participate as the pioneering users in subsequent project phases.",
    },
    {
      question: "How do I create an account?",
      answer: ` Please contact the super admin at <strong><a href='mailto:KSolutions@isdb.org' style={{fontWeight:"bold"}}>"KSolutions@isdb.org"</a></strong>`,
    },
    {
      question: "How do I reset my password?",
      answer: ` Please contact the super admin at <strong><a href='mailto:KSolutions@isdb.org'>"KSolutions@isdb.org"</a></strong>`,
    },
  ];
  const [expandedItems, setExpandedItems] = useState({});
  const toggleColumn = (index: number) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

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
          <div className="objective">
            <div className="objective-title">
              <h1>Objective</h1>
            </div>
            <div className="row">
              <div className="col">
                <p>
                  The Smart Stabilization System (SSS) addresses the inherent
                  challenges posed by price volatility in capital markets within
                  organized exchanges, the SSS endeavors to revolutionize the
                  dynamics of market equilibrium. The primary objective for
                  IsDBI is to intricately manage the delicate balance between
                  supply and demand, thereby mitigating the fluctuations in
                  prices while simultaneously preserving the essential role that
                  market gaps play in equilibrating the broader economic
                  landscape. This report serves as a comprehensive overview,
                  laying the foundation for the forthcoming phases of
                  development and implementation, charting a course toward
                  greater stability and resilience in the financial domain.
                </p>
              </div>
              <div className="col">
                <p>
                  The primary objective of the SSS project is to revolutionize
                  the landscape of capital markets within organized exchanges by
                  addressing the prevalent issue of "excess volatility." This
                  excess volatility, identified through comprehensive studies,
                  has been identified as a phenomenon not inherently tied to
                  economic fundamentals, posing a detriment to economic
                  progress.
                </p>
              </div>
              <div className="col">
                <p>
                  Consequently, the SSS aims to add substantial value to the
                  market by strategically managing the gap between supply and
                  demand. The overarching goal is to reduce price volatility
                  while preserving the essential role that this market gap plays
                  in equilibrating the broader financial landscape. Leveraging
                  the capabilities of blockchain technology, the SSS will be
                  designed to proactively manage pressure on prices before
                  changes occur.
                </p>
              </div>
            </div>
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
                      <div className="col-md-3">
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
                      <div className="col-md-3">
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
                      <div className="col-md-3">
                        <div className="panel-options">
                          <div className="optionsIcon">
                            <img src="imgs/addition.svg" alt="" />
                          </div>
                          <div className="optionsContent">
                            <h4>3. Scenario Type Addition</h4>
                            <p>
                              Super Admins have the capability to add new types
                              of scenarios, expanding the platform&apos;s
                              versatility to accommodate emerging needs and
                              trends.
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
                        simulations and managing templates. Here&apos;s how they
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
                              they&apos;ve personally created, enabling
                              flexibility and customization.
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
            <div className="faqs-contact">
              <div className="faqs">
                <h1>Frequently Asked Questions</h1>

                <ul className="faqs-list">
                  {faqs.map((faq, index) => (
                    <li key={index}>
                      <div className="que-ans">
                        <div className="que">
                          <h4>{faq.question}</h4>
                          <img
                            src={
                              expandedItems[index]
                                ? "imgs/hide.svg"
                                : "imgs/show.svg"
                            }
                            alt=""
                            onClick={() => toggleColumn(index)}
                          />
                        </div>
                        <p
                          className={
                            expandedItems[index] ? "ans expand" : "ans compress"
                          }
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        ></p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="contact-details">
                <h1>GET IN TOUCH</h1>
                {/* <div className="contact-sources"> */}
                <div className="contact">
                  <label htmlFor="">Email Us</label>
                  <Link href="mailto:KSolutions@isdb.org">
                    KSolutions@isdb.org
                  </Link>
                </div>
                <div className="url">
                  <label htmlFor="">Visit for more information</label>
                  <Link href=""> https://isdbinstitute.org/</Link>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        © 2024 <strong>IsDBI</strong> . All rights reserved.
      </footer>
    </MainLayout>
  );
}
