import { style } from '@vanilla-extract/css'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: 'rgb(241 245 249)',
  width: '100%',
  textAlign: 'center',
})

export const answer = style({
  fontSize: '48px',
  lineHeight: 1,
  fontWeight: 'bold',
  textTransform: 'uppercase',
})
