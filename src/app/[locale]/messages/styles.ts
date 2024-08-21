import { tss } from 'tss-react/mui'
import { TextSlateGreyLighten30 } from '../../../shared/consts/colors'

export default tss.withName('MessagesRoot').create({
  allContactWrapper: {
    padding: '15px 0',
    position: 'fixed',
    background: 'white',
    left: 0,
    right: 0,
    top: 60,
    width: '100%',
    zIndex: '100',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: TextSlateGreyLighten30,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
})
