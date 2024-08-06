import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IClientState } from './types'
import { fetchUserRequests, getFavorites } from './api'

const initialState: IClientState = {
  favorites: {
    instagram: [],
    direct: [],
  },
  events: [],
}

const enum ClientSlice {
  name = 'client',
  clientFavoriteInfoThunk = 'client/clientFavoriteInfoThunk',
  events = 'client/events',
}

export const asyncSetFavoritesThunk = createAsyncThunk(
  ClientSlice.clientFavoriteInfoThunk,
  async (params: { id: string }, { rejectWithValue }) => {
    try {
      const favorites = await getFavorites(params.id)
      return favorites || { instagram: [], direct: [] }
    } catch (error: any) {
      rejectWithValue(error.message)
      return []
    }
  }
)

export const asyncSetEventsThunk = createAsyncThunk(
  ClientSlice.events,
  async (params: { id: string }, { rejectWithValue }) => {
    try {
      const events = await fetchUserRequests(params.id)
      return events
    } catch (error: any) {
      rejectWithValue(error.message)
      return []
    }
  }
)

const clientSlice = createSlice({
  name: ClientSlice.name,
  initialState,
  reducers: {
    clearSlice: (state) => {
      state.favorites = {
        instagram: [],
        direct: [],
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncSetFavoritesThunk.pending, (state) => {})
      .addCase(asyncSetFavoritesThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.favorites = action.payload
      })
      .addCase(asyncSetFavoritesThunk.rejected, (state) => {})
      .addCase(asyncSetEventsThunk.pending, (state) => {})
      .addCase(asyncSetEventsThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.events = action.payload
      })
      .addCase(asyncSetEventsThunk.rejected, (state) => {})
  },
})

export const { clearSlice } = clientSlice.actions

export default clientSlice.reducer
