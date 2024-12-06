'use client'

import { Avatar, IconButton } from '@mui/material'
import useStyles from './styles'
import { Button, BUTTON_SIZE } from '@/shared/ui/button'
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap'
import DeleteIcon from '@mui/icons-material/Delete'

export const RequestCard = () => {
  const { classes } = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.infoSection}>
        <Avatar style={{ width: 64, height: 64 }} />
        <div>
          <div>Դուք ստացել եք առաջարկ։</div>
          <div className={classes.date}>1 օր առաջ | ծննդյան երեկույթ</div>
          <div className={classes.viewBtn}>
            <Button btn_size={BUTTON_SIZE.SMALL}>Տեսնել առաջարկը</Button>
          </div>
        </div>
      </div>
      <div className={classes.actions}>
        <IconButton>
          <ZoomInMapIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  )
}
