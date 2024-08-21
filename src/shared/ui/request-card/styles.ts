import { Button, styled } from '@mui/material'
import {
  Black,
  DarkBlueBase,
  DarkBlueDarken4,
  DarkBlueLighten30,
  GreyBase,
  PinkBrownBase,
  PurpleBase,
  TextGreyBase,
  TextGreyLighten25,
  TextGreyLighten39,
} from '../../consts/colors'
import {
  FontH3,
  FontBody1,
  FontBody1Accent,
  FontSubtitle1,
  FontLandingBody2Accent,
  FontBody2,
} from './../../consts/fontStyles'
import { tss } from 'tss-react/mui'
import { BreakPoints } from '../../consts/common'

export default tss.withName('RequestCard').create({
  requestCard: {
    padding: 24,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    borderRadius: 4,
  },
  requestCardServices: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 10,
    border: `1px solid ${PinkBrownBase}`,
    borderRadius: 6,
    padding: 10,
    width: 'max-content',
  },
  serviceWrapper: {},
  service: {
    ...FontBody1,

    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    marginBottom: 5,
  },
  serviceTitle: {
    color: PurpleBase,
  },
  requestCardGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  servicesTitle: {
    ...FontBody2,
    marginBottom: 5,
  },
  root: {
    padding: 24,
    width: '100%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    borderRadius: 4,
    cursor: 'pointer',
    backgroundImage: 'none',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',

    [`@media (min-width: ${BreakPoints.EXTRA_SMALL})`]: {
      backgroundImage: 'url(/profile/todo.png)',
    },
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
    maxWidth: 350,
    gap: 5,
  },
  percentTitle: {
    ...FontBody1,
    color: TextGreyBase,
  },
})

export const MoreButton = styled(Button)({
  backgroundColor: Black,
  color: 'white',

  '&:hover': {
    backgroundColor: DarkBlueDarken4,
  },
})

export const RespondSendButton = styled(Button)({
  backgroundColor: Black,
  color: 'white',

  '&:hover': {
    backgroundColor: DarkBlueDarken4,
  },
})

export const RespondButton = styled(Button)({
  backgroundColor: DarkBlueBase,
  color: 'white',

  '&:hover': {
    backgroundColor: DarkBlueDarken4,
  },
})
