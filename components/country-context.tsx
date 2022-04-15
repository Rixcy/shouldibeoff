import { createContext, ReactNode, useContext, useState } from 'react'
import { Country } from '../utils/countries'

type CountryContext = {
  selectedCountry: Country
  setSelectedCountry: (country: Country) => void
}

const countryContext = createContext({} as CountryContext)

export const CountryContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>('england')

  return (
    <countryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
      {children}
    </countryContext.Provider>
  )
}

export const useCountryContext = () => {
  const context = useContext(countryContext)
  if (context === undefined) {
    throw new Error(
      'useCountryContext must be used within a CountryContextProvider'
    )
  }
  return context
}
