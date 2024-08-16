import { tss } from 'tss-react/mui'
import { FontBody1, FontBody2, fontFamily, FontH3, FontH4, FontSubtitle1 } from '../../consts/fontStyles'
import { Black, DarkPurpleBase, PinkBrownBase, TextGreyLighten25 } from '../../consts/colors'

export default tss.withName('ServiceCard').create({
  root: {
    width: 261,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: 6,
  },
  img: {
    width: '100%',
    height: 300,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  title: {
    ...FontH4,
    color: Black,
    paddingLeft: 10,
    marginTop: 10,
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
