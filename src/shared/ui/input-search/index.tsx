import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { debounce } from '@mui/material'
import { AxiosError } from 'axios'
import cn from 'classnames'
import SearchIcon from '@mui/icons-material/Search'
import { SlateGreyDarken7, SlateGreyLighten10, White } from '../../consts/colors'
import CloseIcon from '@mui/icons-material/Close'
import { HTTPResponseStatusCodes } from '../../utils/error-message-by-code'
import useStyles from './styles'
import { Card } from './ui/card'
import { Empty } from './ui/empty'
import OutsideClickHandler from 'react-outside-click-handler'
import { Loader } from './ui/loader'
import 'firebase/database'
import errorToast from '@/shared/utils/error-toast'
import { collection, where, query, getDocs } from 'firebase/firestore'
import { db } from '../../lib/firebaseConfig'
import { UserType } from '../../types/user.types'
import { useRouter } from '@/navigation'
import { useTranslations } from 'next-intl'
import { cakesData } from '../../data/cakes'
import { djData } from '../../data/dj'
import { dress } from '../../data/dress'
import { floristData } from '../../data/florist'
import { photographerData } from '../../data/photo'
import { rentCarData } from '../../data/rent-car'
import { restaurantData } from '../../data/restaurant'
import { showmanData } from '../../data/showman'
import { instrumentsRenalData } from '../../data/instrument'
import { musicianData } from '../../data/musiciant'
import { danceData } from '../../data/dance'

const initData = [
  ...cakesData,
  ...djData,
  ...dress,
  ...floristData,
  ...photographerData,
  ...rentCarData,
  ...restaurantData,
  ...showmanData,
  ...instrumentsRenalData,
  ...musicianData,
  ...danceData,
].map((item: any) => ({
  name: item.full_name,
  avatar: null,
  isInstagram: true,
  id: item.username,
}))

interface InputSearchProps {
  classNameList?: string
}

export const InputSearch = (props: InputSearchProps) => {
  const { classNameList } = props

  const t = useTranslations('Shared')
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
          const q = query(usersRef, where('role', '==', UserType.PROVIDER))

          const querySnapshot = await getDocs(q)
          const usersList: any = []
          querySnapshot.forEach((doc) => {
            usersList.push({ id: doc.id, ...doc.data() })
          })
          const filteredUsersList = usersList.filter(
            (user: { name: string }) => user.name.toLowerCase().startsWith(value.toLowerCase()) // замените 'someProperty' на свойство, по которому нужно фильтровать
          )

          const filteredInitData = initData.filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase()))

          setResults([...filteredUsersList, ...filteredInitData])
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

  const channelClickHandler = (id: string, isInstagram?: boolean) => {
    return () => {
      if (isInstagram) {
        window.open(`https://www.instagram.com/${id}/`, '_blank')
        return
      }
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
            placeholder={t('search')}
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
          <div
            className={cn(classes.channelsList, classNameList, {
              [classes.channelListEmpty]: !results.length && !loading,
            })}
          >
            <OutsideClickHandler onOutsideClick={closeInput}>
              {loading && <Loader />}
              {!!results.length &&
                !loading &&
                results.map((item) => <Card key={item.id} {...item} channelClickHandler={channelClickHandler} />)}
              {!results.length && !loading && <Empty />}
            </OutsideClickHandler>
          </div>
        )}
      </div>
      <button className={classes.mobileInputButton} onClick={showInputHandler}>
        <SearchIcon style={{ width: 24, height: 24, fill: White }} />
      </button>
    </>
  )
}

const data = []
