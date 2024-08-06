import { Modal, Box, List, ListItem, ListItemText, Typography, Button, Avatar, IconButton, Icon } from '@mui/material'
import { useRouter } from '@/navigation'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslations } from 'next-intl'
import { ISelection } from '@/app/[locale]/event/create/types'
import DeleteIcon from '@mui/icons-material/Delete'

export interface IResponsesModal {
  open: boolean
  handleClose: () => void
  selections: ISelection[]
  removeSelection: (serviceId: string, newSelections: ISelection[] | []) => void
  serviceId: string
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
  const { open, handleClose, selections, removeSelection, serviceId } = props
  const router = useRouter()
  const t = useTranslations('RequestList')

  console.log('selections', selections)

  const handleUserClick = (userId: string, isInstagram?: boolean) => {
    if (isInstagram) {
      window.open(`https://www.instagram.com/${userId}/`, '_blank')
      handleClose()
      return
    }
    router.push(`/user/${userId}`)
  }
  const handleDelete = (id: string) => {
    console.log('delete', id)
    console.log(selections)
    const newSelections = selections.filter((selection) => selection.id !== id)
    removeSelection(serviceId, newSelections)
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
          {selections.map((response, index) => (
            <ListItem button key={index} sx={{ borderRadius: 2 }}>
              <ListItem onClick={() => handleUserClick(response.id, response.isInstagram)}>
                <Avatar src={response.avatar} sx={{ mr: 2 }} />
                <ListItemText primary={response.name} />
              </ListItem>
              <IconButton onClick={() => handleDelete(response.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  )
}

export default ResponsesModal
