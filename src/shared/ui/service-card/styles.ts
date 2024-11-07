import { tss } from 'tss-react/mui'
import {
  FontBody1,
  FontBody1Accent,
  FontBody2,
  fontFamily,
  FontH3,
  FontH4,
  FontSubtitle1,
} from '../../consts/fontStyles'
import { Black, DarkPurpleBase, PinkBrownBase, TextGreyLighten25 } from '../../consts/colors'

export default tss.withName('ServiceCard').create({
  root: {},
  img: {
    width: '100%',
    height: 290,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: 8,
  },
  title: {
    ...FontBody1Accent,
    color: Black,
    marginTop: 7,
  },
  description: {
    ...FontBody2,
    fontSize: 16,
    color: '#4C4848',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    marginBottom: 10,
  },
})
