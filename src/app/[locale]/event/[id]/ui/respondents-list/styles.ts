import { tss } from 'tss-react/mui'
import { DarkBlueBase, DarkBlueDarken4, GreenDarken22, PinkBrownBase } from '@/shared/consts/colors'
import { FontBody1, FontH3 } from '@/shared/consts/fontStyles'
import { BreakPoints } from '@/shared/consts/common'
import { Button, styled } from '@mui/material'

export default tss.withName('RespondentsList').create({
  root: {
    display: 'flex',
  },
  profileSection: {
    maxWidth: 935,
    margin: 'auto',
    padding: '10px 0',
  },
  respondentsNames: {
    width: 300,
    border: `1px solid ${GreenDarken22}`,
    padding: 10,
  },
  profileWrapper: {
    marginLeft: 0,
    marginTop: 64,

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      marginLeft: 280,
    },
  },
  title: {
    ...FontH3,
    color: DarkBlueBase,
  },
  actionBlock: {
    display: 'flex',
    gap: 10,
    marginBottom: 10,
  },
  approve: {
    ...FontBody1,
    color: PinkBrownBase,
    display: 'flex',
    alignItems: 'center',
    gap: 5,

    '& svg': {
      fill: DarkBlueBase,
    },
  },
})

export const ApproveButton = styled(Button)({
  backgroundColor: DarkBlueBase,
  color: 'white',

  '&:hover': {
    backgroundColor: DarkBlueDarken4,
  },
})
