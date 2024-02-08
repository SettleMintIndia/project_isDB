"use client";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const router = useRouter();
  const handleEdit = () => {
    router.push("/runSimulation_infoPage");
  };
  return (
    <div className="container-fluid">
      <div className="simulation-info">
        <div className="head">
          <img src="imgs/left-arrow.svg" alt="" />
          <h3>Back</h3>
        </div>
        <div className="simulation-section"></div>
      </div>
    </div>
  );
}
