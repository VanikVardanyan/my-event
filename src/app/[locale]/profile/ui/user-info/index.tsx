import Image from 'next/image'
import useStyles from './styles'
import { RequestCard } from '@/shared/ui/request-card'
import { Modal, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { RequestCreateModal } from '../request-create-modal'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Routes } from '@/shared/routes'
import SettingsIcon from '@mui/icons-material/Settings'
import { useSelector } from 'react-redux'
import { getClient, getProfile } from '@/store/selectors'

import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import { AddRequestButton, EditButton } from '@/shared/ui/profile-header/styles'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { Dispatch } from '@/store/store'
import { asyncSetEventsThunk } from '@/store/features/client-slice'

export const UserInfo = () => {
  const { classes } = useStyles()
  const t = useTranslations()

  const [openModal, setOpenModal] = useState(false)
  const handleCloseModal = () => setOpenModal(false)
  const [loading, setLoading] = useState(false)

  const { profile, userId } = useSelector(getProfile)
  const { events } = useSelector(getClient)
  const dispatch = Dispatch()
  useEffect(() => {
    setLoading(true)
    if (userId) {
      dispatch(asyncSetEventsThunk({ id: userId })).finally(() => setLoading(false))
      return
    }
    setLoading(false)
  }, [userId])

  if (loading) return <LoadingOverlay loading />

  return (
    <div className={classes.root}>
      <div className={classes.avatarSection}>
        <h4 className={classes.name}>{profile?.name}</h4>
        <Image
          src={profile?.avatar || '/default.jpg'}
          alt="avatar"
          width={150}
          height={150}
          className={classes.avatar}
        />
        <EditButton
          variant="contained"
          endIcon={<SettingsIcon />}
          size="small"
          href={Routes.ProfileSetting}
          LinkComponent={Link}
        >
          {t('edit_profile')}
        </EditButton>
        <AddRequestButton
          size="small"
          variant="contained"
          endIcon={<AddCircleOutlineIcon />}
          href={Routes.CreateEvent}
          LinkComponent={Link}
        >
          {t('create_event')}
        </AddRequestButton>
      </div>
      <div className={classes.requestCards}>
        <h3 className={classes.title}>{t('created_events')}</h3>
        {!loading && events.length === 0 && (
          <Typography align="left" component={'h1'}>
            {t('empty_list')}
          </Typography>
        )}
        {events.map((request) => (
          <RequestCard key={request.id} {...request} isMe />
        ))}
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <RequestCreateModal handleClose={handleCloseModal} />
        </>
      </Modal>
    </div>
  )
}
