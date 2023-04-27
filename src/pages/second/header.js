import Head from "next/head";
import Layout from "../../components/layout";
import Link from "next/link";

export default function Header() {
    return (
        <Layout>
            <Head>
                <title>Dir second testing!</title>
            </Head>
 
            <h2 align="center">i am testing Dir second</h2>
            
            <p align="center">
                <Link href="/">go home</Link>
            </p>

            
        </Layout>
    )
}