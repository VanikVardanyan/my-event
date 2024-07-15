'use client'
import { styled, Theme } from '@mui/material'

export const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1',
  maxWidth: '100%',
  overflow: 'auto',
  flexDirection: 'column',
}))

export const LayoutContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%',
}))

export const Container = styled('div')(({ theme }) => ({
  padding: '0 12px 12px 12px',
  marginTop: 20,

  [theme.breakpoints.up('md')]: {
    marginTop: 30,
  },
}))

import { tss } from 'tss-react/mui'
import { SlateGreyLighten45 } from '@/shared/consts/colors'
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

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      flexDirection: 'row',
    },
  },
  image: {
    borderRadius: 8,
    width: '100%',
    objectFit: 'cover',
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
})
