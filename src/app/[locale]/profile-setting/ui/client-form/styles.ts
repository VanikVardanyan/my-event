import { styled } from '@mui/material'
import { tss } from 'tss-react/mui'
import { SlateGreyBase } from '@/shared/consts/colors'
import { BreakPoints } from '../../../../../shared/consts/common'

export default tss.withName('ClientForm').create({
  root: {
    maxWidth: 650,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
    flexDirection: 'column',

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      flexDirection: 'row',
    },
  },
  avatarSection: {
    width: 147,
    height: 147,
    borderRadius: '50%',
    overflow: 'hidden',
  },
  avatar: {
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
