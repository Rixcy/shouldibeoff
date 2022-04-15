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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <main>
        {error && <div>`An error has occurred: ${error.message}`</div>}
        <CountryDisplay data={data} />
      </main>
    </div>
  )
}

export default Home
