import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import * as s from './country-select.css'
import eng from '../public/gb-eng.svg'
import nir from '../public/gb-nir.svg'
import sct from '../public/gb-sct.svg'
import wls from '../public/gb-wls.svg'
import Image from 'next/image'
import { countries } from '../utils/countries'
import { useCountryContext } from './country-context'

const maps = {
  england: eng,
  scotland: sct,
  wales: wls,
  'northern-ireland': nir,
}

export const CountrySelect = () => {
  const { selectedCountry, setSelectedCountry } = useCountryContext()

  return (
    <ToggleGroupPrimitive.Root
      type="single"
      value={selectedCountry}
      onValueChange={(value) =>
        setSelectedCountry(value as typeof countries[number])
      }
      aria-label="Country"
    >
      <div className={s.countries}>
        {countries.map((country) => (
          <ToggleGroupPrimitive.Item
            key={country}
            value={country}
            aria-label={country}
            className={s.item({ selected: selectedCountry === country })}
          >
            <Image height="75px" width="100px" src={maps[country]} alt="" />
          </ToggleGroupPrimitive.Item>
        ))}
      </div>
    </ToggleGroupPrimitive.Root>
  )
}
