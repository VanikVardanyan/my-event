import { Modal, Box } from '@mui/material'
import useStyles from './styles'
import { useTranslations } from 'next-intl'

export interface IRequestInfoModal {
  open: boolean
  handleClose: () => void
  info: any
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
}

const RequestInfoModal = (props: IRequestInfoModal) => {
  const { open, handleClose } = props

  const { service, city, amount, date, personQuantity, location, other } = props.info

  const { classes } = useStyles()
  const t = useTranslations('RequestList')
  const p = useTranslations('Professions')

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="request-info-modal-title"
      aria-describedby="request-info-modal-description"
    >
      <Box sx={style}>
        <div>
          <h3 className={classes.title}>{p(service)}</h3>
          <div className={classes.content}>
            <div className={classes.label}>
              <div className={classes.infoTitle}> {t('city')}:</div>
              <div className={classes.description}>{city}</div>
            </div>
            <div>
              <div className={classes.infoTitle}> {t('guests_count')}:</div>
              <div className={classes.description}>{personQuantity}</div>
            </div>
            <div>
              <div className={classes.infoTitle}> {t('location')}:</div>
              <div className={classes.description}>{location}</div>
            </div>
            <div>
              <div className={classes.infoTitle}>{t('date')}:</div>
              <div className={classes.description}>{date}</div>
            </div>
            <div>
              <div className={classes.infoTitle}>{t('budget')}:</div>
              <div className={classes.description}>{amount}dram</div>
            </div>
          </div>
          {other && (
            <div className={classes.otherWrapper}>
              <div className={classes.infoTitle}>{t('description')}:</div>
              <div className={classes.description}>{other}</div>
            </div>
          )}
        </div>
      </Box>
    </Modal>
  )
}

export default RequestInfoModal
