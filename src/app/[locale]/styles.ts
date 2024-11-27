'use client'
import { Button, styled } from '@mui/material'

export const LayoutRoot = styled('div')(({ theme }) => ({
  flex: '1',
  overflowY: 'auto',
}))

export const Container = styled('div')(({ theme }) => ({
  padding: '0 12px 12px 12px',
  marginTop: 20,

  [theme.breakpoints.up('md')]: {
    marginTop: 30,
  },
}))

import { tss } from 'tss-react/mui'
import { Black, DarkBlueBase, PinkBrownBase, PinkBrownDarken16, TextGreyBase } from '@/shared/consts/colors'
import {
  FontBody1,
  FontBody1Accent,
  FontBody2,
  FontH3,
  FontH4,
  FontLandingBody2Accent,
  FontTitleBig,
} from '@/shared/consts/fontStyles'
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
    position: 'relative',
    backgroundColor: DarkBlueBase,
    backgroundImage: 'url(/main/background.png)',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    gap: 40,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      gap: 80,
    },
  },

  professionSmallList: {
    display: 'flex',
    gap: 10,
    marginBottom: '400px',
    overflow: 'hidden',
    maxWidth: '100%',
  },
  professionSmallListItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  professionSmallListItemText: {
    ...FontBody1,
    color: '#8F8F8F',
  },
  professionSmallListCircle: {
    width: 16,
    height: 16,
    border: '1px solid #8F8F8F',
    borderRadius: '50%',
    padding: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBottom: {
    position: 'absolute',
    height: 543,
    bottom: '-191px',
    width: '100%',
    backgroundImage: 'url(/main/headersBottomBG.png)',
    backgroundPosition: 'center',
    backgroundRepeat: 'none',
    backgroundSize: 'cover',
  },
  professionSmallListCircleFill: {
    width: 8,
    height: 8,
    border: '1px solid #8F8F8F',
    borderRadius: '50%',
    padding: 4,
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    marginTop: 20,
  },
  content: {
    maxWidth: 845,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginTop: 40,
    marginLeft: 0,
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      marginTop: 200,
    },
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
    marginTop: 40,
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
    background: '#F00CA40F',
    padding: '240px 20px 30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    gap: 16,

    [`@media (min-width: ${BreakPoints.EXTRA_SMALL})`]: {
      padding: '240px 20px 160px',
    },
  },
  howWorkSubTitle: {
    ...FontBody1,
    color: Black,
    maxWidth: 432,
  },
  howWorkTitle: {
    ...FontH3,
    color: PinkBrownBase,
  },
  howWorkDescription: {
    ...FontBody1,
    color: TextGreyBase,
    maxWidth: 900,
  },
  howWorkDescriptionBold: {
    ...FontLandingBody2Accent,
  },
  planWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '30px 20px 95px',
    flexDirection: 'column',
    gap: 20,

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      flexDirection: 'row',
      padding: '105px 20px 95px',

      gap: 0,
    },
  },
  planWrapperBorder: {
    width: 1,
    height: 328,
    background: PinkBrownBase,
    display: 'none',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      display: 'block',
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
