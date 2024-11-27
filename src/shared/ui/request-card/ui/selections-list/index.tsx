import { Modal, Box, List, ListItem, ListItemText, Typography, Avatar, IconButton, ListItemAvatar } from '@mui/material'
import { useRouter } from '@/navigation'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslations } from 'next-intl'
import { ISelection } from '@/app/[locale]/event/create/types'
import DeleteIcon from '@mui/icons-material/Delete'
import useStyles from './styles'
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
  padding: '20px',
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
  const t = useTranslations()
  const { classes } = useStyles()

  const handleUserClick = (userId: string, isInstagram?: boolean) => {
    if (isInstagram) {
      window.open(`https://www.instagram.com/${userId}/`, '_blank')
      handleClose()
      return
    }
    router.push(`/user/${userId}`)
  }
  const handleDelete = (id: string) => {
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
          {selections?.map((response, index) => (
            <ListItem key={index} sx={{ borderRadius: 2, paddingLeft: 0 }}>
              <ListItem
                button
                sx={{ borderRadius: 2, paddingLeft: '5px' }}
                onClick={() => handleUserClick(response.id, response.isInstagram)}
              >
                <ListItemAvatar>
                  <Avatar src={response.isInstagram ? `/service-images/${response.name}.jpg` : response.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primaryTypographyProps={{ style: { whiteSpace: 'normal' } }}
                  primary={response.name || response.userName}
                  classes={{ root: classes.title }}
                />
              </ListItem>
              <IconButton onClick={() => handleDelete(response.id)} className={classes.btn}>
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
