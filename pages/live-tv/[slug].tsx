// https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props

import type { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { getContent, Content } from '../../app/contentService'

export const getServerSideProps = (async (context: GetServerSidePropsContext) => {
    const slug = typeof context.query.slug === 'string' ? context.query.slug : ''
    if (!slug) {
        return { notFound: true }
    }
    const content: Content | null = getContent(slug)
    if (!content) {
        return { notFound: true }
    }
    return { props: { content } }
}) satisfies GetServerSideProps<{ content: Content }>

export default function Page({ content }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <Head>
                <title>{content.name} | Live TV</title>
                <meta name="description" content={content.description} />
            </Head>
            <main>
                <h1>{content.name}</h1>
                <p>{content.description}</p>
            </main>
        </>
    )
}