import { DarkBlueDarken16, SlateGreyDarken18, TextSlateGreyLighten16 } from './../../consts/colors'
import { tss } from 'tss-react/mui'
import { BreakPoints } from '../../consts/common'
import { FontBody1 } from '../../consts/fontStyles'
import { TextGreyBase } from '../../consts/colors'

export default tss.withName('UserCardMini').create({
  root: {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    maxWidth: 470,
    width: '100%',
    flexDirection: 'column',
    padding: '10px 8px',
    border: `1px solid ${TextSlateGreyLighten16}`,
    borderRadius: 6,

    [`@media (min-width: ${BreakPoints.EXTRA_SMALL})`]: {
      flexDirection: 'row',
    },
  },
  text: {
    ...FontBody1,
    color: TextGreyBase,
    textAlign: 'center',

    [`@media (min-width: ${BreakPoints.EXTRA_SMALL})`]: {
      textAlign: 'inherit',
    },
  },
  name: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 5,

    '& svg': {
      flexShrink: 0,
    },
  },
})
