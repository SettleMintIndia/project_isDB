import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();

    const handleLogin = () => {
        router.push("/listemplates")
    }

    return (
        <>
                <h1>Templates</h1>
               

        </>
    )
}
