import * as s from './country-display.css'
import eng from '../public/gb-eng.svg'
import nir from '../public/gb-nir.svg'
import sct from '../public/gb-sct.svg'
import wls from '../public/gb-wls.svg'
import Image from 'next/image'
import { countries, Country } from '../utils/countries'

const maps = {
  england: eng,
  scotland: sct,
  wales: wls,
  'northern-ireland': nir,
}

type CountryDisplayProps = {
  data?: {
    [k in Country]: boolean
  }
}

export const CountryDisplay = (props: CountryDisplayProps) => {
  const { data } = props

  return (
    <div className={s.countries}>
      {countries.map((country) => (
        <div key={country} className={s.country}>
          <div className={s.item({ off: Boolean(data?.[country]) })}>
            <Image
              key={country}
              height="75px"
              width="100px"
              src={maps[country]}
              alt=""
            />
          </div>
          {data && (
            <div className={s.result}>{data[country] ? 'Yes' : 'No'}</div>
          )}
        </div>
      ))}
    </div>
  )
}
