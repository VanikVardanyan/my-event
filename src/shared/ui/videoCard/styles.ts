import { tss } from 'tss-react/mui'
import { FontBody2, FontH4 } from '../../consts/fontStyles'
import { Black, DarkPurpleBase, TextGreyLighten25 } from '../../consts/colors'
import { BreakPoints } from '../../consts/common'

export default tss.withName('VideoCard').create({
  wrapper: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '100%',
    width: '100%',
    height: 233,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 0,
    padding: 0,
    maxHeight: 'calc(100% - 10px)',
    overflowY: 'auto',

    [`@media (min-width: ${BreakPoints.EXTRA_SMALL})`]: {
      width: 'calc(90% - 10px)',
      height: 'calc(80% - 10px)',
      borderRadius: 12,
    },
  },
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
