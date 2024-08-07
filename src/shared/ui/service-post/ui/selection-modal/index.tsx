import { Box, Button, IconButton, Modal, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../../lib/auth-context'
import { asyncSetEventsThunk } from '@/store/features/client-slice'
import { useSelector } from 'react-redux'
import { getClient, getProfile } from '@/store/selectors'
import { Dispatch } from '@/store/store'
import { SelectionItem } from '../selection-item'
import useStyles from './styles'
import CloseIcon from '@mui/icons-material/Close'
import { AddRequestButton } from '../../../profile-header/styles'
import { Routes } from '../../../../routes'
import { Link } from '../../../../../navigation'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useTranslations } from 'next-intl'

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
  const requestT = useTranslations('Request')

  const { events } = useSelector(getClient)
  const { user } = useAuth()
  const dispatch = Dispatch()

  useEffect(() => {
    setLoading(true)
    if (user?.uid) {
      dispatch(asyncSetEventsThunk({ id: user?.uid })).finally(() => setLoading(false))
      return
    } else {
      setLoading(false)
    }
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
          <IconButton onClick={handleClose} style={closeBtnStyle}>
            <CloseIcon />
          </IconButton>
          <h4 className={classes.title}>{requestT('add_in_event')}</h4>
          {events.length === 0 && !loading && (
            <div className={classes.emptyBlock}>
              <div className={classes.emptyBlockTitle}>{requestT('dont_have_created_events')}</div>
              <AddRequestButton
                variant="contained"
                endIcon={<AddCircleOutlineIcon />}
                href={Routes.CreateEvent}
                LinkComponent={Link}
              >
                {requestT('create_event')}
              </AddRequestButton>
            </div>
          )}
          {events.length > 0 && !loading && (
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
          )}
        </Box>
      </Modal>
    </div>
  )
}
