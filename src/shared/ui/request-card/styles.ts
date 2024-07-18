import { GreyBase, TextGreyBase, TextGreyLighten25, TextGreyLighten39 } from '../../consts/colors'
import { FontH3, FontBody1, FontBody1Accent, FontSubtitle1, FontLandingBody2Accent } from './../../consts/fontStyles'
import { tss } from 'tss-react/mui'

export default tss.withName('RequestCard').create({
  root: {
    padding: 24,
    width: '100%',
    boxShadow: '0 2px 12px #eef1f7',
    borderRadius: 4,
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
})
