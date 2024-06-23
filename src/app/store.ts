import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from '@/features/api/apiSlice'
import authReducer from '@/features/auth/authSlice'
import postsReducer from '@/features/posts/postsSlice'
import notificationsReducer from '@/features/notifications/notificationsSlice'

import { listenerMiddleware } from './listenerMiddleware'

export const store = configureStore({
  // Pass in the root reducer setup as the `reducer` argument
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    notifications: notificationsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(apiSlice.middleware),
})

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>
