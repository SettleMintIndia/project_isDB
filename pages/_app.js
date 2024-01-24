import "@/styles/globals.css";
import { useState } from "react";
import localFont from "next/font/local";
import AppLayout from "@/components/layout/AppLayout";
const myFont = localFont({
  src: [
    {
      path: "../public/fonts/gilroy-regular-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/gilroy-light-webfont.woff2",
      weight: "300",
      style: "light",
    },
    {
      path: "../public/fonts/gilroy-medium-webfont.woff2",
      weight: "500",
      style: "medium",
    },
    {
      path: "../public/fonts/gilroy-black-webfont.woff2",
      weight: "700",
      style: "bold",
    },
  ],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
}
