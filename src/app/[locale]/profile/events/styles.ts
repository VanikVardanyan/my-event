import { wrap } from 'module'
import { tss } from 'tss-react'
import { BreakPoints } from '../../../../shared/consts/common'
import { FontBody1, FontH4 } from '../../../../shared/consts/fontStyles'
import { TextGreyLighten25 } from '../../../../shared/consts/colors'

export const useStyles = tss.withName('ProfileProfessions').create({
  root: {},
  title: {
    ...FontH4,
    margin: '0 0 24px',
  },
  cardWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 24,
    boxShadow: ' 0px 1px 17.6px 0px rgba(141, 141, 141, 0.25);',
    padding: 24,
    borderRadius: 8,

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
  },
  addProfession: {
    maxWidth: 404,
    height: 203,
    boxShadow: '0px 1px 17.6px 0px rgba(141, 141, 141, 0.25)',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
  textGrey: {
    ...FontBody1,
    color: TextGreyLighten25,
  },
})
