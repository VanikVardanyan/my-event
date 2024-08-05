import { Button, styled } from '@mui/material'
import { tss } from 'tss-react/mui'
import { DarkBlueBase, PinkBrownBase, PinkBrownDarken16 } from '@/shared/consts/colors'
import { FontBody1, FontBody2 } from '@/shared/consts/fontStyles'

export default tss.withName('create-event').create({
  root: {},
  form: {
    maxWidth: 500,
    margin: 'auto',
  },
  actionBlock: {
    display: 'flex',
    gap: 10,
  },
  selectAction: {
    position: 'relative',
  },
  deletedServicesBtn: {
    position: 'absolute',
    right: '-40px',
    top: 25,
  },
  editableWrapper: {
    display: 'flex',
    gap: 10,
  },
  editableTitle: {
    ...FontBody1,
    color: PinkBrownBase,
  },
  editableValue: {
    ...FontBody1,
    color: DarkBlueBase,
  },
})

export const AddRequestButton = styled(Button)({
  backgroundColor: PinkBrownBase,
  color: 'white',

  '&:hover': {
    backgroundColor: PinkBrownDarken16,
  },
})
