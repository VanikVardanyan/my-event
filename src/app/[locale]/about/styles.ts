import { tss } from 'tss-react/mui'
import { FontBody2, FontH3 } from '@/shared/consts/fontStyles'
import { darkSlateGray, SlateGreyDarken7 } from '@/shared/consts/colors'

export default tss.withName('About').create({
  root: {},
  title: {
    ...FontH3,
    color: darkSlateGray,
  },
  description: {
    ...FontBody2,
    color: SlateGreyDarken7,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
})
