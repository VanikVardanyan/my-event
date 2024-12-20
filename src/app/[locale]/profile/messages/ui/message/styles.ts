import { tss } from 'tss-react/mui'
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize'
import { blue, grey } from '@mui/material/colors'
import { styled } from '@mui/material'
import { BreakPoints } from '@/shared/consts/common'
import { White } from '@/shared/consts/colors'

export default tss.withName('Message').create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 'calc(100% - 380px)',
    maxHeight: 'calc(100vh - 100px)',
    minHeight: 458,
    padding: 16,
    position: 'relative',
    background: 'rgba(245, 245, 245, 1)',
  },
  inputText: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    gap: 5,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    background: 'rgba(245, 245, 245, 1)',
  },
  textArea: {
    width: '100%',
  },
  dialogInfo: {
    padding: 16,
    background: White,
  },
  avatar: {
    width: 45,
    height: 45,
  },
  messageSection: {
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 70,
    gap: 15,
  },
})

export const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
        box-sizing: border-box;
        width: 320px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        resize: none;
        padding: 12px;
        border-radius: 12px 12px 0 12px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    
        &:hover {
          border-color: ${blue[400]};
        }
    
        &:focus {
          outline: 0;
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
        }
    
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `
)
