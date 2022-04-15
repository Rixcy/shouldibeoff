import type { NextPage } from 'next'
import Head from 'next/head'
import { useQuery } from 'react-query'
import * as s from '../styles/home.css'

const Home: NextPage = () => {
  const { isLoading, error, data } = useQuery<{ answer: 'yes' | 'no' }, Error>(
    ['answer'],
    () => fetch('/api/answer').then((res) => res.json())
  )

  if (isLoading) return <>Loading...</>

  if (error) return <>An error has occurred: {error.message}</>

  return (
    <div className={s.container}>
      <Head>
        <title>Should I be off?</title>
        <meta
          name="description"
          content="Ever wondered if you should be off work today? Is it Good Friday, is it Christmas? This simple site will tell you."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={s.answer}>{data.answer}</main>
    </div>
  )
}

export default Home
