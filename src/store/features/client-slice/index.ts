import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IClientState } from './types'
import { getFavorites } from './api'

const initialState: IClientState = {
  favorites: [],
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
      return favorites
    } catch (error: any) {
      rejectWithValue(error.message)
      return []
    }
  }
)

const clientSlice = createSlice({
  name: ClientSlice.name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncSetFavoritesThunk.pending, (state) => {})
      .addCase(asyncSetFavoritesThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.favorites = action.payload
      })
      .addCase(asyncSetFavoritesThunk.rejected, (state) => {})
  },
})

export default clientSlice.reducer
