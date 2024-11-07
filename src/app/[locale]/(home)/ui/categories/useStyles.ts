import { GreyBase, PinkBrownBase, White } from '@/shared/consts/colors'
import { tss } from 'tss-react'
import { BreakPoints } from '@/shared/consts/common'
import { FontBody1, FontBody1Accent, FontH3 } from '@/shared/consts/fontStyles'

export default tss.withName('Categories').create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 22,

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      gap: 92,
    },
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',

    [`@media (min-width: ${BreakPoints.EXTRA_LARGE})`]: {
      flexDirection: 'row',
    },
  },

  descriptionSection: {
    maxWidth: 600,
  },
  title: {
    ...FontH3,
    color: PinkBrownBase,
    marginBottom: 40,
  },
  subTitle: {
    ...FontBody1,
    color: GreyBase,
  },
  subTitleBold: {
    ...FontBody1Accent,
    margin: '16px 0',
  },
  slickWrapper: {
    padding: '24px 12px',
    overflow: 'hidden',
    margin: '0 auto',
    maxWidth: '100%',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      maxWidth: 900,
    },

    '& .slick-track': {
      display: 'flex',
    },
  },
  slick: {
    '& .slick-slide': {
      minHeight: 414,
      padding: 9,
      backgroundColor: '#9747FF30',
      borderRadius: 8,
      margin: '0 12px',
    },
    '& .slick-list': {
      width: 'auto',
      overflow: 'auto',
      margin: '0 5px',
    },
    '& .slick-prev': {
      width: 56,
      height: 56,
      background: White,
      boxShadow: '6px 6px 11.2px 0px #00000040;',
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
      width: 56,
      height: 56,
      background: White,
      boxShadow: '6px 6px 11.2px 0px #00000040;',
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
  btnAction: {
    margin: 'auto',
  },
})
