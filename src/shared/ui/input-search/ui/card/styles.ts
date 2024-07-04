import { tss } from 'tss-react/mui'

import { GreyBase, SlateGreyLighten10, SlateGreyLighten49 } from '@/shared/consts/colors'
import { FontBody1Accent, FontCaption } from '@/shared/consts/fontStyles'

export default tss.withName('SearchCard').create({
  root: {
    display: 'flex',
    gap: 10,
    padding: '10px 14px',
    overflow: 'hidden',
    cursor: 'pointer',
    borderRadius: 6,

    '&:hover': {
      background: SlateGreyLighten49,
    },
  },
  avatar: {
    borderRadius: '50%',
  },
  userName: {
    ...FontBody1Accent,
    color: GreyBase,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 200,
  },
  subscriber: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    color: SlateGreyLighten10,
    ...FontCaption,

    '& svg': {
      lineHeight: 0,
    },
  },
})
