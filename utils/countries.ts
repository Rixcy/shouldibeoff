export const countries = [
  'england',
  'wales',
  'scotland',
  'northern-ireland',
] as const

export type Country = typeof countries[number]
