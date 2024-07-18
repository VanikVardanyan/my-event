import { TextGreyLighten39 } from './../../../../consts/colors'
import { GreyBase, TextGreyBase, TextGreyLighten25 } from '@/shared/consts/colors'
import { FontH3, FontBody1, FontBody1Accent, FontSubtitle1, FontLandingBody2Accent } from '@/shared/consts/fontStyles'
import { tss } from 'tss-react/mui'

export default tss.withName('RequestModalInfo').create({
  root: {
    padding: 10,
    width: 'max-content',
    cursor: 'pointer',
    transition: '0.3s',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  title: {
    ...FontH3,
    marginBottom: 10,
    color: TextGreyLighten25,
  },
  label: {
    ...FontBody1Accent,
    color: GreyBase,
  },
  description: {
    ...FontSubtitle1,
    color: TextGreyLighten25,
  },
  infoTitle: {
    ...FontLandingBody2Accent,
    color: TextGreyLighten39,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 10,
  },
  other: {
    maxWidth: 100,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  otherWrapper: {
    maxWidth: 400,
  },
})
