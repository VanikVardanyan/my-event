import { styled } from '@mui/material'
import { tss } from 'tss-react/mui'
import { SlateGreyLighten46 } from '../../consts/colors'

export default tss.withName('ProfileCreatives').create({
  root: {},
  imagesWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 5,
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
