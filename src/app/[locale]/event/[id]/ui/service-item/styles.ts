import { tss } from 'tss-react/mui'
import { PurpleBase } from '@/shared/consts/colors'

export default tss.withName('ServiceItem').create({
  statusBtn: {
    background: 'none',
    border: 'none',
    outline: 'none',
    color: PurpleBase,
    cursor: 'pointer',
  },
  statusSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  done: {
    color: '#32CD32',
  },
  todo: {
    color: '#808080',
  },
  doing: {
    color: '#FFA500',
  },
})
