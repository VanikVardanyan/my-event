import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IProfileState } from './types'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/shared/lib/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

const initialState: IProfileState = {
  profile: null,
  loading: true,
  userId: null,
}

const enum ProfileSlice {
  name = 'profile',
  profileInfoThunk = 'profile/profileInfoThunk',
}

export const asyncSetProfileThunk = createAsyncThunk('profile/asyncSetProfileThunk', async (_, { rejectWithValue }) => {
  try {
    const user: any = await new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user: any) => {
        unsubscribe() // Отписка от onAuthStateChanged
        if (user) {
          resolve(user)
        } else {
          reject(new Error('User is not authenticated'))
        }
      })
    })

    const profileDoc = await getDoc(doc(db, 'profiles', user.uid))
    if (profileDoc.exists()) {
      return { profile: profileDoc.data(), userId: user?.uid }
    } else {
      return { profile: null, userId: user?.uid }
    }
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

const profileSlice = createSlice({
  name: ProfileSlice.name,
  initialState,
  reducers: {
    setProfileLoading: (state, action) => {
      state.loading = action.payload
    },
    setProfile: (state, action) => {
      state.profile = action.payload
      state.loading = false
    },
    setUserId: (state, action) => {
      state.userId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncSetProfileThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(asyncSetProfileThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.userId = action.payload.userId
        state.profile = action.payload.profile
        state.loading = false
      })
      .addCase(asyncSetProfileThunk.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { setProfile, setProfileLoading, setUserId } = profileSlice.actions
export default profileSlice.reducer
