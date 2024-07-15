import { Button, styled } from '@mui/material'
import { tss } from 'tss-react/mui'
import { BreakPoints } from '../../consts/common'
import { PinkBrownBase, PinkBrownLighten30 } from '../../consts/colors'

export default tss.withName('ProfileCreatives').create({
  root: {},
  imagesWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 5,

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      justifyContent: 'flex-start',
    },
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    objectFit: 'cover',
  },
})

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

export const AddButton = styled(Button)({
  backgroundColor: PinkBrownBase,
  color: 'white',

  '&:hover': {
    backgroundColor: PinkBrownLighten30,
  },
})
