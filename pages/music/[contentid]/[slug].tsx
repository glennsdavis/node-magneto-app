// https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props

import type { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { getsMusic, Content } from '../../../app/contentService'

export const getServerSideProps = (async (context: GetServerSidePropsContext) => {    
    const contentid = typeof context.query.contentid === 'string' ? context.query.contentid : ''
    if (!contentid ) {
        return { notFound: true }
    }
    const content: Content | null = getsMusic(contentid)
    if (!content) {
        return { notFound: true }
    }
    return { props: { content } }
}) satisfies GetServerSideProps<{ content: Content }>

export default function Page({ content }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <Head>
                <title>{content.name} | Shows</title>
                <meta name="description" content={content.description} />
            </Head>
            <main>
                <h1>{content.name}</h1>
                <p>{content.description}</p>
            </main>
        </>
    )
}