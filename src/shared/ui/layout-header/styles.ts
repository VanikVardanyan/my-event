import { tss } from 'tss-react/mui'

import {
  DarkBlueBase,
  DarkBlueDarken16,
  DarkBlueDarken4,
  PinkBrownBase,
  PinkBrownDarken16,
  PinkBrownDarken4,
  SlateGreyLighten49,
  TextGreyLighten25,
  TextSlateGreyLighten16,
  TextSlateGreyLighten30,
  White,
} from '@/shared/consts/colors'
import { BreakPoints } from '@/shared/consts/common'
import { Button, styled } from '@mui/material'
import { FontBody1, FontBody2 } from '../../consts/fontStyles'

export default tss.withName('LayoutHeader').create({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '11px 10px 11px 16px',
    background: DarkBlueBase,
    // boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
    zIndex: 1100,
    minHeight: 62,
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      padding: '11px 26px 11px 32px',
      display: 'flex',
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
    gap: 16,
    width: '100%',
    justifyContent: 'flex-end',
  },
  hamburg: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
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
    background: DarkBlueDarken16,
    border: `1px solid ${White}`,
    color: White,

    '&:hover': {
      background: DarkBlueDarken4,
    },
  },
  hamburgWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    marginRight: 16,
    gap: 16,

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      flexDirection: 'row',
    },
  },
  hamburgText: {
    ...FontBody2,
    color: White,
    display: 'none',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      display: 'inline',
    },
  },
  favoritIcon: {
    width: 40,
    height: 40,
    border: `1px solid ${White}`,
    borderRadius: 8,
  },
  profilePopupItem: {
    ...FontBody1,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    color: TextGreyLighten25,

    '& svg': {
      fill: TextGreyLighten25,
    },

    '&:hover': {
      color: PinkBrownBase,
    },
  },
})

export const LoginButton = styled(Button)({
  backgroundColor: DarkBlueDarken16,
  color: White,
  border: `1px solid ${White}`,

  '&:hover': {
    backgroundColor: DarkBlueDarken4,
    border: `1px solid ${TextSlateGreyLighten30}`,
  },
})
