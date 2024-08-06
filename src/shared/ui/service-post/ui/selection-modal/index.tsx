import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Modal, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../../lib/auth-context'
import { asyncSetEventsThunk } from '@/store/features/client-slice'
import { useSelector } from 'react-redux'
import { getClient, getProfile } from '@/store/selectors'
import { Dispatch } from '@/store/store'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { SelectionItem } from '../selection-item'
import useStyles from './styles'

interface ISelectionModal {
  profileId: string
  isInstagram?: boolean
  profileName: string
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
export const SelectionModal = (props: ISelectionModal) => {
  const { profileId, isInstagram, profileName } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)
  const { classes } = useStyles()

  const { events } = useSelector(getClient)
  const { user } = useAuth()
  const dispatch = Dispatch()

  useEffect(() => {
    setLoading(true)
    if (user?.uid) {
      dispatch(asyncSetEventsThunk({ id: user?.uid })).finally(() => setLoading(false))
      return
    }
    setLoading(false)
  }, [user])

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="request-info-modal-title"
        aria-describedby="request-info-modal-description"
        closeAfterTransition
      >
        <Box sx={style}>
          <Typography variant="h6" mb={2}>
            Добавить к мероприятию
          </Typography>
          <div className={classes.eventWrapper}>
            {events.map((event) => (
              <SelectionItem
                key={event.id}
                {...event}
                profileId={profileId}
                profileName={profileName}
                isInstagram={isInstagram}
              />
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  )
}
