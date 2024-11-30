import { tss } from 'tss-react/mui'
import { FontBody1, FontBody1Accent, FontBody2, FontH3 } from '@/shared/consts/fontStyles'
import {
  Black,
  DarkBlueBase,
  darkSlateGray,
  PinkBrownBase,
  SlateGreyDarken7,
  TextGreyBase,
  White,
} from '@/shared/consts/colors'

export default tss.withName('About').create({
  root: {},
  title: {
    ...FontH3,
    color: darkSlateGray,
  },
  description: {
    ...FontBody2,
    color: SlateGreyDarken7,
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    marginBottom: 64,
  },
  main: {
    ...FontBody1Accent,
    color: Black,
  },
  goal: {
    background: DarkBlueBase,
    padding: '42px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 64,
  },
  goalTitle: {
    ...FontH3,
    color: White,
    marginBottom: 32,
  },
  goalDescription: {
    ...FontBody2,
    color: White,
    maxWidth: 790,
  },
  footerTitle: {
    ...FontH3,
    color: PinkBrownBase,
    marginBottom: 40,
  },
  footerItem: {
    ...FontBody1,
    maxWidth: 700,
    color: TextGreyBase,
    marginBottom: 24,
  },
})
