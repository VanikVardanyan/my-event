import { Button, styled } from '@mui/material'
import { tss } from 'tss-react/mui'
import { PinkBrownBase, PinkBrownDisabled, PinkBrownLighten30 } from '@/shared/consts/colors'

export default tss.withName('ProfileSetting').create({
  root: {
    maxWidth: 600,
    width: '100%',
    margin: 'auto',
    minHeight: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  stepSection: {
    width: '100%',
    display: 'flex',
    gap: 10,
  },
})

export const UploadButton = styled(Button)({
  backgroundColor: PinkBrownBase,
  color: 'white',
  height: 40,

  '&:hover': {
    backgroundColor: PinkBrownLighten30,
  },

  '&:disabled': {
    backgroundColor: PinkBrownDisabled,
  },
})
