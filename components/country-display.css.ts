import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const countries = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '2rem',
  margin: '1rem',
  '@media': {
    '(min-width: 768px)': {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
})

export const country = style({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '1rem',
})

export const result = style({
  fontSize: '1.5rem',
  lineHeight: 1,
  fontWeight: 'bold',
  textTransform: 'uppercase',
  '@media': {
    '(min-width: 768px)': {
      fontSize: '2rem',
    },
  },
})

export const item = recipe({
  base: {
    display: 'flex',
    border: '2px solid red',
  },
  variants: {
    off: {
      true: {
        border: '2px solid green',
        ':hover': {
          border: '2px solid green',
        },
      },
    },
  },
})
