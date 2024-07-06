import { tss } from 'tss-react/mui'

import { DarkGreen, SlateGreyLighten49, White } from '@/shared/consts/colors'
import { BreakPoints } from '@/shared/consts/common'

export default tss.withName('LayoutHeader').create({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '11px 10px',
    backgroundColor: White,
    boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
    position: 'sticky',
    bottom: 0,
    left: 0,
    zIndex: 1000,
    minHeight: 62,

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      display: 'none',
    },
  },
  navbarSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 40,
  },
  logoLink: {
    lineHeight: 0,
  },
  searchSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    width: '100%',
    justifyContent: 'flex-end',

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      gap: 16,
    },
  },
  hamburgerSection: {
    width: 40,
    height: 40,
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    outline: 'none',
    border: 'none',
    background: 'none',

    '&:hover': {
      background: SlateGreyLighten49,
    },
  },
  searchList: {
    bottom: 46,
    top: 'inherit',
  },
})
