import { tss } from 'tss-react/mui'

import { GreenLighten25, GreyBase, RedLighten30, White, YellowLighten24 } from '../../consts/colors'
import { FontBody1, FontButtonBig } from './../../consts/fontStyles'
import { TOAST_VARIANT } from './types'

export default tss
  .withName('Toast')
  .withNestedSelectors<'icon'>()
  .create(({ classes }) => ({
    root: {
      padding: '12px 24px 12px 12px',
      position: 'relative',
      display: 'inline-flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      backgroundColor: GreyBase,
      borderRadius: 12,
      color: White,
      transition: 'all 300ms ease-out',
      zIndex: 1000,
    },
    inner: {
      display: 'flex',
      flexFlow: 'row nowrap',
    },
    iconWrapper: {
      marginRight: 12,
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 24,
      height: 24,
      borderRadius: 12,
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'end',
      maxWidth: 377,
    },
    text: {
      ...FontBody1,
    },
    button: {
      marginTop: 21,
      display: 'inline-flex',
      ...FontButtonBig,
      cursor: 'pointer',
    },
    extra: {
      marginLeft: 60,
      ...FontButtonBig,
      cursor: 'pointer',
    },
    [TOAST_VARIANT.success]: {
      [`& .${classes.icon}`]: {
        backgroundColor: GreenLighten25,
      },
    },
    [TOAST_VARIANT.warning]: {
      [`& .${classes.icon}`]: {
        backgroundColor: RedLighten30,
      },
    },
    [TOAST_VARIANT.info]: {
      [`& .${classes.icon}`]: {
        backgroundColor: YellowLighten24,
      },
    },
  }))
