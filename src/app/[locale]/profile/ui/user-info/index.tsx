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
  const t = useTranslations('Profile')
  const requestT = useTranslations('Request')

  const [openModal, setOpenModal] = useState(false)
  const handleCloseModal = () => setOpenModal(false)
  const handleOpenModal = () => setOpenModal(true)
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
    <div>
      <div className={classes.avatarSection}>
        <Image
          src={profile?.avatar || '/default.jpg'}
          alt="avatar"
          width={150}
          height={150}
          className={classes.avatar}
        />
        <EditButton variant="contained" endIcon={<SettingsIcon />} href={Routes.ProfileSetting} LinkComponent={Link}>
          {t('edit_profile')}
        </EditButton>
        <div className={classes.name}>{profile?.name}</div>
        <AddRequestButton
          variant="contained"
          endIcon={<AddCircleOutlineIcon />}
          href={Routes.CreateEvent}
          LinkComponent={Link}
        >
          {requestT('create_event')}
        </AddRequestButton>
      </div>
      <div className={classes.requestCards}>
        {!loading && events.length === 0 && (
          <Typography align="center" component={'h1'}>
            {requestT('empty_list')}
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
