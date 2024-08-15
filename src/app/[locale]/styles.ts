'use client'
import { Button, styled } from '@mui/material'

export const LayoutRoot = styled('div')(({ theme }) => ({
  flex: '1',
  overflowY: 'auto',
}))

// export const LayoutContainer = styled('div')(({ theme }) => ({
//   display: 'flex',
//   flex: '1 1 auto',
//   flexDirection: 'column',
// }))

export const Container = styled('div')(({ theme }) => ({
  padding: '0 12px 12px 12px',
  marginTop: 20,

  [theme.breakpoints.up('md')]: {
    marginTop: 30,
  },
}))

import { tss } from 'tss-react/mui'
import { DarkBlueBase, DarkBlueDarken16, PinkBrownBase, PinkBrownDarken16 } from '@/shared/consts/colors'
import { FontBody2, FontH3, FontTitleBig } from '@/shared/consts/fontStyles'
import { BreakPoints } from '@/shared/consts/common'

export default tss.withName('MainPage').create({
  image: {
    borderRadius: 8,
    width: '100%',
    objectFit: 'cover',
  },
  caterories: {
    ...FontH3,
    color: DarkBlueBase,
    marginBottom: 20,
  },
  root: {
    backgroundColor: DarkBlueBase,
    padding: 20,
    backgroundSize: 'cover',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    marginBottom: 40,
    gap: 40,
    // height: 350,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column-reverse',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      height: 600,
      gap: 80,

      flexDirection: 'row',
    },
  },
  layoutImage: {
    backgroundImage: 'url(/main/background1.png)',
    width: 500,
    height: 500,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    display: 'none',

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      display: 'block',
    },
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    marginTop: 20,
  },
  content: {
    maxWidth: 540,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginTop: 0,
    marginLeft: 0,
    borderRadius: 10,
    // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    padding: 10,
    textAlign: 'left',

    // [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
    //   marginTop: 100,
    //   marginLeft: 50,
    //   textAlign: 'left',
    // },
  },
  title: {
    ...FontH3,
    color: '#EEE9DB',

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      ...FontTitleBig,
    },
  },
  description: {
    ...FontBody2,
    color: '#EEE9DB',
  },
  cardsWrapper: {
    display: 'grid',
    rowGap: 24,
    columnGap: 18,
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',

    [`@media (min-width: ${BreakPoints.EXTRA_SMALL})`]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    },
  },
})

export const StartButton = styled(Button)({
  backgroundColor: PinkBrownBase,
  color: 'white',
  maxWidth: 'fit-content',

  '&:hover': {
    backgroundColor: PinkBrownDarken16,
  },
})
