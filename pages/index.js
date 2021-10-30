import Head from 'next/head'
import Layout from '../components/layout'
import Nests from '../components/nests'
import { PrismaClient } from '@prisma/client'

export default function Home({ nests }) {
  console.log(nests)
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Nests data={nests} />
      </Layout>
    </div>
  )
}

export async function getStaticProps(_) {
  const prisma = new PrismaClient()
  const nests = await prisma.nest.findMany()
  return { props: { nests } }
}
