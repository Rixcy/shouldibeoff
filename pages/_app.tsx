import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { CountryContextProvider } from '../components/country-context'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CountryContextProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </CountryContextProvider>
  )
}

export default MyApp
