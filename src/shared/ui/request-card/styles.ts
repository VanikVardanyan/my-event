import { Button, styled } from '@mui/material'
import {
  DarkBlueDarken4,
  DarkBlueLighten30,
  GreyBase,
  TextGreyBase,
  TextGreyLighten25,
  TextGreyLighten39,
} from '../../consts/colors'
import { FontH3, FontBody1, FontBody1Accent, FontSubtitle1, FontLandingBody2Accent } from './../../consts/fontStyles'
import { tss } from 'tss-react/mui'

export default tss.withName('RequestCard').create({
  root: {
    padding: 24,
    width: '100%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    borderRadius: 4,
    cursor: 'pointer',
  },

  title: {
    ...FontH3,
    marginBottom: 10,
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
  action: {},
  actions: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  otherWrapper: {
    display: 'flex',
    gap: 5,
  },
  percentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  percentTitle: {
    ...FontBody1,
    color: TextGreyBase,
  },
})

export const MoreButton = styled(Button)({
  backgroundColor: DarkBlueLighten30,
  color: 'white',

  '&:hover': {
    backgroundColor: DarkBlueDarken4,
  },
})
