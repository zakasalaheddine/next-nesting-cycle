import Head from 'next/head'
import Layout from '../components/layout'
import Nests from '../components/nests'
import { prisma } from 'utils/db/prisma'

export default function Home({ nests, birds }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Nests nests={nests} birds={birds}/>
      </Layout>
    </div>
  )
}

export async function getStaticProps(_) {
  const nests = await prisma.nest.findMany()
  const birds = await prisma.bird.findMany()
  return { props: { nests, birds } }
}
