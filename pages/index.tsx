import { useContext, useState } from "react";
import { useRouter } from "next/router";
import API_Auth from "./api/API_Auth";
import { UserContext } from "./context";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";

export default function Home() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userErr, setUserErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const router = useRouter();
  const { loginuseremail, setloginuseremail } = useContext(UserContext);

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
  return (
    <MainLayout>
      <div className="container-fluid ">

        <p>Landing Page</p>
      </div>
    </MainLayout>
  );
}
