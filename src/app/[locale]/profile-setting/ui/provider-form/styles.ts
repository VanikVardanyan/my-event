import { styled } from '@mui/material'
import { tss } from 'tss-react/mui'
import { SlateGreyBase } from '@/shared/consts/colors'
import { BreakPoints } from '@/shared/consts/common'

export default tss.withName('ProviderForm').create({
  root: {
    maxWidth: 1000,
    width: '100%',
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  avatarSection: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    gap: 15,
  },
  avatar: {
    width: 150,
    height: 150,
    objectFit: 'cover',
    borderRadius: '50%',
    margin: 'auto',
  },
  nameSection: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
    flexDirection: 'column',

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      flexDirection: 'row',
    },
  },
  network: {
    display: 'grid',
    gap: 15,
    gridTemplateColumns: '1fr',

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
  avatarWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  imageList: {
    marginTop: 15,
  },
  selectProfession: {
    zIndex: 100,
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
