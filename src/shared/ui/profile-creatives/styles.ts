import { Button, styled } from '@mui/material'
import { tss } from 'tss-react/mui'
import { BreakPoints } from '../../consts/common'
import { PinkBrownBase, PinkBrownLighten30, RedDarken16 } from '../../consts/colors'
import { FontBody1 } from '../../consts/fontStyles'

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
  addImagesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
    marginBottom: 15,

    [`@media (min-width: ${BreakPoints.EXTRA_SMALL})`]: {
      flexDirection: 'row',
    },
  },
  maxError: {
    ...FontBody1,
    color: RedDarken16,
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
