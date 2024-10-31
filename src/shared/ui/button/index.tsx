import { Button, styled } from '@mui/material'
import { PinkBrownBase, PinkBrownDarken16 } from '../../consts/colors'

export const PinkButton = styled(Button)({
  backgroundColor: PinkBrownBase,
  color: 'white',
  maxWidth: 'fit-content',
  borderRadius: 40,
  boxShadow: '3px 4px 10.1px 0px #00000040',
  padding: '22px 48px',

  '&:hover': {
    backgroundColor: PinkBrownDarken16,
  },
})
