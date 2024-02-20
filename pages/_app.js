import "@/styles/globals.css";
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
}
