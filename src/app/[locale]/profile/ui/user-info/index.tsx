import Image from 'next/image'
import useStyles from './styles'
import { RequestCard } from '@/shared/ui/request-card'
import { Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import { RequestCreateModal } from '../request-create-modal'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Routes } from '@/shared/routes'
import SettingsIcon from '@mui/icons-material/Settings'
import { useSelector } from 'react-redux'
import { getProfile } from '@/store/selectors'

import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import { AddRequestButton, EditButton } from '@/shared/ui/profile-header/styles'
import { LoadingOverlay } from '../../../../../shared/ui/loading-overlay'

export const UserInfo = () => {
  const { classes } = useStyles()
  const t = useTranslations('Profile')
  const requestT = useTranslations('Request')

  const [openModal, setOpenModal] = useState(false)
  const handleCloseModal = () => setOpenModal(false)
  const handleOpenModal = () => setOpenModal(true)
  const { profile, userId } = useSelector(getProfile)
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchUserRequests = async () => {
    setLoading(true)
    const q = query(collection(db, 'requests'), where('userId', '==', userId))
    const querySnapshot = await getDocs(q)
    const userRequests = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    setRequests(userRequests)
    setLoading(false)
  }

  useEffect(() => {
    fetchUserRequests()
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
        {!loading && requests.length === 0 && <div>{requestT('empty_list')}</div>}
        {requests.map((request) => (
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
