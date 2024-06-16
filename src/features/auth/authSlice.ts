import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import type { RootState } from '@/app/store'

import { client } from '@/api/client'

interface AuthState {
  username: string | null
}

export const login = createAsyncThunk('auth/login', async (username: string) => {
  await client.post('/fakeApi/login', { username })
  return username
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await client.post('/fakeApi/logout', {})
})

const initialState: AuthState = {
  // Note: a real app would probably have more complex auth state,
  // but for this example we'll keep things simple
  username: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.username = action.payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.username = null
      })
  },
})

export default authSlice.reducer

export const selectCurrentUsername = (state: RootState) => state.auth.username
