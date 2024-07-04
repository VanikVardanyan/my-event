import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { debounce } from '@mui/material'
import { AxiosError } from 'axios'
import cn from 'classnames'
import { useRouter } from 'next/navigation'
import SearchIcon from '@mui/icons-material/Search'
import { SlateGreyDarken7, SlateGreyLighten10 } from '../../consts/colors'
import CloseIcon from '@mui/icons-material/Close'
import { Routes } from '../../routes'
import { HTTPResponseStatusCodes } from '../../utils/error-message-by-code'
import { createQueryParams } from '../../utils/requestUtils'
import useStyles from './styles'
import { Card } from './ui/card'
import { Empty } from './ui/empty'
import { Loader } from './ui/loader'

import errorToast from '@/shared/utils/error-toast'

export const InputSearch = () => {
  const { push } = useRouter()

  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const [results, setResults] = useState<string[] | []>([])
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
          // const response = await ChannelsApiRequest.getChannels(createQueryParams({ search: value }))
          // setResults(response.data.results)
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

  const channelClickHandler = (userName: string) => {
    return () => {
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
            value={query}
            onChange={handleSearch}
            placeholder="Search a channel"
            className={classes.input}
            ref={inputRef}
          />
          {query.length > 0 && (
            <button className={classes.closeButton} onClick={closeInput}>
              <CloseIcon style={{ width: 16, height: 16, fill: SlateGreyLighten10 }} />
            </button>
          )}
        </div>
        <button className={classes.mobileCloseButton} onClick={closeInput}>
          <CloseIcon style={{ width: 28, height: 28, fill: SlateGreyDarken7 }} />
        </button>
        {query.length > 0 && (
          <div className={cn(classes.channelsList, { [classes.channelListEmpty]: !results.length && !loading })}></div>
        )}
      </div>
      <button className={classes.mobileInputButton} onClick={showInputHandler}>
        <SearchIcon style={{ width: 24, height: 24, fill: SlateGreyDarken7 }} />
      </button>
    </>
  )
}
// {loading && <Loader />}
// {!!results.length &&
//   !loading &&
//   results.map((channel) => (
//     <Card key={channel.username} {...channel} channelClickHandler={channelClickHandler} />
//   ))}
// {!results.length && !loading && <Empty />}
