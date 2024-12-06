import { Avatar, IconButton, useMediaQuery, useTheme } from '@mui/material'
import useStyles, { Textarea } from './styles'
import SendIcon from '@mui/icons-material/Send'
import { MessageItem } from '../message-Item'
import { IMessagesProps } from './types'
import { useAuth } from '@/shared/lib/auth-context'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'
import { useEffect, useState } from 'react'
import RecentActorsIcon from '@mui/icons-material/RecentActors'
import { UserType } from '@/shared/types/user.types'

export const Message = (props: IMessagesProps) => {
  const { messages, threadId, fetchUserDetails, toggleDrawer } = props
  const { user, role } = useAuth()
  const [messageText, setMessageText] = useState('')

  useEffect(() => {
    // window.scrollTo({
    //   top: document.body.scrollHeight,
    //   behavior: 'smooth',
    // })
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchUserDetails()
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])
  const { classes } = useStyles()
  const changeMessageText = (e: any) => {
    setMessageText(e.target.value)
  }

  const sendMessage = async () => {
    const message = {
      id: crypto.randomUUID(), // Генерируем уникальный ID для сообщения
      created_at: new Date().toISOString(), // Текущая дата и время
      message: messageText, // Текст сообщения
      author_id: user?.uid, // ID автора сообщения
      is_read: false, // По умолчанию сообщение не прочитано
    }

    const threadRef = doc(db, 'threads', threadId)

    try {
      await updateDoc(threadRef, {
        messages: arrayUnion(message),
      })
      setMessageText('')
      fetchUserDetails()
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        })
      }, 1000)
      console.log('Message sent successfully')
    } catch (error) {
      console.error('Error sending message: ', error)
    }
  }

  const handleSendMessage = async () => {
    if (!messageText) {
      return
    }
    await sendMessage()
  }

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const isDisabled = () => {
    if (role === UserType.PROVIDER) {
      const checkDisabled = props.messages.filter((message) => message.author_id !== user?.uid)
      return !Boolean(checkDisabled.length)
    }
    return
  }

  return (
    <div className={classes.root}>
      <div className={classes.messageSection}>
        {messages.map((message) => (
          <MessageItem key={message.id} me={message.author_id === user?.uid} message={message.message} />
        ))}
      </div>
      <div className={classes.inputText}>
        {isMobile && (
          <IconButton onClick={() => toggleDrawer(true)}>
            <RecentActorsIcon fontSize="large" />
          </IconButton>
        )}
        <Textarea
          aria-label="minimum height"
          minRows={1}
          placeholder="Aa"
          className={classes.textArea}
          value={messageText}
          onChange={changeMessageText}
          disabled={isDisabled()}
        />
        <IconButton onClick={handleSendMessage} disabled={isDisabled()}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  )
}
