import { tss } from 'tss-react/mui'
import {
  SlateGreyDarken18,
  SlateGreyLighten32,
  TextSlateGreyBase,
  TextSlateGreyLighten30,
} from '../../../../../shared/consts/colors'
import { FontBody1 } from '../../../../../shared/consts/fontStyles'
import { blue } from '@mui/material/colors'

export default tss.withName('MessageItem').create({
  root: {
    display: 'flex',
    marginBottom: 10,
    alignItems: 'center',
  },
  rightMessage: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  message: {
    borderRadius: 16,
    background: 'rgba(0, 0, 0, 0.08)',
    padding: 10,
    ...FontBody1,
    border: `1px solid ${SlateGreyLighten32}`,
  },
  messageMe: {
    background: blue[100],
  },
})
