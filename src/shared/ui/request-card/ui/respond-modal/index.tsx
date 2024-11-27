import { Modal, Box, IconButton } from '@mui/material'
import { useTranslations } from 'next-intl'
import CloseIcon from '@mui/icons-material/Close'
import useStyles, { Textarea } from './styles'
import { RespondSendButton } from '../../styles'
import { useState } from 'react'

export interface IRespondModal {
  open: boolean
  handleClose: () => void
  serviceId: string
  handleRespond: (serviceId: string, message?: string) => void
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  width: 'calc(100% - 10px)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
  maxHeight: 'calc(100% - 10px)',
  overflowY: 'auto',
}

const closeBtnStyle = {
  position: 'absolute' as const,
  top: 10,
  right: 10,
}

export const RespondModal = (props: IRespondModal) => {
  const { open, handleClose, serviceId, handleRespond } = props
  const [message, setMessage] = useState('')
  const { classes } = useStyles()

  const t = useTranslations()

  const changeMessageHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="request-info-modal-title"
      aria-describedby="request-info-modal-description"
      closeAfterTransition
    >
      <Box sx={style}>
        <IconButton onClick={handleClose} style={closeBtnStyle}>
          <CloseIcon />
        </IconButton>
        <div className={classes.root}>
          <h3>{t('send_cover_message')}</h3>
          <div>
            <Textarea minRows={4} placeholder="Aa" onChange={changeMessageHandler} value={message} />
          </div>
          <RespondSendButton
            size="small"
            onClick={() => {
              handleRespond(serviceId, message)
              handleClose()
            }}
          >
            {t('respond')}{' '}
          </RespondSendButton>
        </div>
      </Box>
    </Modal>
  )
}
