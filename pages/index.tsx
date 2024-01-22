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
            <div className="form-container">
                <h1>Login</h1>
                <section>
                    <input type="text" name="username" placeholder="Username" />
                    <br />
                    <input type="password" name="password" placeholder="Password" />
                    <br />
                    <button type="button" role="button" onClick={() => handleLogin()}>Login</button>

                </section>
            </div>

        </>
    )
}
