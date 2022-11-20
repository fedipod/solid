import Head from 'next/head'
import {Login} from "../components/Login";

export default function Home() {
    return (
        <>
            <Head>
                <title>Getting Started: Inrupt JavaScript Client Libraries</title>
            </Head>

            <header>
                <h2>Getting Started</h2>
                <h3>with Inrupt JavaScript Client Libraries</h3>
            </header>

            <Login/>

        </>
    )
}
