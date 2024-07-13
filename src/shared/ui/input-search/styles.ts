import { tss } from 'tss-react'

import {
  GreyBase,
  PinkBrownBase,
  PurpleBase,
  PurpleLighten25,
  PurpleLighten40,
  RedBase,
  RedDarken16,
  SlateGreyLighten10,
  SlateGreyLighten45,
  SlateGreyLighten48,
  White,
} from '@/shared/consts/colors'
import { BreakPoints } from '@/shared/consts/common'
import { FontBody1 } from '@/shared/consts/fontStyles'

export default tss
  .withName('InputSearch')
  .withNestedSelectors<'root' | 'channelsList'>()
  .create(({ classes }) => ({
    root: {
      maxWidth: '100%',
      width: 'calc(100% - 15px)',
      position: 'absolute',
      display: 'flex',
      visibility: 'hidden',
      gap: 8,
      zIndex: 1000,
      background: PinkBrownBase,
      borderRadius: 10,

      [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
        position: 'relative',
        maxWidth: 320,
        display: 'flex',
        visibility: 'visible',
      },
    },
    showInput: {
      [`&.${classes.root}`]: {
        visibility: 'visible',
      },
    },
    searchIcon: {
      lineHeight: 0,
    },
    searchInput: {
      width: '100%',
      background: SlateGreyLighten48,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 40,
      borderRadius: 10,
      padding: 10,
      border: `1px solid transparent`,

      '&:hover': {
        border: `1px solid ${PurpleLighten25}`,
      },
      '&:focus-within': {
        border: `1px solid ${PurpleLighten25}`,
        boxShadow: `0px 0px 0px 3px ${PurpleLighten40}`,
      },
    },
    input: {
      ...FontBody1,
      color: GreyBase,
      width: '100%',
      background: SlateGreyLighten48,
      border: 'none',
      outline: 'none',
      caretColor: PurpleBase,
    },
    mobileInputButton: {
      width: 40,
      height: 40,
      background: 'inherit',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      outline: 'none',
      cursor: 'pointer',
      borderRadius: 10,
      border: `1px solid ${White}`,

      [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
        display: 'none',
      },
    },
    mobileCloseButton: {
      width: 40,
      height: 40,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'none',
      outline: 'none',
      background: SlateGreyLighten48,
      cursor: 'pointer',
      borderRadius: 10,
      flexShrink: 0,

      [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
        display: 'none',
      },
    },
    closeButton: {
      width: 16,
      height: 16,
      borderRadius: '50%',
      border: `1px solid ${SlateGreyLighten10}`,
      outline: 'none',
      display: 'none',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',

      [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
        display: 'flex',
      },

      '&:hover': {
        border: `1px solid ${RedBase}`,

        '& path, & circle': {
          stroke: RedBase,
        },
      },

      '&:active': {
        borderColor: RedDarken16,

        '& path, & circle': {
          stroke: RedDarken16,
        },
      },
    },
    channelsList: {
      width: '100%',
      maxHeight: 267,
      overflowY: 'auto',
      position: 'absolute',
      top: 46,
      borderRadius: 10,
      border: `1px solid ${SlateGreyLighten45}`,
      background: White,
      padding: 6,
      zIndex: 10,
    },
    channelListEmpty: {
      [`&.${classes.channelsList}`]: {
        padding: 12,
      },
    },
    channelItem: {},
  }))
