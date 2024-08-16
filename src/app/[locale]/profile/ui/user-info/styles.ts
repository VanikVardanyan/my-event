import { TextGreyBase, TextSlateGreyBase } from '@/shared/consts/colors'
import { FontBody1, FontBody2, FontH3, FontH4 } from '@/shared/consts/fontStyles'
import { tss } from 'tss-react/mui'
import { BreakPoints } from '../../../../../shared/consts/common'

export default tss.withName('UserInfo').create({
  root: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '20px 15px',
    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      gridTemplateColumns: 'auto 1fr',
    },
  },
  avatarSection: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    gap: 10,
    width: '100%',
    textAlign: 'center',
    marginBottom: 12,
  },
  avatar: {
    borderRadius: '50%',
    objectFit: 'cover',
    margin: '0 auto',
  },
  title: {
    ...FontH3,
    color: TextSlateGreyBase,
  },
  name: {
    ...FontH4,
    color: TextGreyBase,
  },
  requestCards: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    gap: 15,
  },
})
