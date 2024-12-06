import { tss } from 'tss-react'
import { FontBody1 } from '@/shared/consts/fontStyles'
import { TextGreyLighten25 } from '@/shared/consts/colors'

export default tss.withName('requestCard').create({
  root: {
    borderRadius: 8,
    padding: 24,
    boxShadow: '0px 1px 17.6px 0px rgba(141, 141, 141, 0.25)',
    display: 'flex',
    justifyContent: 'space-between',
  },
  infoSection: {
    display: 'flex',
    gap: 21,
  },
  date: {
    ...FontBody1,
    color: TextGreyLighten25,
    marginTop: 8,
  },
  viewBtn: {
    marginTop: 24,
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
})
