import { tss } from 'tss-react/mui'
import { FontBody1, FontBody2, FontH3, FontSubtitle1 } from '../../consts/fontStyles'
import { PinkBrownBase, TextGreyLighten25 } from '../../consts/colors'

export default tss.withName('ServiceCard').create({
  root: {},
  img: {
    width: '100%',
    objectFit: 'cover',
  },
  title: {
    ...FontH3,
    color: PinkBrownBase,
  },
  description: {
    ...FontBody2,
    color: TextGreyLighten25,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
})
