import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { debounce } from '@mui/material'
import { AxiosError } from 'axios'
import cn from 'classnames'
import SearchIcon from '@mui/icons-material/Search'
import { SlateGreyDarken7, SlateGreyLighten10 } from '../../consts/colors'
import CloseIcon from '@mui/icons-material/Close'
import { HTTPResponseStatusCodes } from '../../utils/error-message-by-code'
import useStyles from './styles'
import { Card } from './ui/card'
import { Empty } from './ui/empty'
import { Loader } from './ui/loader'
import 'firebase/database'
import errorToast from '@/shared/utils/error-toast'
import { collection, where, query, getDocs } from 'firebase/firestore'
import { db } from '../../lib/firebaseConfig'
import { UserType } from '../../types/user.types'
import { IProfile } from '@/store/features/profile-slice/types'
import { useRouter } from 'next/navigation'

export const InputSearch = () => {
  const [queryParams, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const history = useRouter()

  const [results, setResults] = useState<any[] | []>([])
  const [loading, setLoading] = useState(false)
  const [isShowInput, setIsShowInput] = useState(false)

  useEffect(() => {
    if (isShowInput) {
      inputRef.current?.focus()
    }
  }, [isShowInput])

  const { classes } = useStyles()

  const closeInput = () => {
    setIsShowInput(false)
    setQuery('')
    setResults([])
  }

  const showInputHandler = () => {
    setIsShowInput(true)
  }

  const debouncedRequest = useMemo(
    () =>
      debounce(async (value: string) => {
        try {
          const usersRef = collection(db, 'profiles')
          const q = query(usersRef, where('role', '==', UserType.PROVIDER), where('name', '==', value))

          const querySnapshot = await getDocs(q)
          const usersList: any = []
          querySnapshot.forEach((doc) => {
            usersList.push({ id: doc.id, ...doc.data() })
          })

          setResults(usersList)
          setLoading(false)
        } catch (error) {
          const e = error as AxiosError
          toast.custom(
            errorToast(
              { id: e?.response?.status?.toString() },
              e?.response?.status?.toString() as HTTPResponseStatusCodes
            )
          )
          setLoading(false)
        }
      }, 1000),
    []
  )

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setQuery(event.target.value)
    if (event.target.value.trim() === '') {
      setLoading(false)
      setResults([])
      return
    }
    debouncedRequest(event.target.value)
  }

  const channelClickHandler = (id: string) => {
    return () => {
      history.push(`/user/${id}`)
      closeInput()
    }
  }

  return (
    <>
      <div className={cn(classes.root, { [classes.showInput]: isShowInput })}>
        <div className={classes.searchInput}>
          <div className={classes.searchIcon} onClick={showInputHandler}>
            <SearchIcon style={{ width: 24, height: 24, fill: SlateGreyDarken7 }} />
          </div>
          <input
            type="text"
            value={queryParams}
            onChange={handleSearch}
            placeholder="Search a channel"
            className={classes.input}
            ref={inputRef}
          />
          {queryParams.length > 0 && (
            <button className={classes.closeButton} onClick={closeInput}>
              <CloseIcon style={{ width: 16, height: 16, fill: SlateGreyLighten10 }} />
            </button>
          )}
        </div>
        <button className={classes.mobileCloseButton} onClick={closeInput}>
          <CloseIcon style={{ width: 28, height: 28, fill: SlateGreyDarken7 }} />
        </button>
        {queryParams.length > 0 && (
          <div className={cn(classes.channelsList, { [classes.channelListEmpty]: !results.length && !loading })}>
            {loading && <Loader />}
            {!!results.length &&
              !loading &&
              results.map((item) => <Card key={item.id} {...item} channelClickHandler={channelClickHandler} />)}
            {!results.length && !loading && <Empty />}
          </div>
        )}
      </div>
      <button className={classes.mobileInputButton} onClick={showInputHandler}>
        <SearchIcon style={{ width: 24, height: 24, fill: SlateGreyDarken7 }} />
      </button>
    </>
  )
}
