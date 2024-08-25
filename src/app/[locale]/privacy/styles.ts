import { tss } from 'tss-react/mui'
import { FontBody2, FontH3 } from '@/shared/consts/fontStyles'
import { darkSlateGray, SlateGreyDarken7 } from '@/shared/consts/colors'

export default tss.withName('Privacy').create({
  root: {},
  mainTitle: {
    ...FontH3,
    color: darkSlateGray,
    marginBottom: 20,
  },
  title: {
    ...FontH3,
    color: darkSlateGray,
    marginBottom: 10,
  },
  description: {
    ...FontBody2,
    color: SlateGreyDarken7,
    marginBottom: 10,
  },
})
