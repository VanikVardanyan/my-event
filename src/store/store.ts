import { TypedUseSelectorHook } from 'react-redux'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './features/profile-slice'
import clientReducer from './features/client-slice'

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    client: clientReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const Selector: TypedUseSelectorHook<RootState> = useSelector
export const Dispatch = () => useDispatch<AppDispatch>()
