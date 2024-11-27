import { Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useTranslations } from 'next-intl'
import { ServiceSearchStatus } from '../../../create/types'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import useStyles from './styles'

interface IServiceStatusItem {
  status: ServiceSearchStatus
  id: string
  changeServiceStatus: (id: string, status: ServiceSearchStatus) => void
}

export const ServiceStatusItem = (props: IServiceStatusItem) => {
  const { classes } = useStyles()
  const { status, changeServiceStatus, id } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openPopup = Boolean(anchorEl)
  const openPopupHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const t = useTranslations()

  const handleStatusChange = (status: ServiceSearchStatus) => () => {
    changeServiceStatus(id, status)
    handleClose()
  }

  return (
    <>
      <div className={classes.statusSection}>
        <button className={classes.statusBtn} onClick={openPopupHandler}>
          {openPopup ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </button>
        {t(status)}
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openPopup}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem className={classes.todo} onClick={handleStatusChange(ServiceSearchStatus.Todo)}>
          {t(ServiceSearchStatus.Todo)}
        </MenuItem>
        <MenuItem className={classes.doing} onClick={handleStatusChange(ServiceSearchStatus.Doing)}>
          {t(ServiceSearchStatus.Doing)}
        </MenuItem>
        <MenuItem className={classes.done} onClick={handleStatusChange(ServiceSearchStatus.Done)}>
          {t(ServiceSearchStatus.Done)}
        </MenuItem>
      </Menu>
    </>
  )
}
