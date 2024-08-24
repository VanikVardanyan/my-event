import { tss } from 'tss-react/mui'
import { FontBody2, FontH4 } from '../../consts/fontStyles'
import { Black, DarkPurpleBase, TextGreyLighten25 } from '../../consts/colors'

export default tss.withName('VideoCard').create({
  playBtn: {
    '& svg': {
      width: 50,
      height: 50,
    },
    background: DarkPurpleBase,
  },
  root: {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: 6,
    cursor: 'pointer',
  },
  img: {
    width: '100%',
    height: 300,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
