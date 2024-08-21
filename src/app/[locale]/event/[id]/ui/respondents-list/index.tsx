'use client'

import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import { Avatar, Badge, Box, IconButton, ListItemAvatar, Drawer, useTheme, useMediaQuery } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { IRespondentsList } from './types'
import useStyles, { ApproveButton } from './styles'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { ProfileHeader } from '@/shared/ui/profile-header'
import { ProfileCreatives } from '@/shared/ui/profile-creatives'
import { Container } from '../../../../styles'
import { DarkBlueBase, White } from '@/shared/consts/colors'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import CheckIcon from '@mui/icons-material/Check'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import { useAuth } from '@/shared/lib/auth-context'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export const RespondentsList = (props: IRespondentsList) => {
  const { respondents, updateRespondents, serviceId } = props
  const { classes } = useStyles()
  const { user } = useAuth()

  const [open, setOpen] = React.useState(false)
  const [openDrawer, setOpenDrawer] = React.useState(false)
  const [userData, setUserData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(false)
  const [currentUserId, setCurrentUserId] = React.useState('')

  const fetchUserData = async (currentProfileId: string) => {
    toggleDrawer(false)
    setLoading(true)
    setCurrentUserId(currentProfileId)
    const userDoc = await getDoc(doc(db, 'profiles', currentProfileId))
    if (userDoc.exists()) {
      setUserData(userDoc.data())
    }
    setLoading(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  React.useEffect(() => {
    if (open) {
      fetchUserData(respondents[0].userId)
    }
  }, [open, respondents])

  const toggleDrawer = (isOpen: boolean) => {
    setOpenDrawer(isOpen)
  }

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleApprove = () => {
    const newData = respondents.map((respondent) => {
      if (respondent.userId === currentUserId) {
        return { ...respondent, isApprove: true }
      }
      return respondent
    })
    updateRespondents(serviceId, newData)
  }

  const handleRemove = () => {
    const newData = respondents.filter((respondent) => respondent.userId !== currentUserId)
    updateRespondents(serviceId, newData)
  }

  const isApprove = respondents.find((respondent) => respondent.userId === currentUserId)?.isApprove

  const contentDrawer = (
    <List>
      {respondents.map((respondent) => (
        <React.Fragment key={respondent.userId}>
          <ListItemButton
            onClick={() => fetchUserData(respondent.userId)}
            sx={{ background: currentUserId === respondent.userId ? 'rgba(0, 0, 0, 0.04)' : White }}
          >
            <ListItemAvatar>
              <Avatar alt="logo" src={respondent?.avatar || '/default.jpg'} />
            </ListItemAvatar>
            <ListItemText primary={respondent.userName} />
          </ListItemButton>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  )

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <Badge badgeContent={respondents.length} color="primary">
          <VisibilityIcon color="action" />
        </Badge>
      </IconButton>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'fixed', background: DarkBlueBase }}>
          <Toolbar>
            {isMobile && (
              <IconButton color="inherit" onClick={() => toggleDrawer(!openDrawer)}>
                {openDrawer ? <CloseIcon /> : <FormatListBulletedIcon />}
              </IconButton>
            )}
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Отклики
            </Typography>

            <Button autoFocus color="inherit" onClick={handleClose}>
              Закрыть
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <>
            {isMobile && (
              <Drawer
                anchor="left"
                open={openDrawer}
                onClose={() => toggleDrawer(false)}
                variant="persistent"
                PaperProps={{
                  sx: {
                    width: 280,
                    background: White,
                    top: '56px',
                    zIndex: 2000,
                  },
                }}
                sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
              >
                {contentDrawer}
              </Drawer>
            )}
            {!isMobile && (
              <Drawer
                anchor="left"
                onClose={setOpenDrawer}
                open={true}
                className={classes.root}
                PaperProps={{
                  sx: {
                    width: 280,
                    background: White,
                    top: '64px',
                  },
                }}
                sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
                variant="persistent"
              >
                {contentDrawer}
              </Drawer>
            )}
          </>
          <Container>
            <div className={classes.profileWrapper}>
              {loading ? (
                <LoadingOverlay loading />
              ) : (
                <div className={classes.profileSection}>
                  <div className={classes.actionBlock}>
                    {!isApprove && (
                      <>
                        <ApproveButton endIcon={<CheckIcon />} variant="contained" onClick={handleApprove}>
                          Одобрить
                        </ApproveButton>
                        <Button variant="contained" color="error" onClick={handleRemove}>
                          Отклонить
                        </Button>
                      </>
                    )}
                    {isApprove && (
                      <div className={classes.approve}>
                        Одобрено <AssignmentTurnedInIcon />
                      </div>
                    )}
                  </div>
                  <ProfileHeader {...userData} thread={{ author_id: user?.uid, recipient_id: currentUserId }} />
                  <Box sx={{ mt: 5 }}>
                    <ProfileCreatives images={userData?.images || []} />
                  </Box>
                </div>
              )}
            </div>
          </Container>
        </div>
      </Dialog>
    </>
  )
}
