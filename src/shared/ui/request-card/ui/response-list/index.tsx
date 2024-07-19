import { Modal, Box, List, ListItem, ListItemText, Typography, Button, Avatar, IconButton } from '@mui/material'
import { useRouter } from '@/navigation'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslations } from 'next-intl'

interface IResponses {
  userId: string
  userName: string
  userAvatar: string
}

export interface IResponsesModal {
  open: boolean
  handleClose: () => void
  responses: IResponses[]
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

const ResponsesModal = (props: IResponsesModal) => {
  const { open, handleClose, responses } = props
  const router = useRouter()
  const t = useTranslations('RequestList')

  const handleUserClick = (userId: string) => {
    router.push(`/user/${userId}`)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="responses-modal-title"
      aria-describedby="responses-modal-description"
    >
      <Box sx={style}>
        <IconButton onClick={handleClose} style={closeBtnStyle}>
          <CloseIcon />
        </IconButton>
        <Typography id="responses-modal-title" variant="h6" component="h2" mb={2}>
          {t('responses')}
        </Typography>
        <List>
          {responses.map((response, index) => (
            <ListItem button key={index} onClick={() => handleUserClick(response.userId)} sx={{ borderRadius: 2 }}>
              <Avatar src={response.userAvatar} sx={{ mr: 2 }} />
              <ListItemText primary={response.userName} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  )
}

export default ResponsesModal
