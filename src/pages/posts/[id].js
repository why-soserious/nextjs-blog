import Layout from "@/components/layout";
import { getAllPostIds, getPostData } from "@/lib/posts";
import Head from "next/head";
import Date from "@/components/date";
import utilStyles from "@/styles/utils.module.css"

export default function Post( props ) {
    return (
    <Layout>
        <Head>
            <title>{props.postData.title}</title>
        </Head>

        {/* <section>
            <br />
            {props.postData.id}
            <br />
            
        </section>    */}
        <article>
            <h1 className={utilStyles.headingXl}>{props.postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={props.postData.date}></Date>
            </div>
            {/* <section>
                {props.postData.contentHtml}
            </section> */}

            <div dangerouslySetInnerHTML={{ __html: props.postData.contentHtml }} />
        </article>  

    </Layout>)
}


export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths, 
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}