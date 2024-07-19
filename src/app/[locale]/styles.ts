'use client'
import { styled } from '@mui/material'

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
import { DarkBlueBase, SlateGreyLighten45, White } from '@/shared/consts/colors'
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
    backgroundImage: 'url(/main/background.jpg)',
    padding: 20,
    backgroundSize: 'cover',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    gap: 40,
    marginBottom: 40,
    height: 350,

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      height: 600,
    },
  },
  content: {
    maxWidth: 440,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginTop: 0,
    marginLeft: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    padding: 10,
    textAlign: 'center',

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      marginTop: 100,
      marginLeft: 50,
      textAlign: 'left',
    },
  },
  title: {
    ...FontH3,
    color: White,

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      ...FontTitleBig,
    },
  },
  description: {
    ...FontBody2,
    color: White,
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
