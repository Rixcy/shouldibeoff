// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DateTime } from 'luxon'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

type Data = {
  answer: 'yes' | 'no'
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

const datasetSchema = z.union([
  z.literal('england'),
  z.literal('wales'),
  z.literal('scotland'),
  z.literal('northern-ireland'),
])

const endpoint = 'https://www.gov.uk/bank-holidays.json'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method !== 'GET')
    res.status(405).json({ message: 'Method Not Allowed' })

  const data = await fetch(endpoint).then((d) => d.json())

  const currentDate = DateTime.now().toFormat('yyyy-LL-dd')

  let dataset = 'england-and-wales'
  if (req.query.dataset) {
    const result = datasetSchema.safeParse(req.query.dataset)
    if (!result.success) {
      return res.status(422).json({
        message:
          'Incorrect dataset. Please choose one of england, wales, scotland or northern-ireland',
      })
    }

    switch (result.data) {
      case 'england':
      case 'wales':
        dataset = 'england-and-wales'
        break
      case 'scotland':
        dataset = 'scotland'
        break
      case 'northern-ireland':
        dataset = 'northern-ireland'
        break
    }
  }

  const countryData = data[dataset].events

  const isBankHoliday = countryData.some((event: unknown) => {
    const result = eventSchema.safeParse(event)
    if (!result.success) {
      return res.status(500).json({
        message:
          "Couldn't parse Government event data. Please contact the developer",
      })
    }
    return result.data.date === currentDate
  })

  const answer = isBankHoliday ? 'yes' : 'no'

  res.status(200).json({ answer })
}
