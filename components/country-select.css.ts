import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const countries = style({
  display: 'flex',
  flexDirection: 'row',
  columnGap: '1rem',
  margin: '1rem',
})

export const item = recipe({
  base: {
    height: '79px',
    outline: 0,
    padding: 0,
    margin: 0,
    background: 'none',
    cursor: 'pointer',
    border: '2px solid transparent',
    selectors: {
      '&:focus-within, &:hover': {
        border: '2px solid blue',
      },
    },
  },
  variants: {
    selected: {
      true: {
        border: '2px solid red',
        ':hover': {
          border: '2px solid red',
        },
      },
    },
  },
})
