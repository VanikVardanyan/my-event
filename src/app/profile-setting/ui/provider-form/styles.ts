import { styled } from '@mui/material'
import { tss } from 'tss-react/mui'
import { SlateGreyBase } from '@/shared/consts/colors'

export default tss.withName('ProviderForm').create({
  root: {
    maxWidth: 650,
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
    width: 147,
    height: 147,
    borderRadius: '50%',
    border: `1px solid ${SlateGreyBase}`,
  },
  nameSection: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
  },
  network: {
    display: 'grid',
    gap: 15,
    gridTemplateColumns: '1fr 1fr',
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
