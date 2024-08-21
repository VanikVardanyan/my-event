import { Icon, IconButton } from '@mui/material'
import useStyles, { Textarea } from './styles'
import SendIcon from '@mui/icons-material/Send'
import { MessageItem } from '../message-Item'
import { IMessagesProps } from './types'
import { useAuth } from '../../../../../shared/lib/auth-context'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../../shared/lib/firebaseConfig'
import { useEffect, useRef, useState } from 'react'

export const Message = (props: IMessagesProps) => {
  const { messages, threadId, fetchUserDetails } = props
  const { user } = useAuth()
  const [messageText, setMessageText] = useState('')

  const messageSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Автоматическая прокрутка вниз при изменении списка сообщений
    if (messageSectionRef.current) {
      messageSectionRef.current.scrollTo({
        top: messageSectionRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

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

  return (
    <div className={classes.root}>
      <div className={classes.messageSection} ref={messageSectionRef}>
        {messages.map((message) => (
          <MessageItem key={message.id} me={message.author_id === user?.uid} message={message.message} />
        ))}
      </div>
      <div className={classes.inputText}>
        <Textarea
          aria-label="minimum height"
          minRows={1}
          placeholder="Aa"
          className={classes.textArea}
          value={messageText}
          onChange={changeMessageText}
        />
        <IconButton onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  )
}
