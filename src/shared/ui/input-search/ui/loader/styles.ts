import { tss } from 'tss-react/mui'

import { SlateGreyLighten49 } from '@/shared/consts/colors'

export default tss.withName('SearchLoader').create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  root: {
    display: 'flex',
    width: '100%',
    gap: 10,
    padding: '10px 14px',
    background: SlateGreyLighten49,
    borderRadius: 10,
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  subscriber: {
    display: 'flex',
    gap: 4,
  },
})
