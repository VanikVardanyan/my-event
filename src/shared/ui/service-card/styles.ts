import { tss } from 'tss-react/mui'
import { FontBody1, FontBody2, FontH3, FontH4, FontSubtitle1 } from '../../consts/fontStyles'
import { DarkPurpleBase, PinkBrownBase, TextGreyLighten25 } from '../../consts/colors'

export default tss.withName('ServiceCard').create({
  root: {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: 6,
  },
  img: {
    width: '100%',
    objectFit: 'cover',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  title: {
    ...FontH4,
    color: DarkPurpleBase,
    paddingLeft: 10,
  },
  description: {
    ...FontBody2,
    color: TextGreyLighten25,
    padding: 10,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
})
