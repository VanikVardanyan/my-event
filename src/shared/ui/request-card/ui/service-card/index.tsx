import { useTranslations } from 'next-intl'
import { RespondButton } from '../../styles'
import { RespondModal } from '../respond-modal'
import useStyles from './styles'
import { useState } from 'react'
import DownloadDoneIcon from '@mui/icons-material/DownloadDone'
import { Chip } from '@mui/material'

interface IServiceCardProps {
  service: any
  hasResponded: (service: any) => boolean
  handleRespond: (serviceId: string, message?: string) => void
}

export const ServiceCard = (props: IServiceCardProps) => {
  const { service, hasResponded, handleRespond } = props
  const [openRespondModal, setOpenRespondModal] = useState(false)

  const { classes } = useStyles()

  const professionsT = useTranslations('Professions')
  const t = useTranslations('RequestList')

  const handleOpenModal = (serviceId: string) => {
    setOpenRespondModal(true)
  }

  const handleCloseRespondModal = () => {
    setOpenRespondModal(false)
  }

  return (
    <div className={classes.serviceWrapper}>
      <div className={classes.service}>
        <div>
          <span className={classes.serviceTitle}>{t('service')}:</span> {professionsT(service.service)}
        </div>
        <div>
          <span className={classes.serviceTitle}>{t('budget')}:</span> {service.amount} AMD
        </div>
      </div>
      {hasResponded(service) ? (
        <Chip label="Уже откликнулись" icon={<DownloadDoneIcon />} color="success" variant="outlined" />
      ) : (
        <RespondButton size="small" onClick={() => handleOpenModal(service.id)} disabled={hasResponded(service)}>
          {t('respond')}{' '}
        </RespondButton>
      )}
      <RespondModal
        handleRespond={handleRespond}
        open={openRespondModal}
        handleClose={handleCloseRespondModal}
        serviceId={service.id}
      />
    </div>
  )
}
