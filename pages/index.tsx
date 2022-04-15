import type { NextPage } from 'next'
import Head from 'next/head'
import { useQuery } from 'react-query'
import { CountryDisplay } from '../components/country-display'
import * as s from '../styles/home.css'
import { CountryResults } from './api/answer'

const Home: NextPage = () => {
  const { error, data } = useQuery<CountryResults, Error>(['answer'], () =>
    fetch('/api/answer').then((res) => res.json())
  )

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

      <main>
        {error && <div>`An error has occurred: ${error.message}`</div>}
        <CountryDisplay data={data} />
      </main>
    </div>
  )
}

export default Home
