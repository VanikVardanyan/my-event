import { DarkBlueBase, PinkBrownBase, TextGreyDarken7, White } from './../../consts/colors'
import { tss } from 'tss-react/mui'
import { BreakPoints } from '../../consts/common'
import { FontBody1, FontBody1Accent } from '../../consts/fontStyles'
import { TextGreyBase } from '../../consts/colors'

export default tss.withName('UserCardMini').create({
  userCardWrapper: {
    maxWidth: 470,
    width: '100%',
    padding: '10px 12px',
    borderRadius: 6,
    background: White,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  root: {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',

    [`@media (min-width: ${BreakPoints.EXTRA_SMALL})`]: {
      flexDirection: 'row',
    },
  },
  moreBtn: {
    width: '100%',

    [`@media (min-width: ${BreakPoints.EXTRA_SMALL})`]: {
      width: 'initial',
    },
  },
  text: {
    ...FontBody1,
    color: TextGreyBase,
    textAlign: 'center',
    maxWidth: 170,
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    [`@media (min-width: ${BreakPoints.EXTRA_SMALL})`]: {
      textAlign: 'inherit',
    },
  },
  img: {
    borderRadius: '50%',
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
  selection: {
    position: 'absolute',
    right: 3,
    top: 3,

    [`@media (min-width: ${BreakPoints.EXTRA_SMALL})`]: {
      position: 'relative',
      right: 0,
      top: 0,
    },
  },
  actionBlock: {
    display: 'flex',
    gap: 15,
    width: '100%',

    [`@media (min-width: ${BreakPoints.EXTRA_SMALL})`]: {
      width: 'initial',
    },
  },

  mobileLike: {
    display: 'block',
    width: 40,
    height: 40,

    [`@media (min-width: ${BreakPoints.EXTRA_SMALL})`]: {
      display: 'none',
    },
  },
  desktopLike: {
    display: 'none',
    width: 40,
    height: 40,

    [`@media (min-width: ${BreakPoints.EXTRA_SMALL})`]: {
      display: 'block',
    },
  },
  countSection: {
    display: 'flex',
    gap: 15,
  },
  biography: {
    ...FontBody1,
    color: TextGreyDarken7,
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  countText: {
    ...FontBody1,
    color: DarkBlueBase,
  },
  count: {
    ...FontBody1Accent,
    color: PinkBrownBase,
  },
})
