import { tss } from 'tss-react'
import { FontBody1, FontH4 } from '@/shared/consts/fontStyles'
import { TextGreyLighten25 } from '@/shared/consts/colors'

export default tss.withName('requestCard').create({
  root: {},
  title: {
    ...FontH4,
    margin: '0 0 0 27px',
  },
  notificationsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    margin: '46px 27px 27px',
    boxShadow: '0px 1px 17.6px 0px rgba(141, 141, 141, 0.25)',
    padding: 24,
    borderRadius: 8,
  },
})
