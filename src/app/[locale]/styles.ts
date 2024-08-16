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
import {
  DarkBlueBase,
  DarkBlueDarken16,
  PinkBrownBase,
  PinkBrownDarken16,
  PurpleBase,
  TextGreyBase,
} from '@/shared/consts/colors'
import { FontBody1, FontBody2, FontH3, FontTitleBig } from '@/shared/consts/fontStyles'
import { BreakPoints } from '@/shared/consts/common'

export default tss.withName('MainPage').create({
  image: {
    borderRadius: 8,
    width: '100%',
    objectFit: 'cover',
  },
  categories: {
    ...FontH3,
    color: TextGreyBase,
  },
  root: {
    backgroundColor: DarkBlueBase,
    padding: 20,
    backgroundSize: 'cover',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    marginBottom: 40,
    gap: 40,
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
    width: 700,
    height: 700,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
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
    padding: 10,
    textAlign: 'left',
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
  titleWrapper: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 20,
  },
  subTitle: {
    ...FontBody2,
    color: TextGreyBase,
  },
  titleBorder: {
    width: 34,
    height: 3,
    background: TextGreyBase,
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto 5px',
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
  slickWrapper: {
    padding: '24px 12px',
    background: '#f7f9fa',
  },
  slick: {
    maxWidth: 1440,
    margin: 'auto',

    [`@media (min-width: ${BreakPoints.EXTRA_SMALL})`]: {
      padding: '24px 22px 0',
    },

    '& .slick-slide': {
      padding: 5,
    },
    '& .slick-list': {
      margin: '0 5px',
    },
    '& .slick-prev': {
      left: '-12px',
      top: '34%',
      zIndex: 100,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      [`@media (min-width: ${BreakPoints.EXTRA_SMALL})`]: {
        right: '-15px',
      },

      '&:before': {
        display: 'none',
      },
    },
    '& .slick-next': {
      right: '-12px',
      top: '34%',
      zIndex: 100,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      [`@media (min-width: ${BreakPoints.EXTRA_SMALL})`]: {
        right: '-15px',
      },

      '&:before': {
        display: 'none',
      },
    },
  },
  howWorkWrapper: {
    maxWidth: 1240,
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 50,
    flexDirection: 'column',

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  },
  questionsWrapper: {
    maxWidth: 1240,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
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
