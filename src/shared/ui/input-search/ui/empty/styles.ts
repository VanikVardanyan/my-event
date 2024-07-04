import { tss } from 'tss-react/mui'

import { GreyBase, SlateGreyBase } from '@/shared/consts/colors'
import { FontBody1, FontH5 } from '@/shared/consts/fontStyles'

export default tss.withName('EmptySearch').create({
  root: {
    padding: 14,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  imgSection: {
    display: 'flex',
    justifyContent: 'center',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    textAlign: 'center',
    maxWidth: 240,
  },
  title: {
    ...FontH5,
    color: GreyBase,
  },
  description: {
    ...FontBody1,
    color: SlateGreyBase,
  },
})
