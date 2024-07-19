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
import { DarkBlueBase, SlateGreyLighten45 } from '@/shared/consts/colors'
import { FontBody2, FontH3 } from '@/shared/consts/fontStyles'
import { BreakPoints } from '@/shared/consts/common'

export default tss.withName('MainPage').create({
  root: {
    background: SlateGreyLighten45,
    padding: 20,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    gap: 40,
    marginBottom: 40,

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      flexDirection: 'row',
    },
  },
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
  content: {
    maxWidth: 500,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  title: {
    ...FontH3,
  },
  description: {
    ...FontBody2,
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
