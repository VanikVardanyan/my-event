'use client'

import { ProtectedRoute } from '@/shared/lib/protected-router'
import { Container } from '../styles'
import {
  Avatar,
  Divider,
  Drawer,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  List,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { White } from '@/shared/consts/colors'
import { Message } from './ui/message'
import { useAuth } from '@/shared/lib/auth-context'
import { collection, getDocs, query, where, getDoc, doc } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import OutsideClickHandler from 'react-outside-click-handler'
import { useTranslations } from 'next-intl'

const useUserThreads = (userId: string | undefined) => {
  const [threads, setThreads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchThreads = async () => {
    if (!userId) {
      setLoading(false)
      return
    }
    const threadsRef = collection(db, 'threads')
    const q = query(threadsRef, where('participants', 'array-contains', userId))

    const querySnapshot = await getDocs(q)

    const fetchedThreads = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    setThreads(fetchedThreads)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)

    fetchThreads()
  }, [userId])

  return { threads, loading, updateThreads: fetchThreads }
}

const fetchUserProfile = async (userId: string) => {
  const userDoc = await getDoc(doc(db, 'profiles', userId))
  if (userDoc.exists()) {
    return { id: userDoc.id, ...userDoc.data() }
  }
  return null
}

const fetchUserProfiles = async (userIds: string[]) => {
  if (userIds.length === 0) return []

  const userDetailsPromises = userIds.map((id) => fetchUserProfile(id))
  const userDetailsArray = await Promise.all(userDetailsPromises)

  // Фильтрация null значений (если некоторые профили не существуют)
  return userDetailsArray.filter((detail) => detail !== null)
}

const MessagesPage = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [loading, setLoading] = useState(true)
  const [participants, setParticipants] = useState<any[]>([])
  const [currentThread, setCurrentThread] = useState<any>(null)
  const [isNeedLoad, setIsNeedLoad] = useState(true)
  const professionT = useTranslations('Professions')

  const { user } = useAuth()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const toggleDrawer = (isOpen: boolean) => {
    setOpenDrawer(isOpen)
  }

  const { threads, updateThreads, loading: threadsLoading } = useUserThreads(user?.uid)

  const fetchUserDetails = async () => {
    if (isNeedLoad) {
      setLoading(true)
    }

    if (!threads.length || !user) {
      setLoading(false)
      return
    }

    // @ts-ignore
    const userIds = [...new Set(threads.flatMap((thread) => thread.participants))]
    // Убираем идентификатор текущего пользователя
    const filteredUserIds = userIds.filter((id) => id !== user.uid)

    const userDetailsArray = await fetchUserProfiles(filteredUserIds)
    if (!currentThread) {
      setCurrentThread(threads[0])
    } else {
      const thread = threads.find((thread) => thread.id === currentThread.id)
      setCurrentThread(thread)
    }

    setParticipants(userDetailsArray)
    setLoading(false)
    setIsNeedLoad(false)
  }

  useEffect(() => {
    fetchUserDetails()
  }, [threads])

  const changeThread = (threadId: string) => {
    const thread = threads.find((thread) => thread.participants.includes(threadId))
    setCurrentThread(thread)
    toggleDrawer(false)

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })
    }, 500)
  }

  if (loading) return <LoadingOverlay loading={loading} />

  if (!loading && threads.length === 0 && !threadsLoading) {
    return (
      <Container>
        <p>У вас пока нет диалогов</p>
      </Container>
    )
  }

  const contentDrawer = (
    <List>
      {participants.map((participant) => (
        <React.Fragment key={participant.id}>
          <ListItemButton
            onClick={() => changeThread(participant.id)}
            sx={{ background: currentThread.participants.includes(participant.id) ? 'rgba(0, 0, 0, 0.04)' : White }}
          >
            <ListItemAvatar>
              <Avatar alt="logo" src={participant?.avatar || '/default.jpg'} />
            </ListItemAvatar>
            <ListItemText
              primary={participant.name}
              secondary={
                participant.profession ? participant.profession.map((item: string) => professionT(item)).join(', ') : ''
              }
            />
          </ListItemButton>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  )

  return (
    <Container>
      <ProtectedRoute>
        <div style={{ position: 'relative' }}>
          <>
            {isMobile && (
              <OutsideClickHandler onOutsideClick={() => toggleDrawer(false)}>
                <Drawer
                  anchor="right"
                  open={openDrawer}
                  onClose={() => toggleDrawer(false)}
                  variant="persistent"
                  PaperProps={{
                    sx: {
                      width: 280,
                      background: White,
                      top: '64px',
                      zIndex: 2000,
                    },
                  }}
                  sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
                >
                  {contentDrawer}
                </Drawer>
              </OutsideClickHandler>
            )}
            {!isMobile && (
              <Drawer
                anchor="right"
                onClose={setOpenDrawer}
                open={true}
                PaperProps={{
                  sx: {
                    width: 360,
                    background: White,
                    top: '64px',
                  },
                }}
                variant="persistent"
              >
                {contentDrawer}
              </Drawer>
            )}
          </>
          <Message
            messages={currentThread?.messages || []}
            threadId={currentThread?.id || ''}
            fetchUserDetails={updateThreads}
            toggleDrawer={toggleDrawer}
          />
        </div>
      </ProtectedRoute>
    </Container>
  )
}

export default MessagesPage
