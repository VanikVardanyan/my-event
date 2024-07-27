import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IClientState } from './types'
import { getFavorites } from './api'

const initialState: IClientState = {
  favorites: {
    instagram: [],
    direct: [],
  },
}

const enum ClientSlice {
  name = 'client',
  clientFavoriteInfoThunk = 'client/clientFavoriteInfoThunk',
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
  },
})

export const { clearSlice } = clientSlice.actions

export default clientSlice.reducer
