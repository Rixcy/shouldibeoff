// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DateTime } from 'luxon'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { countries } from '../../utils/countries'

export type CountryResults = {
  england: boolean
  wales: boolean
  scotland: boolean
  'northern-ireland': boolean
}

type Error = {
  message: string
}

const eventSchema = z.object({
  title: z.string(),
  date: z.string().regex(/\d{4}-\d{2}-\d{2}/),
  notes: z.string(),
  bunting: z.boolean(),
})

const endpoint = 'https://www.gov.uk/bank-holidays.json'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CountryResults | Error>
) {
  if (req.method !== 'GET')
    res.status(405).json({ message: 'Method Not Allowed' })

  const data = await fetch(endpoint).then((d) => d.json())

  const currentDate = DateTime.now().toFormat('yyyy-LL-dd')

  const results = countries.reduce((results, country) => {
    const dataset =
      country === 'england' || country === 'wales'
        ? 'england-and-wales'
        : country
    const isBankHoliday = data[dataset].events?.some((event: unknown) => {
      const result = eventSchema.safeParse(event)
      if (!result.success) {
        return res.status(500).json({
          message:
            "Couldn't parse Government event data. Please contact the developer",
        })
      }
      return result.data.date === currentDate
    })
    results[country] = isBankHoliday

    return results
  }, {} as CountryResults)

  res.status(200).json(results)
}
