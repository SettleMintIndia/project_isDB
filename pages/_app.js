import "@/styles/globals.css";
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import UserProvider from './context';


export default function App({ Component, pageProps }) {
  return (
    <>
      <UserProvider>

        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
        </UserProvider>

        </>
        );
}
