import { tss } from 'tss-react/mui'
import { FontBody2, FontH4 } from '../../consts/fontStyles'
import { PinkBrownBase, PurpleBase, TextGreyBase, TextGreyLighten25 } from '../../consts/colors'

export default tss.withName('HomeWorkCard').create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',

    '& svg': {
      fill: PinkBrownBase,
    },
  },
  title: {
    ...FontH4,
    color: TextGreyBase,
    marginTop: 10,
  },
  description: {
    ...FontBody2,
    color: TextGreyLighten25,
    maxWidth: 250,
    marginTop: 5,
  },
})
