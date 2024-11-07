import { Button, styled } from '@mui/material'
import { PinkBrownBase, PinkBrownDarken16 } from '../../consts/colors'

export enum BUTTON_SIZE {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

interface ButtonProps {
  btn_size?: BUTTON_SIZE
}

const buttonSize = {
  [BUTTON_SIZE.SMALL]: '8px 32px',
  [BUTTON_SIZE.MEDIUM]: '22px 48px',
  [BUTTON_SIZE.LARGE]: '30px 64px',
}

export const PinkButton = styled(Button)<ButtonProps>(({ theme, btn_size, fullWidth }) => ({
  backgroundColor: PinkBrownBase,
  color: 'white',
  maxWidth: fullWidth ? '100%' : 'fit-content',
  borderRadius: btn_size ? 8 : 40,
  boxShadow: '3px 4px 10.1px 0px #00000040',
  padding: btn_size ? buttonSize[btn_size] : buttonSize[BUTTON_SIZE.MEDIUM],
  '&:hover': {
    backgroundColor: PinkBrownDarken16,
  },
}))
