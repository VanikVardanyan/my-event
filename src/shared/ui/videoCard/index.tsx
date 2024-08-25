import { useState } from 'react'
import useStyles from './styles'
import { Box, Icon, IconButton, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'

const closeBtnStyle = {
  position: 'absolute' as const,
  top: 10,
  right: 10,
  background: 'rgba(255, 255, 255, 0.5)',
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '100%',
  width: 'calc(90% - 10px)',
  height: 'calc(80% - 10px)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 4,
  padding: '42px',
  maxHeight: 'calc(100% - 10px)',
  overflowY: 'auto',
}

const VideoModal = ({ link }: any) => {
  const { classes } = useStyles()
  const [openModal, setOpenModal] = useState(false)
  const handleCloseModal = () => setOpenModal(false)
  const handleOpenModal = () => setOpenModal(true)
  const videoSrc = `${link}?autoplay=1`

  return (
    <>
      <IconButton onClick={handleOpenModal} className={classes.playBtn}>
        <PlayCircleFilledIcon color="error" />
      </IconButton>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={classes.wrapper}>
          <iframe
            width="100%"
            height="100%"
            src={videoSrc}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>
    </>
  )
}

export const VideoCard = ({ link, title, description, bg }: any) => {
  const { classes } = useStyles()
  const videoId = link.split('v=')[1] || link.split('/embed/')[1]
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

  return (
    <div className={classes.root}>
      <div className={classes.img} style={{ backgroundImage: `url(${bg ? bg : thumbnailUrl})` }}>
        <VideoModal link={link} />
      </div>
      <div className={classes.info}></div>
    </div>
  )
}
