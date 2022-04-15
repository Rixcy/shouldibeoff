import type { NextPage } from 'next'
import Head from 'next/head'
import { useQuery } from 'react-query'
import { useCountryContext } from '../components/country-context'
import { CountrySelect } from '../components/country-select'
import * as s from '../styles/home.css'

const Home: NextPage = () => {
  const { selectedCountry } = useCountryContext()

  const { isLoading, error, data } = useQuery<{ answer: 'yes' | 'no' }, Error>(
    ['answer', selectedCountry],
    () =>
      fetch(`/api/answer?dataset=${selectedCountry}`).then((res) => res.json())
  )

  return (
    <div className={s.container}>
      <Head>
        <title>Should I be off? {data?.answer}</title>
        <meta
          name="description"
          content="Ever wondered if you should be off work today? Is it Good Friday, is it Christmas? This simple site will tell you."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={s.answer}>
          {isLoading && '...'}
          {data && data.answer}
          {error && `An error has occurred: ${error.message}`}
        </div>
        <CountrySelect />
      </main>
    </div>
  )
}

export default Home
