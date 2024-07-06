import { Box, IconButton, Modal, Popper } from '@mui/material'
import { Dispatch } from '@/store/store'
import useStyles from './styles'
import { useState } from 'react'
import { Link } from '@/navigation'
import { Routes } from '../../../../routes'
import { useTranslations } from 'next-intl'
import LoginSharpIcon from '@mui/icons-material/LoginSharp'
import LockOpenSharpIcon from '@mui/icons-material/LockOpenSharp'

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

interface ImageActionProps {}

export const MenuAction = (props: ImageActionProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const t = useTranslations('Menu')

  const { classes } = useStyles()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen((prev) => !prev)
  }

  return (
    <div>
      <IconButton className={classes.menuIcon} onClick={handleClick}>
        <LoginSharpIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={classes.menuWrapper}>
            <Link href={Routes.Signin} className={classes.link} onClick={handleClick}>
              <LoginSharpIcon /> {t('login')}
            </Link>
            <Link href={Routes.Register} className={classes.link} onClick={handleClick}>
              <LockOpenSharpIcon /> {t('register')}
            </Link>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
